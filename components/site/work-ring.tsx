"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A 3D ring of curved cards: real screenshots of Parram's work plus a few typographic posters.
 * Drag to spin, scroll nudges it, hover lifts a card, click opens it.
 * Falls back to a plain scrolling strip when WebGL isn't available.
 */

export type RingCard = {
  title: string
  kind: string
  href: string
  external?: boolean
  src?: string
  poster?: { bg: string; ink: string; accent: string; tagline: string; motif: "files" | "wave" | "grid" | "bars" | "photo" }
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uHover;
  uniform vec2 uSize;
  varying vec2 vUv;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float d = roundedBox(p, uSize * 0.5, 0.07);
    if (d > 0.0) discard;
    vec2 uv = vUv;
    if (!gl_FrontFacing) uv.x = 1.0 - uv.x;
    vec3 color = texture2D(uMap, uv).rgb;
    // the far side of the ring sits in shadow
    float facing = gl_FrontFacing ? 1.0 : 0.28;
    color *= facing * (0.88 + uHover * 0.18);
    // a thin light edge
    float edge = smoothstep(-0.012, 0.0, d);
    color = mix(color, vec3(1.0), edge * 0.35 * facing);
    gl_FragColor = vec4(color, 1.0);
  }
`

async function drawPoster(card: RingCard, photo?: HTMLImageElement) {
  const W = 1280
  const H = 800
  const c = document.createElement("canvas")
  c.width = W
  c.height = H
  const ctx = c.getContext("2d")!
  const p = card.poster!
  ctx.fillStyle = p.bg
  ctx.fillRect(0, 0, W, H)

  // motif
  ctx.save()
  ctx.fillStyle = p.accent
  ctx.strokeStyle = p.accent
  if (p.motif === "files") {
    const rows = ["receipt-march.pdf", "client-brief.txt", "IMG_2041.jpg", "notes (2).docx", "invoice_final.pdf"]
    rows.forEach((r, i) => {
      const y = 140 + i * 92
      ctx.globalAlpha = 0.9 - i * 0.12
      ctx.beginPath()
      ctx.roundRect(720, y, 470, 66, 18)
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.fillStyle = p.bg
      ctx.font = "500 30px Geist, sans-serif"
      ctx.fillText(r, 750, y + 43)
      ctx.fillStyle = p.accent
    })
  } else if (p.motif === "wave") {
    const bars = [0.3, 0.55, 0.85, 0.6, 1, 0.75, 0.45, 0.9, 0.5, 0.12, 0.12, 0.12]
    bars.forEach((h, i) => {
      const bh = 380 * h
      ctx.globalAlpha = i > 8 ? 0.35 : 1
      ctx.beginPath()
      ctx.roundRect(700 + i * 42, 360 - bh / 2, 26, bh, 13)
      ctx.fill()
    })
    ctx.globalAlpha = 1
  } else if (p.motif === "grid") {
    for (let r = 0; r < 4; r++)
      for (let k = 0; k < 4; k++) {
        const x = 720 + k * 118
        const y = 120 + r * 118
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.roundRect(x, y, 96, 96, 16)
        if ((r === 1 && k === 2) || (r === 3 && k === 0) || (r === 2 && k === 3)) ctx.fill()
        else ctx.stroke()
      }
  } else if (p.motif === "bars") {
    const hs = [0.35, 0.5, 0.42, 0.66, 0.58, 0.85]
    hs.forEach((h, i) => {
      ctx.beginPath()
      ctx.roundRect(700 + i * 80, 600 - 440 * h, 54, 440 * h, 10)
      ctx.fill()
    })
  } else if (p.motif === "photo" && photo) {
    ctx.beginPath()
    ctx.roundRect(720, 110, 440, 440, 40)
    ctx.clip()
    ctx.drawImage(photo, 720, 110, 440, 440)
  }
  ctx.restore()

  // words
  ctx.fillStyle = p.ink
  ctx.font = "600 110px Geist, sans-serif"
  const words = card.title.split(" ")
  let line = ""
  const lines: string[] = []
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > 600 && line) {
      lines.push(line)
      line = w
    } else line = test
  }
  lines.push(line)
  lines.forEach((l, i) => ctx.fillText(l, 80, 200 + i * 112))
  ctx.globalAlpha = 0.75
  ctx.font = "400 38px Geist, sans-serif"
  ctx.fillText(p.tagline, 80, H - 150)
  ctx.globalAlpha = 0.55
  ctx.font = "500 30px Geist, sans-serif"
  ctx.fillText(card.kind, 80, H - 90)
  ctx.globalAlpha = 1
  return c
}

export function WorkRing({ cards }: { cards: RingCard[] }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let disposed = false
    let teardown = () => {}

    const run = async () => {
      const THREE = await import("three")
      if (disposed) return
      let renderer: import("three").WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
      } catch {
        setFallback(true)
        return
      }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      const canvas = renderer.domElement
      canvas.className = "ring-canvas"
      host.appendChild(canvas)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
      camera.position.set(0, 0.9, 11)
      camera.lookAt(0, 0, 0)

      const N = cards.length
      const R = 3.3
      const CW = 1.9
      const CH = CW / 1.6
      const geometry = new THREE.PlaneGeometry(CW, CH, 32, 1)
      const pos = geometry.attributes.position as import("three").BufferAttribute
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const a = x / R
        pos.setXYZ(i, R * Math.sin(a), pos.getY(i), R * Math.cos(a))
      }
      geometry.computeVertexNormals()

      const tilt = new THREE.Group()
      tilt.rotation.set(0.16, 0, -0.07)
      const ring = new THREE.Group()
      tilt.add(ring)
      scene.add(tilt)

      try {
        await document.fonts.load("600 110px Geist")
      } catch {}
      const photo = new Image()
      photo.src = "/parram.jpg"
      try {
        await photo.decode()
      } catch {}
      if (disposed) return

      const loader = new THREE.TextureLoader()
      const meshes: import("three").Mesh[] = []
      const mats: import("three").ShaderMaterial[] = []
      const textures: import("three").Texture[] = []
      for (let i = 0; i < N; i++) {
        const card = cards[i]
        let tex: import("three").Texture
        if (card.src) tex = await loader.loadAsync(card.src)
        else tex = new THREE.CanvasTexture(await drawPoster(card, photo))
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
        textures.push(tex)
        const mat = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: { uMap: { value: tex }, uHover: { value: 0 }, uSize: { value: new THREE.Vector2(CW, CH) } },
          side: THREE.DoubleSide,
        })
        mats.push(mat)
        const mesh = new THREE.Mesh(geometry, mat)
        mesh.rotation.y = (i / N) * Math.PI * 2
        mesh.userData.index = i
        ring.add(mesh)
        meshes.push(mesh)
      }
      if (disposed) return
      host.classList.add("is-ready")

      // sizing: on narrow screens the ring stays big and runs off the sides
      const resize = () => {
        const w = host.clientWidth
        const h = host.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        const s = Math.min(1, Math.max(0.56, camera.aspect * 0.78))
        tilt.scale.setScalar(s)
        tilt.position.y = camera.aspect < 0.9 ? 1.25 : 0.95
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(host)

      // motion state
      let angle = -0.35
      let velocity = 0
      let dragging = false
      let lastX = 0
      let moved = 0
      const auto = reduced ? 0 : 0.0016
      const mouse = new THREE.Vector2(-9, -9)
      const tiltTarget = { x: 0.16, z: -0.07 }
      let hovered = -1
      const raycaster = new THREE.Raycaster()

      const toNdc = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect()
        mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
        return r
      }
      const onDown = (e: PointerEvent) => {
        dragging = true
        moved = 0
        lastX = e.clientX
        canvas.setPointerCapture(e.pointerId)
      }
      const onMove = (e: PointerEvent) => {
        const r = toNdc(e)
        if (dragging) {
          const dx = e.clientX - lastX
          lastX = e.clientX
          moved += Math.abs(dx)
          velocity = (dx / r.width) * 3.2
          angle += velocity
        } else {
          tiltTarget.x = 0.16 + mouse.y * 0.06
          tiltTarget.z = -0.07 - mouse.x * 0.05
        }
        const label = labelRef.current
        if (label) {
          label.style.transform = `translate(${e.clientX - r.left + 16}px, ${e.clientY - r.top + 16}px)`
        }
      }
      const onUp = (e: PointerEvent) => {
        dragging = false
        canvas.releasePointerCapture(e.pointerId)
        if (moved < 6 && hovered >= 0) {
          const card = cards[hovered]
          if (card.external) window.open(card.href, "_blank", "noopener")
          else {
            const handled = !window.dispatchEvent(
              new CustomEvent("portfolio:goto", { detail: card.href, cancelable: true }),
            )
            if (!handled)
              document
                .querySelector(card.href)
                ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start", inline: "start" })
          }
        }
      }
      const onLeave = () => {
        mouse.set(-9, -9)
      }
      canvas.addEventListener("pointerdown", onDown)
      canvas.addEventListener("pointermove", onMove)
      canvas.addEventListener("pointerup", onUp)
      canvas.addEventListener("pointerleave", onLeave)

      let lastScroll = window.scrollY
      const onScroll = () => {
        const dy = window.scrollY - lastScroll
        lastScroll = window.scrollY
        if (!reduced) velocity += dy * 0.0006
      }
      window.addEventListener("scroll", onScroll, { passive: true })

      let visible = true
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
      io.observe(host)

      let raf = 0
      const tick = () => {
        raf = requestAnimationFrame(tick)
        if (!visible || document.hidden) return
        if (!dragging) {
          velocity *= 0.94
          angle += velocity + auto
        }
        ring.rotation.y = angle
        tilt.rotation.x += (tiltTarget.x - tilt.rotation.x) * 0.05
        tilt.rotation.z += (tiltTarget.z - tilt.rotation.z) * 0.05

        // hover: nearest front-facing card under the pointer
        raycaster.setFromCamera(mouse, camera)
        const hits = raycaster.intersectObjects(meshes, false)
        let next = -1
        for (const h of hits) {
          const n = h.face?.normal.clone().transformDirection(h.object.matrixWorld)
          if (n && n.dot(raycaster.ray.direction) < 0) {
            next = h.object.userData.index as number
            break
          }
        }
        if (next !== hovered) {
          hovered = next
          canvas.style.cursor = hovered >= 0 ? "pointer" : "grab"
          const label = labelRef.current
          if (label) {
            if (hovered >= 0) {
              label.textContent = `${cards[hovered].external ? "Open" : "See"} ${cards[hovered].title}`
              label.classList.add("is-on")
            } else label.classList.remove("is-on")
          }
        }
        meshes.forEach((m, i) => {
          const target = i === hovered ? 1 : 0
          const u = mats[i].uniforms.uHover
          u.value += (target - u.value) * 0.15
          m.scale.setScalar(1 + u.value * 0.06)
        })
        renderer.render(scene, camera)
      }
      tick()

      teardown = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
        window.removeEventListener("scroll", onScroll)
        canvas.removeEventListener("pointerdown", onDown)
        canvas.removeEventListener("pointermove", onMove)
        canvas.removeEventListener("pointerup", onUp)
        canvas.removeEventListener("pointerleave", onLeave)
        geometry.dispose()
        mats.forEach((m) => m.dispose())
        textures.forEach((t) => t.dispose())
        renderer.dispose()
        canvas.remove()
      }
    }

    run().catch(() => setFallback(true))
    return () => {
      disposed = true
      teardown()
    }
  }, [cards])

  if (fallback) {
    return (
      <div className="ring-fallback">
        {cards
          .filter((c) => c.src)
          .map((c) => (
            // eslint-disable-next-line @next/next/no-img-element
            <a key={c.title} href={c.href} target={c.external ? "_blank" : undefined} rel="noopener">
              <img src={c.src} alt={c.title} width={800} height={500} />
            </a>
          ))}
      </div>
    )
  }

  return (
    <div ref={hostRef} className="ring-host" aria-hidden="true">
      <div ref={labelRef} className="ring-label" />
    </div>
  )
}
