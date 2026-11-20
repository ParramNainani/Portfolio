"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Parram's photo rendered as ~15k points that start as Gaussian noise and
 * "denoise" into the portrait, the way a diffusion model generates an image.
 * The cursor acts as attention: nearby points lift toward the viewer and turn amber.
 * Click to regenerate. Respects prefers-reduced-motion; falls back to the photo without WebGL.
 */

const STEPS = 50
const GRID_DESKTOP = 150
const GRID_SMALL = 92

const vertexShader = /* glsl */ `
  attribute vec3 aTarget;
  attribute vec3 aNoise;
  attribute float aWeight;
  attribute float aSeed;
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uAttention;
  uniform float uBreath;
  varying float vAttention;
  varying float vWeight;

  void main() {
    float t = clamp(uProgress * 1.35 - aSeed * 0.35, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aNoise, aTarget, t);
    p.z += sin(uTime * 0.9 + aSeed * 6.2831) * 0.012 * uBreath;

    float d = distance(p.xy, uMouse);
    float a = uAttention * smoothstep(0.34, 0.0, d) * t;
    vec2 dir = normalize(p.xy - uMouse + 1e-4);
    p.xy += dir * a * 0.05;
    p.z += a * 0.45;

    vAttention = a;
    vWeight = aWeight;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.22 + aWeight * 1.05) * mix(0.55, 1.0, t) * (1.0 + a * 0.7) * uPixelRatio * (4.2 / -mv.z);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vAttention;
  varying float vWeight;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.38, r) * (0.55 + vWeight * 0.45);
    vec3 color = mix(uInk, uAccent, clamp(vAttention * 1.6, 0.0, 1.0));
    gl_FragColor = vec4(color, alpha);
  }
`

function gaussian() {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

export function DiffusionPortrait({ onReady }: { onReady?: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(STEPS)
  const [fallback, setFallback] = useState(false)
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let disposed = false
    let teardown = () => {}
    setTouch(window.matchMedia("(hover: none)").matches)

    const run = async () => {
      const [THREE, gsapMod] = await Promise.all([import("three"), import("gsap")])
      const gsap = gsapMod.gsap
      if (disposed) return

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      const img = new Image()
      img.src = "/portrait-gray.png"
      await img.decode()
      if (disposed) return

      // Sample the photo: darker pixels become bigger dots, the background stays empty.
      // Small screens get fewer, larger dots so the face doesn't shimmer.
      const GRID = wrap.clientWidth < 480 ? GRID_SMALL : GRID_DESKTOP
      const dotScale = GRID_DESKTOP / GRID
      const sampler = document.createElement("canvas")
      sampler.width = GRID
      sampler.height = GRID
      const ctx = sampler.getContext("2d", { willReadFrequently: true })
      if (!ctx) throw new Error("no 2d context")
      ctx.drawImage(img, 0, 0, GRID, GRID)
      const data = ctx.getImageData(0, 0, GRID, GRID).data

      const targets: number[] = []
      const noise: number[] = []
      const weights: number[] = []
      const seeds: number[] = []
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          const i = (y * GRID + x) * 4
          const lum = data[i] / 255
          const nx = x / (GRID - 1) - 0.5
          const ny = y / (GRID - 1) - 0.5
          // Soft ellipse around the head and shoulders keeps the wall behind him out of the picture.
          const ex = nx / 0.4
          const ey = (ny + 0.02) / 0.5
          const r = Math.sqrt(ex * ex + ey * ey)
          const mask = r > 1 ? 0 : 1 - Math.pow(Math.max(0, (r - 0.72) / 0.28), 2)
          const w = Math.min(0.92, Math.pow(1 - lum, 1.35)) * mask
          if (w < 0.1) continue
          const jx = (Math.random() - 0.5) * 0.004
          const jy = (Math.random() - 0.5) * 0.004
          targets.push(nx * 2.3 + jx, -ny * 2.3 + jy, 0)
          noise.push(gaussian() * 0.5, gaussian() * 0.5, gaussian() * 0.5)
          weights.push(w)
          seeds.push(Math.random())
        }
      }

      let renderer: import("three").WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" })
      } catch {
        setFallback(true)
        return
      }
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      renderer.setPixelRatio(pixelRatio)
      renderer.setClearColor(0x000000, 0)
      wrap.appendChild(renderer.domElement)
      renderer.domElement.setAttribute("aria-hidden", "true")
      renderer.domElement.style.display = "block"
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
      camera.position.set(0, 0, 4.2)

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(targets, 3))
      geometry.setAttribute("aTarget", new THREE.Float32BufferAttribute(targets, 3))
      geometry.setAttribute("aNoise", new THREE.Float32BufferAttribute(noise, 3))
      geometry.setAttribute("aWeight", new THREE.Float32BufferAttribute(weights, 1))
      geometry.setAttribute("aSeed", new THREE.Float32BufferAttribute(seeds, 1))

      const uniforms = {
        uProgress: { value: reduced ? 1 : 0 },
        uTime: { value: 0 },
        uSize: { value: 4.1 * dotScale },
        uPixelRatio: { value: pixelRatio },
        uMouse: { value: new THREE.Vector2(10, 10) },
        uAttention: { value: 0 },
        uBreath: { value: reduced ? 0 : 1 },
        uInk: { value: new THREE.Color("#1b1f24") },
        uAccent: { value: new THREE.Color("#d18e00") },
      }
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
      })
      const points = new THREE.Points(geometry, material)
      const group = new THREE.Group()
      group.add(points)
      scene.add(group)

      const resize = () => {
        const { width, height } = wrap.getBoundingClientRect()
        renderer.setSize(width, height, false)
        camera.aspect = width / Math.max(height, 1)
        camera.updateProjectionMatrix()
        uniforms.uSize.value = 4.1 * dotScale * (width / 520)
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(wrap)

      // Denoise: noise -> portrait, with a step counter running from 50 to 0.
      const denoise = () => {
        if (reduced) {
          uniforms.uProgress.value = 1
          setStep(0)
          return
        }
        gsap.fromTo(
          uniforms.uProgress,
          { value: 0 },
          {
            value: 1,
            duration: 2.8,
            ease: "power2.inOut",
            onUpdate: () => setStep(Math.round(STEPS * (1 - uniforms.uProgress.value))),
          },
        )
      }
      denoise()
      onReady?.()

      // Cursor = attention, plus a gentle tilt toward the pointer.
      const rotX = gsap.quickTo(group.rotation, "x", { duration: 0.8, ease: "power3.out" })
      const rotY = gsap.quickTo(group.rotation, "y", { duration: 0.8, ease: "power3.out" })
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const ray = new THREE.Raycaster()
      const ndc = new THREE.Vector2()
      const hit = new THREE.Vector3()

      const onMove = (e: PointerEvent) => {
        const rect = wrap.getBoundingClientRect()
        ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
        ray.setFromCamera(ndc, camera)
        if (ray.ray.intersectPlane(plane, hit)) {
          const local = group.worldToLocal(hit.clone())
          uniforms.uMouse.value.set(local.x, local.y)
        }
        if (!reduced) {
          rotY(ndc.x * 0.22)
          rotX(-ndc.y * 0.16)
        }
      }
      const onEnter = () => gsap.to(uniforms.uAttention, { value: 1, duration: reduced ? 0 : 0.4 })
      const onLeave = () => {
        gsap.to(uniforms.uAttention, { value: 0, duration: reduced ? 0 : 0.6 })
        if (!reduced) {
          rotX(0)
          rotY(0)
        }
      }
      const onClick = () => {
        if (reduced) return
        gsap.killTweensOf(uniforms.uProgress)
        gsap.to(uniforms.uProgress, {
          value: 0,
          duration: 0.7,
          ease: "power2.in",
          onUpdate: () => setStep(Math.round(STEPS * (1 - uniforms.uProgress.value))),
          onComplete: denoise,
        })
      }
      wrap.addEventListener("pointermove", onMove)
      wrap.addEventListener("pointerenter", onEnter)
      wrap.addEventListener("pointerleave", onLeave)
      wrap.addEventListener("click", onClick)

      // Render only while visible.
      let visible = true
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
      })
      io.observe(wrap)
      const clock = new THREE.Clock()
      const tick = () => {
        if (visible && !document.hidden) {
          uniforms.uTime.value = clock.getElapsedTime()
          renderer.render(scene, camera)
        }
      }
      gsap.ticker.add(tick)

      teardown = () => {
        gsap.ticker.remove(tick)
        io.disconnect()
        ro.disconnect()
        wrap.removeEventListener("pointermove", onMove)
        wrap.removeEventListener("pointerenter", onEnter)
        wrap.removeEventListener("pointerleave", onLeave)
        wrap.removeEventListener("click", onClick)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    }

    run().catch(() => setFallback(true))
    return () => {
      disposed = true
      teardown()
    }
  }, [onReady])

  return (
    <figure className="portrait">
      <div
        ref={wrapRef}
        className="portrait-stage"
        role="img"
        aria-label="Portrait of Parram Nainani drawn in dots, generated from noise"
        title="Click to regenerate"
      >
        {fallback ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/portrait-gray.png" alt="" className="portrait-fallback" />
        ) : null}
      </div>
      <figcaption className="portrait-caption">
        <span className="portrait-step" aria-hidden="true">
          {step > 0 ? `Denoising, step ${STEPS - step} of ${STEPS}` : `Generated from noise in ${STEPS} steps`}
        </span>
        <span className="muted">
          {touch ? "Tap it to generate it again." : "Move your cursor to steer its attention. Click to generate it again."}
        </span>
      </figcaption>
    </figure>
  )
}
