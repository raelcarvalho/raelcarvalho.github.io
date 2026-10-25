/* ========================================================================== 
   Carreira — matemática de progresso e renderizador de sprite substituível
   ========================================================================== */
((root, factory) => {
  const api = factory()
  if (typeof module === 'object' && module.exports) module.exports = api
  if (root) root.CareerBlueprint = api
})(typeof window !== 'undefined' ? window : null, () => {
  'use strict'

  const STATES = Object.freeze([
    Object.freeze({ id: 'cadastra', label: 'Profissional completo', detail: 'IA, agentes e produtos', color: '#ff7a45' }),
    Object.freeze({ id: 'seguros', label: 'Fluxos e pagamentos', detail: 'eventos e integrações', color: '#a9cbff' }),
    Object.freeze({ id: 'itau', label: 'Engenharia ganha base', detail: 'sistemas bancários críticos', color: '#6aa8ff' }),
    Object.freeze({ id: 'support', label: 'Antes do código', detail: 'suporte e infraestrutura', color: '#b2b3a9' }),
  ])

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
  const smoothstep = (value) => value * value * (3 - 2 * value)

  function computeProgress(metrics, anchorY) {
    if (!Array.isArray(metrics) || metrics.length <= 1) return 0
    if (!Number.isFinite(anchorY)) return 0
    if (metrics.some((item) => !item || !Number.isFinite(item.center) || !Number.isFinite(item.height) || item.height <= 0)) return 0
    if (metrics.some((item, index) => index > 0 && item.center <= metrics[index - 1].center)) return 0

    const last = metrics.length - 1
    if (anchorY <= metrics[0].center) return 0
    if (anchorY >= metrics[last].center) return last

    for (let index = 0; index < last; index += 1) {
      const current = metrics[index]
      const next = metrics[index + 1]
      const currentHold = Math.min(current.height * 0.22, 110)
      const nextHold = Math.min(next.height * 0.22, 110)
      const transitionStart = current.center + currentHold
      const transitionEnd = next.center - nextHold

      if (anchorY <= transitionStart) return index
      if (anchorY < transitionEnd) {
        const span = Math.max(1, transitionEnd - transitionStart)
        const local = clamp((anchorY - transitionStart) / span, 0, 1)
        return index + smoothstep(local)
      }
      if (anchorY <= next.center) return index + 1
    }

    return last
  }

  // Mesmos limites das media queries do styles.css (max-width: 720px, max-height: 619px).
  function chooseLayout(width, height) {
    if (!Number.isFinite(width) || width > 720) return 'desktop'
    return Number.isFinite(height) && height < 620 ? 'mobile-static' : 'mobile-sticky'
  }

  function create(stage, options = {}) {
    if (!stage || typeof stage.querySelectorAll !== 'function') {
      return { setProgress() {}, setLayout() {}, destroy() {} }
    }

    const reducedMotion = Boolean(options.reducedMotion)
    const frames = [...stage.querySelectorAll('[data-career-layer]')]
    const meters = [...stage.querySelectorAll('[data-career-meter] i')]
    const stateLabel = stage.querySelector('[data-career-state]')
    const stateDetail = stage.querySelector('[data-career-detail]')
    const stateIndex = stage.querySelector('[data-career-index]')
    const snapshotTargets = Array.isArray(options.snapshotTargets) ? options.snapshotTargets : []
    let snapshots = []
    let layout = ''
    let progress = 0

    // Uma cena de sprite por fase. Entre dois cargos a cena troca no meio do
    // caminho, com um efeito de fita rebobinando (--career-warp de 0 a 1 a 0).
    function setProgress(nextProgress) {
      const raw = Number.isFinite(nextProgress) ? nextProgress : 0
      progress = clamp(raw, 0, STATES.length - 1)
      const renderedProgress = reducedMotion ? Math.round(progress) : progress
      const activeIndex = clamp(Math.round(renderedProgress), 0, STATES.length - 1)
      const active = STATES[activeIndex]
      const from = Math.min(Math.floor(renderedProgress), STATES.length - 2)
      const local = renderedProgress - from
      const warp = Math.max(0, Math.sin(Math.PI * local))
      const tick = Math.floor(local * 20) % 2
      // No auge do rebobinar as duas cenas piscam, como quadros pulando na fita.
      const shown = warp > 0.8 ? from + tick : (local < 0.5 ? from : from + 1)
      const jitter = Math.round(warp * 2) * (tick ? 1 : -1)

      stage.dataset.careerActive = active.id
      stage.dataset.careerProgress = renderedProgress.toFixed(3)
      stage.style.setProperty('--career-tone', active.color)
      stage.style.setProperty('--career-warp', warp.toFixed(3))
      if (stateLabel) stateLabel.textContent = active.label
      if (stateDetail) stateDetail.textContent = active.detail
      if (stateIndex) stateIndex.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(STATES.length).padStart(2, '0')}`

      frames.forEach((frame, index) => {
        const visible = index === shown
        frame.style.opacity = visible ? '1' : '0'
        frame.style.transform = visible && jitter ? `translateX(${jitter}px)` : ''
      })
      meters.forEach((meter, index) => meter.classList.toggle('is-active', index <= activeIndex))
    }

    // Tela baixa: o palco deixa de ser sticky e cada cargo seguinte ganha um
    // quadro fixo do seu estado logo no início, então nenhuma fase some.
    function buildSnapshots() {
      snapshotTargets.slice(1, STATES.length).forEach((target, offset) => {
        if (!target || typeof stage.cloneNode !== 'function') return
        const host = target.querySelector('.jr__body') || target
        const clone = stage.cloneNode(true)
        clone.removeAttribute('data-career-stage')
        clone.classList.add('career-stage--snapshot')
        ;['defs', '.career-stage__hint'].forEach((selector) => {
          const extra = clone.querySelector(selector)
          if (extra) extra.remove()
        })
        clone.dataset.careerLayout = 'mobile-static'
        create(clone, { reducedMotion: true }).setProgress(offset + 1)
        host.prepend(clone)
        snapshots.push(clone)
      })
    }

    function clearSnapshots() {
      snapshots.forEach((clone) => clone.remove())
      snapshots = []
    }

    function setLayout(nextLayout) {
      const value = nextLayout || 'desktop'
      if (value === layout) return
      layout = value
      stage.dataset.careerLayout = value
      clearSnapshots()
      if (value === 'mobile-static') buildSnapshots()
    }

    setProgress(0)
    return { setProgress, setLayout, destroy: clearSnapshots, getProgress: () => progress }
  }

  return { STATES, computeProgress, chooseLayout, create }
})
