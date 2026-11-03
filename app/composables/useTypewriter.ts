export interface CodeSegment {
  text: string
  color?: string 
}

export type CodeLine = CodeSegment[]

export function useTypewriter(lines: CodeLine[], speed = 18) {
  const visibleLineCount = ref(0)
  const visibleChars = ref(0)
  const isDone = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  function lineLength(index: number): number {
    const line = lines[index]
    if (!line) return 0
    return line.reduce((sum, seg) => sum + seg.text.length, 0)
  }

  function tick() {
    if (visibleLineCount.value >= lines.length) {
      isDone.value = true
      return
    }
    const len = lineLength(visibleLineCount.value)
    if (visibleChars.value < len) {
      visibleChars.value++
      timer = setTimeout(tick, speed)
    } else {
      visibleLineCount.value++
      visibleChars.value = 0
      timer = setTimeout(tick, speed * 5) 
    }
  }

  function start() {
    stop()
    visibleLineCount.value = 0
    visibleChars.value = 0
    isDone.value = false
    tick()
  }

  function stop() {
    if (timer) clearTimeout(timer)
  }

  function sliceLine(line: CodeLine, charCount: number): CodeLine {
    const result: CodeLine = []
    let remaining = charCount
    for (const seg of line) {
      if (remaining <= 0) break
      if (seg.text.length <= remaining) {
        result.push(seg)
        remaining -= seg.text.length
      } else {
        result.push({ ...seg, text: seg.text.slice(0, remaining) })
        remaining = 0
      }
    }
    return result
  }

  onUnmounted(stop)

  return { visibleLineCount, visibleChars, isDone, start, stop, sliceLine }
}