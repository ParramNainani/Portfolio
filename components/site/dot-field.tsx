"use client"

import { useEffect } from "react"

/**
 * One fixed WebGL layer of dots drawn above the page (pointer-events: none).
 * The dots first denoise into Parram's portrait in the hero, then fly into a small
 * dot-matrix glyph inside each project card as that card scrolls into view.
 *
 * Slots are plain DOM boxes: <div data-dot-slot="kshetrajna" />.
 * Sections that call the dots are marked <article data-dot-trigger="kshetrajna">; the hero carries data-dot-hero.
 */

const PHOTO = "/portrait-gray.png"
const STEPS = 50
const GLYPH_CELLS = 26

type Shape = { coords: Float32Array; weights: Float32Array; cells?: number; inset?: number }

const vertexShader = /* glsl */ `
  attribute vec2 aFrom;      // viewport px where this flight starts
  attribute vec2 aTo;        // [-1,1] shape coords inside the target slot
  attribute float aWFrom;
  attribute float aWTo;
  attribute float aSeed;
  uniform vec4 uRect;        // target slot: centre x, centre y, width, height (CSS px)
  uniform float uInset;      // how much of the slot the shape fills
  uniform float uBreath;
  uniform vec2 uViewport;
  uniform float uT;
  uniform float uTime;
  uniform float uDot;
  uniform float uDotFrom;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uAttention;
  varying float vAttention;
  varying float vWeight;
  varying float vFlight;

  void main() {
    float t = clamp(uT * 1.4 - aSeed * 0.4, 0.0, 1.0);
    t = t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
    vec2 to = uRect.xy + aTo * uRect.zw * 0.5 * uInset;
    vec2 p = mix(aFrom, to, t);
    float arc = sin(3.14159 * t) * (40.0 + aSeed * 120.0);
    p += vec2(cos(aSeed * 40.0), sin(aSeed * 40.0)) * arc;
    p += vec2(sin(uTime * 0.9 + aSeed * 6.28), cos(uTime * 0.7 + aSeed * 6.28)) * 0.5 * t * uBreath;

    float d = distance(p, uMouse);
    float a = uAttention * smoothstep(110.0, 0.0, d) * t;
    p += normalize(p - uMouse + 0.001) * a * 12.0;

    vAttention = a;
    vFlight = sin(3.14159 * t);
    vWeight = mix(aWFrom, aWTo, t);
    vec2 clip = vec2(p.x / uViewport.x * 2.0 - 1.0, 1.0 - p.y / uViewport.y * 2.0);
    gl_Position = vec4(clip, 0.0, 1.0);
    float size = mix(uDotFrom, uDot, t);
    gl_PointSize = size * (0.3 + vWeight * 1.05) * (1.0 + a * 0.9) * uPixelRatio;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vAttention;
  varying float vWeight;
  varying float vFlight;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.36, r) * (0.6 + vWeight * 0.4);
    float warm = clamp(max(vAttention * 1.6, vFlight * 0.9), 0.0, 1.0);
    gl_FragColor = vec4(mix(uInk, uAccent, warm), alpha);
  }
`

function gaussian() {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function shuffled(n: number) {
  const idx = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return idx
}

/** Sample a canvas drawing on a coarse grid, so the glyph reads as a dot-matrix icon. */
function glyphShape(draw: (ctx: CanvasRenderingContext2D, s: number) => void, n: number): Shape {
  const s = 220
  const c = document.createElement("canvas")
  c.width = s
  c.height = s
  const ctx = c.getContext("2d", { willReadFrequently: true })!
  draw(ctx, s)
  const data = ctx.getImageData(0, 0, s, s).data
  const cells: number[] = []
  for (let gy = 0; gy < GLYPH_CELLS; gy++) {
    for (let gx = 0; gx < GLYPH_CELLS; gx++) {
      const x = Math.floor(((gx + 0.5) / GLYPH_CELLS) * s)
      const y = Math.floor(((gy + 0.5) / GLYPH_CELLS) * s)
      if (data[(y * s + x) * 4 + 3] < 128) continue
      cells.push(((gx + 0.5) / GLYPH_CELLS) * 2 - 1, ((gy + 0.5) / GLYPH_CELLS) * 2 - 1)
    }
  }
  const m = cells.length / 2 || 1
  const order = shuffled(n)
  const coords = new Float32Array(n * 2)
  const weights = new Float32Array(n)
  for (let k = 0; k < n; k++) {
    const j = order[k] % m
    coords[k * 2] = cells[j * 2] ?? 0
    coords[k * 2 + 1] = cells[j * 2 + 1] ?? 0
    weights[k] = 0.7
  }
  return { coords, weights, cells: GLYPH_CELLS, inset: 0.78 }
}

function portraitShape(img: HTMLImageElement, grid: number): Shape {
  const c = document.createElement("canvas")
  c.width = grid
  c.height = grid
  const ctx = c.getContext("2d", { willReadFrequently: true })!
  ctx.drawImage(img, 0, 0, grid, grid)
  const data = ctx.getImageData(0, 0, grid, grid).data
  const pts: number[] = []
  const ws: number[] = []
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const lum = data[(y * grid + x) * 4] / 255
      const nx = x / (grid - 1) - 0.5
      const ny = y / (grid - 1) - 0.5
      const ex = nx / 0.4
      const ey = (ny + 0.02) / 0.5
      const r = Math.sqrt(ex * ex + ey * ey)
      const mask = r > 1 ? 0 : 1 - Math.pow(Math.max(0, (r - 0.72) / 0.28), 2)
      const w = Math.min(0.92, Math.pow(1 - lum, 1.35)) * mask
      if (w < 0.1) continue
      pts.push(nx * 2, ny * 2)
      ws.push(w)
    }
  }
  const n = ws.length
  const order = shuffled(n)
  const coords = new Float32Array(n * 2)
  const weights = new Float32Array(n)
  for (let k = 0; k < n; k++) {
    coords[k * 2] = pts[order[k] * 2]
    coords[k * 2 + 1] = pts[order[k] * 2 + 1]
    weights[k] = ws[order[k]]
  }
  return { coords, weights }
}

function noiseShape(n: number): Shape {
  const coords = new Float32Array(n * 2)
  const weights = new Float32Array(n)
  for (let k = 0; k < n; k++) {
    coords[k * 2] = gaussian() * 0.5
    coords[k * 2 + 1] = gaussian() * 0.5
    weights[k] = 0.25 + Math.random() * 0.3
  }
  return { coords, weights }
}

/** One glyph per project, drawn with canvas strokes so it reads at a glance. */
const glyphs: Record<string, (ctx: CanvasRenderingContext2D, s: number) => void> = {
  // Kshetrajna: an approval badge
  kshetrajna: (ctx, s) => {
    ctx.strokeStyle = "#000"
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.lineWidth = s * 0.1
    ctx.beginPath()
    ctx.arc(s / 2, s / 2, s * 0.42, 0, Math.PI * 2)
    ctx.stroke()
    ctx.lineWidth = s * 0.12
    ctx.beginPath()
    ctx.moveTo(s * 0.3, s * 0.52)
    ctx.lineTo(s * 0.44, s * 0.66)
    ctx.lineTo(s * 0.72, s * 0.36)
    ctx.stroke()
  },
  // Drift: a folder with a file dropping in
  drift: (ctx, s) => {
    ctx.fillStyle = "#000"
    ctx.beginPath()
    ctx.roundRect(s * 0.1, s * 0.36, s * 0.8, s * 0.5, s * 0.06)
    ctx.fill()
    ctx.beginPath()
    ctx.roundRect(s * 0.1, s * 0.27, s * 0.32, s * 0.14, s * 0.04)
    ctx.fill()
    ctx.beginPath()
    ctx.roundRect(s * 0.52, s * 0.04, s * 0.26, s * 0.24, s * 0.03)
    ctx.fill()
  },
  // ReVoice: a waveform that stops short (interrupted)
  revoice: (ctx, s) => {
    ctx.fillStyle = "#000"
    const bars = [0.3, 0.55, 0.85, 0.6, 1, 0.7, 0.4, 0.16, 0.16]
    const w = s * 0.07
    bars.forEach((h, i) => {
      const x = s * 0.08 + i * s * 0.1
      const bh = s * 0.8 * h
      ctx.beginPath()
      ctx.roundRect(x, s / 2 - bh / 2, w, bh, w / 2)
      ctx.fill()
    })
  },
  // RL environment: a grid of states, two of them chosen
  rlenv: (ctx, s) => {
    ctx.strokeStyle = "#000"
    ctx.fillStyle = "#000"
    ctx.lineWidth = s * 0.05
    const g = s * 0.24
    const o = s * 0.1
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const x = o + c * (g + s * 0.04)
        const y = o + r * (g + s * 0.04)
        ctx.beginPath()
        ctx.roundRect(x, y, g, g, s * 0.03)
        if ((r === 2 && c === 2) || (r === 0 && c === 1)) ctx.fill()
        else ctx.stroke()
      }
    }
  },
  // Finance backend: bars with a rising trend line
  finance: (ctx, s) => {
    ctx.fillStyle = "#000"
    ctx.strokeStyle = "#000"
    const hs = [0.3, 0.46, 0.38, 0.6, 0.74]
    hs.forEach((h, i) => {
      ctx.beginPath()
      ctx.roundRect(s * 0.1 + i * s * 0.17, s * 0.92 - s * h, s * 0.12, s * h, s * 0.02)
      ctx.fill()
    })
    ctx.lineWidth = s * 0.05
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.moveTo(s * 0.1, s * 0.4)
    ctx.lineTo(s * 0.4, s * 0.26)
    ctx.lineTo(s * 0.6, s * 0.3)
    ctx.lineTo(s * 0.9, s * 0.06)
    ctx.stroke()
  },
  // NaviiGo: a map pin and its shadow
  naviigo: (ctx, s) => {
    ctx.fillStyle = "#000"
    ctx.beginPath()
    ctx.arc(s * 0.5, s * 0.36, s * 0.28, Math.PI * 0.85, Math.PI * 0.15)
    ctx.lineTo(s * 0.5, s * 0.84)
    ctx.closePath()
    ctx.fill()
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(s * 0.5, s * 0.36, s * 0.11, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalCompositeOperation = "source-over"
    ctx.beginPath()
    ctx.ellipse(s * 0.5, s * 0.93, s * 0.24, s * 0.05, 0, 0, Math.PI * 2)
    ctx.fill()
  },
  // Contact: a paper plane
  contact: (ctx, s) => {
    ctx.fillStyle = "#000"
    ctx.beginPath()
    ctx.moveTo(s * 0.06, s * 0.46)
    ctx.lineTo(s * 0.94, s * 0.1)
    ctx.lineTo(s * 0.62, s * 0.9)
    ctx.lineTo(s * 0.46, s * 0.58)
    ctx.closePath()
    ctx.fill()
    ctx.globalCompositeOperation = "destination-out"
    ctx.lineWidth = s * 0.05
    ctx.beginPath()
    ctx.moveTo(s * 0.46, s * 0.58)
    ctx.lineTo(s * 0.94, s * 0.1)
    ctx.stroke()
    ctx.globalCompositeOperation = "source-over"
  },
}

export function DotField() {
  useEffect(() => {
    let disposed = false
    let teardown = () => {}

    const run = async () => {
      const [THREE, gsapMod] = await Promise.all([import("three"), import("gsap")])
      const gsap = gsapMod.gsap
      if (disposed) return

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const img = new Image()
      img.src = PHOTO
      await img.decode()
      if (disposed) return

      let renderer: import("three").WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" })
      } catch {
        document.documentElement.classList.add("no-webgl")
        return
      }

      // Fewer, larger dots on phones avoids moiré on small portraits.
      const small = window.innerWidth < 640
      const portrait = portraitShape(img, small ? 96 : 150)
      const N = portrait.weights.length
      const shapes: Record<string, Shape> = { portrait, noise: noiseShape(N) }
      for (const [name, draw] of Object.entries(glyphs)) shapes[name] = glyphShape(draw, N)

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      renderer.setPixelRatio(pixelRatio)
      renderer.setClearColor(0x000000, 0)
      const canvas = renderer.domElement
      canvas.className = "dot-field"
      canvas.setAttribute("aria-hidden", "true")
      document.body.appendChild(canvas)
      document.documentElement.classList.add("has-dots")

      const geometry = new THREE.BufferGeometry()
      const from = new Float32Array(N * 2)
      const wFrom = new Float32Array(N)
      const seeds = new Float32Array(N)
      for (let i = 0; i < N; i++) seeds[i] = Math.random()
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(N * 3), 3))
      const aFrom = new THREE.BufferAttribute(from, 2)
      const aTo = new THREE.BufferAttribute(new Float32Array(shapes.portrait.coords), 2)
      const aWFrom = new THREE.BufferAttribute(wFrom, 1)
      const aWTo = new THREE.BufferAttribute(new Float32Array(shapes.portrait.weights), 1)
      geometry.setAttribute("aFrom", aFrom)
      geometry.setAttribute("aTo", aTo)
      geometry.setAttribute("aWFrom", aWFrom)
      geometry.setAttribute("aWTo", aWTo)
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1))

      const uniforms = {
        uRect: { value: new THREE.Vector4(0, 0, 1, 1) },
        uInset: { value: 1 },
        uBreath: { value: 1 },
        uViewport: { value: new THREE.Vector2(1, 1) },
        uT: { value: 1 },
        uTime: { value: 0 },
        uDot: { value: 5 },
        uDotFrom: { value: 5 },
        uPixelRatio: { value: pixelRatio },
        uMouse: { value: new THREE.Vector2(-9999, -9999) },
        uAttention: { value: 0 },
        uInk: { value: new THREE.Color("#15181c") },
        uAccent: { value: new THREE.Color("#e39a00") },
      }
      const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true, depthWrite: false })
      const points = new THREE.Points(geometry, material)
      points.frustumCulled = false
      const scene = new THREE.Scene()
      scene.add(points)
      const camera = new THREE.Camera()

      const resize = () => {
        const w = document.documentElement.clientWidth
        const h = document.documentElement.clientHeight
        renderer.setSize(w, h, true)
        uniforms.uViewport.value.set(w, h)
        dirty = true
      }
      let dirty = true
      resize()
      window.addEventListener("resize", resize)

      const slotEl = (name: string) => document.querySelector<HTMLElement>(`[data-dot-slot="${name}"]`)
      const rectOf = (name: string) => {
        const el = slotEl(name)
        if (!el) return null
        const r = el.getBoundingClientRect()
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width, h: r.height }
      }
      const dotFor = (shape: string, w: number) => {
        const cells = shapes[shape].cells
        if (cells) return ((w * (shapes[shape].inset ?? 1)) / cells) * 0.68 / (0.3 + 0.7 * 1.05)
        return Math.max(2.2, (w / 560) * 4.4 * Math.sqrt(8000 / N))
      }

      let currentSlot = "portrait"
      let currentShape = "noise"
      const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

      // Work out where every dot is right now (a CPU copy of the shader) so a new flight starts there.
      const snapshot = () => {
        const r = rectOf(currentSlot)
        const T = uniforms.uT.value
        const k = uniforms.uInset.value * 0.5
        const vw = uniforms.uViewport.value.x
        const vh = uniforms.uViewport.value.y
        const to = aTo.array as Float32Array
        const wTo = aWTo.array as Float32Array
        for (let i = 0; i < N; i++) {
          const t = ease(Math.min(1, Math.max(0, T * 1.4 - seeds[i] * 0.4)))
          const tx = r ? r.cx + to[i * 2] * r.w * k : from[i * 2]
          const ty = r ? r.cy + to[i * 2 + 1] * r.h * k : from[i * 2 + 1]
          const arc = Math.sin(Math.PI * t) * (40 + seeds[i] * 120)
          from[i * 2] = from[i * 2] + (tx - from[i * 2]) * t + Math.cos(seeds[i] * 40) * arc
          from[i * 2 + 1] = from[i * 2 + 1] + (ty - from[i * 2 + 1]) * t + Math.sin(seeds[i] * 40) * arc
          wFrom[i] = wFrom[i] + (wTo[i] - wFrom[i]) * t
          // After a long jump, start just off screen so the flight is visible.
          from[i * 2] = Math.min(vw * 1.15, Math.max(-vw * 0.15, from[i * 2]))
          from[i * 2 + 1] = Math.min(vh * 1.25, Math.max(-vh * 0.25, from[i * 2 + 1]))
        }
        aFrom.needsUpdate = true
        aWFrom.needsUpdate = true
        uniforms.uDotFrom.value += (uniforms.uDot.value - uniforms.uDotFrom.value) * ease(Math.min(1, T))
      }

      let flight: gsap.core.Tween | null = null
      const flyTo = (slot: string, shape: string, duration = 1.3, onUpdate?: () => void) => {
        if (slot === currentSlot && shape === currentShape) return
        snapshot()
        currentSlot = slot
        currentShape = shape
        uniforms.uInset.value = shapes[shape].inset ?? 1
        uniforms.uBreath.value = shapes[shape].cells ? 0 : 1
        ;(aTo.array as Float32Array).set(shapes[shape].coords)
        ;(aWTo.array as Float32Array).set(shapes[shape].weights)
        aTo.needsUpdate = true
        aWTo.needsUpdate = true
        const r = rectOf(slot)
        if (r) uniforms.uDot.value = dotFor(shape, r.w)
        flight?.kill()
        dirty = true
        if (reduced) {
          uniforms.uT.value = 1
          onUpdate?.()
          return
        }
        uniforms.uT.value = 0
        flight = gsap.to(uniforms.uT, { value: 1, duration, ease: "none", onUpdate })
      }

      const report = () => {
        const T = Math.min(1, uniforms.uT.value)
        const step = currentShape === "noise" ? Math.round(STEPS * T) : Math.round(STEPS * (1 - T))
        window.dispatchEvent(new CustomEvent("dotfield:step", { detail: step }))
      }

      // Start: dots scattered as noise around the portrait slot, then denoise into the face.
      const start = rectOf("portrait")
      if (start) {
        for (let i = 0; i < N; i++) {
          from[i * 2] = start.cx + shapes.noise.coords[i * 2] * start.w * 0.5
          from[i * 2 + 1] = start.cy + shapes.noise.coords[i * 2 + 1] * start.h * 0.5
          wFrom[i] = shapes.noise.weights[i]
        }
        aFrom.needsUpdate = true
        aWFrom.needsUpdate = true
        uniforms.uDot.value = dotFor("portrait", start.w)
        uniforms.uDotFrom.value = uniforms.uDot.value * 0.8
      }
      currentShape = "portrait"
      if (reduced) {
        uniforms.uT.value = 1
        report()
      } else {
        uniforms.uT.value = 0
        flight = gsap.to(uniforms.uT, { value: 1, duration: 2.6, ease: "none", onUpdate: report })
      }
      window.dispatchEvent(new Event("dotfield:ready"))

      // Scroll: the dots go to whichever section is nearest the reading line (55% down the viewport).
      // The hero means the portrait; each card means its glyph.
      const targets = [
        ...Array.from(document.querySelectorAll<HTMLElement>("[data-dot-hero]")).map((el) => ({ el, name: "portrait" })),
        ...Array.from(document.querySelectorAll<HTMLElement>("[data-dot-trigger]")).map((el) => ({
          el,
          name: el.dataset.dotTrigger!,
        })),
      ]
      const pick = () => {
        const line = uniforms.uViewport.value.y * 0.55
        let best = currentSlot
        let bestD = Infinity
        for (const { el, name } of targets) {
          const r = el.getBoundingClientRect()
          const d = line < r.top ? r.top - line : line > r.bottom ? line - r.bottom : 0
          if (d < bestD) {
            bestD = d
            best = name
          }
        }
        if (best === currentSlot) return
        if (best === "portrait") flyTo("portrait", "portrait", 1.3, report)
        else flyTo(best, best)
      }
      let picking = 0
      const onScroll = () => {
        if (picking) return
        picking = requestAnimationFrame(() => {
          picking = 0
          pick()
        })
      }
      window.addEventListener("scroll", onScroll, { passive: true })
      pick()

      // The portrait leans away from the cursor and can be generated again with a click or tap.
      const onMove = (e: PointerEvent) => uniforms.uMouse.value.set(e.clientX, e.clientY)
      const portraitEl = slotEl("portrait")
      const onEnter = () => gsap.to(uniforms.uAttention, { value: 1, duration: reduced ? 0 : 0.35 })
      const onLeave = () => gsap.to(uniforms.uAttention, { value: 0, duration: reduced ? 0 : 0.5 })
      const onRegenerate = () => {
        if (reduced || currentSlot !== "portrait") return
        flyTo("portrait", "noise", 0.7, () => {
          report()
          if (uniforms.uT.value >= 1) flyTo("portrait", "portrait", 2.2, report)
        })
      }
      window.addEventListener("pointermove", onMove, { passive: true })
      portraitEl?.addEventListener("pointerenter", onEnter)
      portraitEl?.addEventListener("pointerleave", onLeave)
      portraitEl?.addEventListener("click", onRegenerate)

      // Render while something moves or the current slot is on screen; otherwise idle.
      const clock = new THREE.Clock()
      const tick = () => {
        if (document.hidden) return
        const r = rectOf(currentSlot)
        const vh = uniforms.uViewport.value.y
        const onScreen = !!r && r.cy + r.h > -200 && r.cy - r.h < vh + 200
        const flying = !!flight && flight.isActive()
        if (!onScreen && !flying && !dirty) return
        if (r) uniforms.uRect.value.set(r.cx, r.cy, r.w, r.h)
        uniforms.uTime.value = clock.getElapsedTime()
        renderer.render(scene, camera)
        dirty = onScreen || flying
      }
      gsap.ticker.add(tick)

      teardown = () => {
        gsap.ticker.remove(tick)
        flight?.kill()
        window.removeEventListener("scroll", onScroll)
        cancelAnimationFrame(picking)
        window.removeEventListener("resize", resize)
        window.removeEventListener("pointermove", onMove)
        portraitEl?.removeEventListener("pointerenter", onEnter)
        portraitEl?.removeEventListener("pointerleave", onLeave)
        portraitEl?.removeEventListener("click", onRegenerate)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        canvas.remove()
        document.documentElement.classList.remove("has-dots")
      }
    }

    run().catch(() => document.documentElement.classList.add("no-webgl"))
    return () => {
      disposed = true
      teardown()
    }
  }, [])

  return null
}
