const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const i18n = require(path.join(root, 'assets', 'js', 'i18n.js'))
const { KB } = require(path.join(root, 'assets', 'js', 'portfolio-kb.js'))
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')

test('every assistant question and answer has an English version', () => {
  KB.forEach((entry) => {
    const en = i18n.KB[entry.id]
    assert.ok(en, `${entry.id} has no English version`)
    assert.ok(en[0].length > 5 && en[1].length > 60, `${entry.id} English text is incomplete`)
  })
})

test('every animated title has a full-sentence translation', () => {
  const titles = [...html.matchAll(/<(h[1-3]|p)[^>]*class="[^"]*\bsplit\b[^"]*"[^>]*>([\s\S]*?)<\/\1>/g)]
    .map((m) => m[2].replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    .filter((text) => !['OrdenaHub', 'Vetnix', 'Mix Awards'].includes(text)) // nomes de produto ficam iguais
  titles.forEach((text) => assert.ok(i18n.TITLES[text], `missing title translation: ${text}`))
})

test('sentences with variable parts are translated', () => {
  const cases = [
    ['Bem-vindo de volta, visita nº 3. Mantive o modo Recrutador.', 'Welcome back, visit #3. I kept Recruiter mode.'],
    ['Modo Cliente. A apresentação e os projetos mudaram junto.', 'Client mode. The intro and the projects changed with it.'],
    ['confiança média · fonte', 'confidence medium · source'],
    ['de 2020 a 2024', '2020 to 2024'],
    ['de 2025 até hoje:', '2025 to today:'],
    ['lendária · Dados', 'legendary · Data'],
    ['Concluído em 5 passos, 2 aprovações.', 'Done in 5 steps, 2 approvals.'],
  ]
  cases.forEach(([pt, en]) => assert.equal(i18n.translate(pt), en))
  assert.equal(i18n.translate('Rafael Carvalho'), null)
})

test('the page loads the dictionary after the knowledge base and before the app, with a PT/EN switch', () => {
  const kb = html.indexOf('assets/js/portfolio-kb.js'), lang = html.indexOf('assets/js/i18n.js'), app = html.indexOf('assets/js/app.js')
  assert.ok(kb > 0 && kb < lang && lang < app)
  assert.ok(html.includes('data-lang="pt"') && html.includes('data-lang="en"'))
})
