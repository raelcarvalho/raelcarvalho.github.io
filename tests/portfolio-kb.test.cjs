const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const modulePath = path.join(root, 'assets', 'js', 'portfolio-kb.js')

function getKb() {
  let api = null
  try {
    api = require(modulePath)
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error
  }
  assert.ok(api, 'portfolio-kb.js should export the assistant knowledge base')
  return api
}

const html = () => fs.readFileSync(path.join(root, 'index.html'), 'utf8')

test('every answer is complete, unique and points to a real section', () => {
  const { KB } = getKb()
  const ids = new Set()
  const anchors = new Set([...html().matchAll(/\sid="([^"]+)"/g)].map((match) => `#${match[1]}`))
  assert.ok(KB.length >= 30, `expected at least 30 questions, got ${KB.length}`)
  KB.forEach((entry) => {
    assert.ok(entry.id && !ids.has(entry.id), `duplicated or empty id: ${entry.id}`)
    ids.add(entry.id)
    assert.ok(entry.q.trim().endsWith('?') || entry.id === 'resumo', `${entry.id} question should read as a question`)
    assert.ok(entry.keys.length > 0, `${entry.id} needs keywords`)
    assert.ok(entry.a.length > 60, `${entry.id} answer is too short`)
    assert.ok(entry.src.length > 0, `${entry.id} needs a source`)
    entry.src.forEach(([, href]) => assert.ok(anchors.has(href), `${entry.id} source ${href} does not exist`))
  })
})

test('questions reach the expected answer', () => {
  const { answer } = getKb()
  const cases = [
    ['Resumo em 30 segundos', 'resumo'],
    ['Onde você já trabalhou?', 'carreira'],
    ['O que você faz na Cadastra hoje?', 'cadastra'],
    ['Como foi no Mercadinho do Zé?', 'mercadinho'],
    ['Como foi sua passagem pela TCS?', 'tcs'],
    ['Como você começou na área de tecnologia?', 'suporte'],
    ['Qual sua formação?', 'formacao'],
    ['Tem certificação AWS?', 'formacao-aws'],
    ['Quais tecnologias você usa?', 'stack'],
    ['Você tem experiência com AWS?', 'nuvem'],
    ['Que arquitetura você usa?', 'arquitetura'],
    ['Qual sua experiência com IA?', 'ia'],
    ['Quais sistemas você criou?', 'produtos'],
    ['Quanto tempo levou para fazer os sistemas?', 'tempo-sistemas'],
    ['Quanto tempo de experiência você tem?', 'tempo'],
    ['O que é o OrdenaHub?', 'oh'],
    ['Para quem é o OrdenaHub?', 'oh-quem'],
    ['O OrdenaHub emite nota fiscal?', 'oh-fiscal'],
    ['O que é o Vetnix?', 'vet'],
    ['Como o tutor acompanha o pet?', 'vet-tutor'],
    ['Como funciona o Mix Awards?', 'mix'],
    ['Você fez os sistemas sozinho?', 'solo'],
    ['Posso ver o código?', 'codigo'],
    ['Onde você mora?', 'local'],
    ['Trabalha remoto?', 'local'],
    ['O que posso perguntar?', 'ajuda'],
    ['Qual seu diferencial?', 'diferencial'],
    ['Como você cuida de segurança?', 'seguranca'],
    ['Está disponível?', 'disp'],
  ]
  cases.forEach(([question, id]) => assert.equal(answer(question).id, id, question))
})

test('short keywords only match whole words', () => {
  const { answer } = getKb()
  assert.notEqual(answer('Fale da sua experiência em família de produtos').id, 'ia')
  assert.equal(answer('Qual é a capital da França?').id, null)
})

test('answers describe the products without exposing how they are built inside', () => {
  const { KB } = getKb()
  const internals = ['middleware', 'lock de linha', 'idempotente', 'monolito', 'snapshot', 'probabilidade', 'feature flag', 'worker', 'normalizado', 'webhooks duráveis', 'asaas', 'sorteio ponderado', 'multi-tenant']
  KB.forEach((entry) => internals.forEach((word) => assert.equal(entry.a.toLowerCase().includes(word), false, `${entry.id} exposes "${word}"`)))
})

test('each reading mode suggests four unasked questions first', () => {
  const { KB, SUGGEST, suggestions } = getKb()
  const ids = new Set(KB.map((entry) => entry.id))
  ;['rec', 'dev', 'cli'].forEach((lens) => {
    assert.ok(SUGGEST[lens].length >= 6, `${lens} should rotate through at least six questions`)
    SUGGEST[lens].forEach((id) => assert.ok(ids.has(id), `${lens} suggests unknown ${id}`))
    const first = suggestions(lens, [])
    assert.equal(first.length, 4)
    const next = suggestions(lens, first)
    assert.equal(next.length, 4)
    assert.equal(next.filter((id) => !first.includes(id)).length >= 2, true, `${lens} should surface new questions after asking`)
  })
})

test('app loads the knowledge base before app.js and no longer keeps its own copy', () => {
  const page = html()
  assert.ok(page.indexOf('assets/js/portfolio-kb.js') > 0 && page.indexOf('assets/js/portfolio-kb.js') < page.indexOf('assets/js/app.js'))
  const app = fs.readFileSync(path.join(root, 'assets', 'js', 'app.js'), 'utf8')
  assert.equal(/const KB = \[/.test(app), false)
  assert.ok(app.includes('PortfolioKB'))
})
