const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const modulePath = path.resolve(__dirname, '..', 'assets', 'js', 'career-blueprint.js')

function loadApi() {
  try {
    return require(modulePath)
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') return null
    throw error
  }
}

function getApi() {
  const api = loadApi()
  assert.ok(api, 'career-blueprint.js should export the CareerBlueprint API')
  assert.equal(typeof api.computeProgress, 'function')
  return api
}

const metrics = [
  { center: 230, height: 460 },
  { center: 650, height: 380 },
  { center: 1135, height: 590 },
  { center: 1555, height: 250 },
]

test('clamps before first and after last career item', () => {
  const { computeProgress } = getApi()
  assert.equal(computeProgress(metrics, -500), 0)
  assert.equal(computeProgress(metrics, 230), 0)
  assert.equal(computeProgress(metrics, 1555), 3)
  assert.equal(computeProgress(metrics, 3000), 3)
})

test('holds exact state around each item center', () => {
  const { computeProgress } = getApi()
  assert.equal(computeProgress(metrics, 300), 0)
  assert.equal(computeProgress(metrics, 600), 1)
  assert.equal(computeProgress(metrics, 700), 1)
  assert.equal(computeProgress(metrics, 1080), 2)
  assert.equal(computeProgress(metrics, 1200), 2)
  assert.equal(computeProgress(metrics, 1520), 3)
})

test('interpolates only between hold zones', () => {
  const { computeProgress } = getApi()
  const firstTransitionMidpoint = (331.2 + 566.4) / 2
  const secondTransitionMidpoint = (733.6 + 1025) / 2
  assert.ok(Math.abs(computeProgress(metrics, firstTransitionMidpoint) - 0.5) < 0.001)
  assert.ok(Math.abs(computeProgress(metrics, secondTransitionMidpoint) - 1.5) < 0.001)
})

test('returns the same phase for the same anchor when scrolling in reverse', () => {
  const { computeProgress } = getApi()
  const anchors = [250, 420, 650, 880, 1135, 1370, 1555]
  const forward = anchors.map((anchor) => computeProgress(metrics, anchor))
  const reverse = [...anchors].reverse().map((anchor) => computeProgress(metrics, anchor)).reverse()
  assert.deepEqual(reverse, forward)
})

test('handles missing or single-item metrics safely', () => {
  const { computeProgress } = getApi()
  assert.equal(computeProgress([], 100), 0)
  assert.equal(computeProgress(null, 100), 0)
  assert.equal(computeProgress([{ center: 50, height: 100 }], -100), 0)
  assert.equal(computeProgress([{ center: 50, height: 100 }], 1000), 0)
})

test('career markup exposes one complete blueprint stage before app startup', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8')
  const stageMatches = html.match(/data-career-stage/g) || []
  const layerMatches = [...html.matchAll(/data-career-layer="([^"]+)"/g)].map((match) => match[1])
  assert.equal(stageMatches.length, 1)
  assert.deepEqual(layerMatches.sort(), ['cadastra', 'itau', 'seguros', 'support'])
  assert.equal(html.includes('tree__svg'), false)
  assert.equal(html.includes('data-t-apple'), false)
  assert.ok(html.indexOf('assets/js/career-blueprint.js') < html.indexOf('assets/js/app.js'))
})

function fakeElement() {
  const properties = new Map()
  const attributes = new Map()
  return {
    attributes,
    setAttribute(name, value) { attributes.set(name, String(value)) },
    getAttribute(name) { return attributes.has(name) ? attributes.get(name) : null },
    dataset: {},
    textContent: '',
    classList: { toggle() {} },
    style: {
      opacity: '',
      transform: '',
      setProperty(name, value) { properties.set(name, value) },
      getPropertyValue(name) { return properties.get(name) || '' },
    },
  }
}

function fakeStage() {
  const layers = ['cadastra', 'seguros', 'itau', 'support'].map((id) => {
    const element = fakeElement()
    element.dataset.careerLayer = id
    return element
  })
  const fields = {
    '[data-career-state]': fakeElement(),
    '[data-career-detail]': fakeElement(),
    '[data-career-index]': fakeElement(),
    '[data-career-console]': fakeElement(),
    '[data-career-shared]': fakeElement(),
  }
  const meters = Array.from({ length: 4 }, fakeElement)
  const tokens = Array.from({ length: 3 }, fakeElement)
  const lists = { '[data-career-layer]': layers, '[data-career-meter] i': meters, '[data-career-token]': tokens }
  const stage = fakeElement()
  stage.querySelector = (selector) => fields[selector] || null
  stage.querySelectorAll = (selector) => lists[selector] || []
  return { stage, layers, fields, meters, tokens }
}

const visibleFrames = (fixture) => fixture.layers.map((layer) => Number(layer.style.opacity))

test('renderer exposes a replaceable continuous setProgress interface', () => {
  const { create } = getApi()
  assert.equal(typeof create, 'function')
  const fixture = fakeStage()
  const renderer = create(fixture.stage, { reducedMotion: false })
  renderer.setProgress(0)
  assert.equal(fixture.stage.dataset.careerActive, 'cadastra')
  assert.equal(fixture.fields['[data-career-state]'].textContent, 'Profissional completo')
  assert.deepEqual(visibleFrames(fixture), [1, 0, 0, 0])
  renderer.setProgress(1.25)
  assert.equal(fixture.stage.dataset.careerActive, 'seguros')
  assert.deepEqual(visibleFrames(fixture), [0, 1, 0, 0])
  renderer.setProgress(1.5)
  assert.equal(fixture.stage.dataset.careerActive, 'itau')
  assert.equal(visibleFrames(fixture).reduce((sum, value) => sum + value, 0), 1)
  renderer.setLayout('mobile-sticky')
  assert.equal(fixture.stage.dataset.careerLayout, 'mobile-sticky')
})

test('sprite swaps frames discretely and rewinds only between jobs', () => {
  const { create } = getApi()
  const fixture = fakeStage()
  const renderer = create(fixture.stage, { reducedMotion: false })
  const warp = () => fixture.stage.style.getPropertyValue('--career-warp')
  ;[0, 1, 2, 3].forEach((state) => {
    renderer.setProgress(state)
    assert.equal(warp(), '0.000')
    assert.deepEqual(visibleFrames(fixture), [0, 1, 2, 3].map((index) => (index === state ? 1 : 0)))
  })
  renderer.setProgress(2.5)
  assert.equal(warp(), '1.000')
  renderer.setProgress(2.1)
  assert.deepEqual(visibleFrames(fixture), [0, 0, 1, 0])
  renderer.setProgress(2.9)
  assert.deepEqual(visibleFrames(fixture), [0, 0, 0, 1])
})

test('reduced-motion renderer snaps continuous progress to a firm state', () => {
  const { create } = getApi()
  const fixture = fakeStage()
  const renderer = create(fixture.stage, { reducedMotion: true })
  renderer.setProgress(1.5)
  assert.equal(fixture.stage.dataset.careerActive, 'itau')
  assert.deepEqual(visibleFrames(fixture), [0, 0, 1, 0])
  assert.equal(fixture.stage.style.getPropertyValue('--career-warp'), '0.000')
})

test('career stage renders an original pixel sprite instead of the blueprint', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8')
  assert.ok(html.includes('data-career-sprite'))
  assert.ok(html.includes('shape-rendering="crispEdges"'))
  assert.equal(html.includes('data-career-token'), false)
  assert.equal(html.includes('career-orbit'), false)
  const css = fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'css', 'styles.css'), 'utf8')
  assert.ok(/image-rendering:\s*pixelated/.test(css))
})

test('scaled career geometry keeps exact states at scaled centers', () => {
  const { computeProgress } = getApi()
  const scaled = metrics.map(({ center, height }) => ({ center: center * 1.25, height: height * 1.25 }))
  scaled.forEach((item, index) => assert.equal(computeProgress(scaled, item.center), index))
})

test('invalid or unordered geometry falls back to the first state', () => {
  const { computeProgress } = getApi()
  assert.equal(computeProgress([{ center: 100, height: -1 }, { center: 200, height: 100 }], 150), 0)
  assert.equal(computeProgress([{ center: 650, height: 380 }, { center: 230, height: 460 }], 1000), 0)
})

test('career progress is monotonic for ascending viewport anchors', () => {
  const { computeProgress } = getApi()
  const values = Array.from({ length: 40 }, (_, index) => computeProgress(metrics, index * 50))
  values.slice(1).forEach((value, index) => assert.ok(value >= values[index]))
})

function readApp() {
  return fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'js', 'app.js'), 'utf8')
}

function blockAfter(source, marker) {
  const start = source.indexOf(marker)
  assert.ok(start >= 0, `app.js should contain ${marker}`)
  const open = source.indexOf('{', start)
  let depth = 0
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1
    if (source[index] === '}') depth -= 1
    if (depth === 0) return source.slice(open, index + 1)
  }
  return source.slice(open)
}

test('journey drives the blueprint renderer instead of the old career tree', () => {
  const app = readApp()
  assert.equal(app.includes('careerTree'), false)
  assert.equal(/tree__svg|data-t-|data-tree-/.test(app), false)
  const journey = blockAfter(app, 'function journey()')
  assert.ok(journey.includes('CareerBlueprint.create('))
  assert.ok(journey.includes('CareerBlueprint.computeProgress('))
  assert.ok(journey.includes('.setProgress('))
  assert.ok(journey.includes('document.fonts'))
  assert.ok(journey.includes('ResizeObserver'))
})

test('journey scroll draw uses cached geometry without layout reads', () => {
  const draw = blockAfter(blockAfter(readApp(), 'function journey()'), 'journeyDraw = () =>')
  assert.equal(draw.includes('getBoundingClientRect'), false)
  assert.equal(draw.includes('offsetHeight'), false)
  assert.ok(draw.includes('innerHeight'))
})

test('STATES carry complete metadata for the four ordered phases', () => {
  const { STATES } = getApi()
  assert.deepEqual(STATES.map((state) => state.id), ['cadastra', 'seguros', 'itau', 'support'])
  STATES.forEach((state) => {
    ;['label', 'detail', 'color'].forEach((field) => {
      assert.equal(typeof state[field], 'string')
      assert.ok(state[field].trim().length > 0, `${state.id}.${field} should not be empty`)
    })
  })
})

test('chooseLayout maps viewport size to desktop, mobile-sticky or mobile-static', () => {
  const { chooseLayout } = getApi()
  assert.equal(typeof chooseLayout, 'function')
  assert.equal(chooseLayout(1280, 720), 'desktop')
  assert.equal(chooseLayout(768, 900), 'desktop')
  assert.equal(chooseLayout(721, 500), 'desktop')
  assert.equal(chooseLayout(720, 800), 'mobile-sticky')
  assert.equal(chooseLayout(375, 812), 'mobile-sticky')
  assert.equal(chooseLayout(375, 620), 'mobile-sticky')
  assert.equal(chooseLayout(375, 619), 'mobile-static')
  assert.equal(chooseLayout(375, 560), 'mobile-static')
  assert.equal(chooseLayout(Number.NaN, 560), 'desktop')
})

function snapshotFixture() {
  const created = []
  const makeStage = () => {
    const fixture = fakeStage()
    const { stage } = fixture
    const classes = new Set()
    stage.classList = { add: (name) => classes.add(name), toggle() {}, contains: (name) => classes.has(name) }
    stage.removed = false
    stage.removeAttribute = (name) => { if (name === 'data-career-stage') stage.dataset.careerStage = undefined }
    stage.remove = () => { stage.removed = true }
    stage.cloneNode = () => { const clone = makeStage(); created.push(clone); return clone.stage }
    const base = stage.querySelector
    stage.querySelector = (selector) => (selector === 'defs' || selector === '.career-stage__hint') ? null : base(selector)
    return fixture
  }
  const main = makeStage()
  const targets = Array.from({ length: 4 }, () => {
    const host = { children: [], prepend(node) { this.children.unshift(node) } }
    return { host, querySelector: (selector) => selector === '.jr__body' ? host : null }
  })
  return { main, targets, created }
}

test('mobile-static pins a static snapshot at the start of each later job', () => {
  const { create } = getApi()
  const { main, targets, created } = snapshotFixture()
  const renderer = create(main.stage, { reducedMotion: false, snapshotTargets: targets })
  renderer.setLayout('mobile-static')
  renderer.setLayout('mobile-static')
  assert.equal(created.length, 3)
  assert.equal(targets[0].host.children.length, 0)
  assert.deepEqual(targets.slice(1).map((target) => target.host.children[0].dataset.careerActive), ['seguros', 'itau', 'support'])
  created.forEach((clone) => assert.ok(clone.stage.classList.contains('career-stage--snapshot')))
  renderer.setProgress(2)
  assert.equal(targets[1].host.children[0].dataset.careerActive, 'seguros')
  renderer.setLayout('mobile-sticky')
  created.forEach((clone) => assert.equal(clone.stage.removed, true))
  assert.equal(main.stage.dataset.careerLayout, 'mobile-sticky')
})


test('Rafael wears glasses in every phase and employers show their badge', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8')
  const frames = {}
  for (const match of html.matchAll(/<g data-career-layer="([^"]+)"[\s\S]*?(?=<g data-career-layer=|<g class="sprite-rewind")/g)) frames[match[1]] = match[0]
  assert.deepEqual(Object.keys(frames).sort(), ['cadastra', 'itau', 'seguros', 'support'])
  Object.entries(frames).forEach(([id, frame]) => assert.ok(frame.includes('px-glasses'), `${id} should draw glasses`))
  assert.ok(frames.cadastra.includes('px-cadastra'), 'Cadastra badge')
  assert.ok(frames.itau.includes('px-itau'), 'Itaú badge')
})
