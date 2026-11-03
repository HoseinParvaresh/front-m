<template>
  <canvas ref="canvasRef" class="flowing-lines" />
</template>

<script setup lang="ts">
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')

const CONFIG = {
  lineCount:   12,
  speedRange:  [0.6, 2.0] as [number, number],
  lengthRange: [320, 430] as [number, number],
  widthRange:  [1, 1.2] as [number, number],
  color:       '#ffffff',
  bg:          '#0B0F0E',
}

interface Line {
  x:      number
  y:      number
  length: number
  speed:  number
  width:  number
}

let rafId: number | null = null
let lines: Line[] = []
let W = 0, H = 0

const rand = (min: number, max: number) => min + Math.random() * (max - min)

function makeLine(spawnInside = false): Line {
  const length = rand(...CONFIG.lengthRange)
  return {
    x:      spawnInside ? rand(-length, W) : -length,
    y:      rand(20, H - 20),
    length,
    speed:  rand(...CONFIG.speedRange),
    width:  rand(...CONFIG.widthRange),
  }
}

function resize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  W = window.innerWidth
  H = window.innerHeight
  canvas.width  = W * dpr
  canvas.height = H * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.fillStyle = CONFIG.bg
  ctx.fillRect(0, 0, W, H)
}

function drawLine(ctx: CanvasRenderingContext2D, l: Line) {
  const x0 = l.x - l.length, y0 = l.y
  const x1 = l.x,            y1 = l.y

  const grad = ctx.createLinearGradient(x0, y0, x1, y1)
  grad.addColorStop(0,   'rgba(255,255,255,0)')
  grad.addColorStop(0.5, CONFIG.color)
  grad.addColorStop(1,   'rgba(255,255,255,0)')

  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.strokeStyle = grad
  ctx.lineWidth   = l.width
  ctx.lineCap     = 'round'
  ctx.stroke()
}

function startAnimation(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  resize(canvas, ctx)
  lines = Array.from({ length: CONFIG.lineCount }, () => makeLine(true))

  if (reduceMotion) {
    lines.forEach(l => drawLine(ctx, l))
    return
  }

  function frame() {
    ctx.fillStyle = CONFIG.bg
    ctx.fillRect(0, 0, W, H)

    for (const l of lines) {
      l.x += l.speed
      drawLine(ctx, l)
      if (l.x - l.length > W) Object.assign(l, makeLine(false))
    }

    rafId = requestAnimationFrame(frame)
  }

  rafId = requestAnimationFrame(frame)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  startAnimation(canvas, ctx)

  const onResize = () => resize(canvas, ctx)
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    window.removeEventListener('resize', onResize)
  })
})
</script>

<style scoped>
.flowing-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 500px;
  display: block;
  z-index: 0;
}
</style>