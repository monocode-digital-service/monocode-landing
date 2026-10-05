// Gera preview.html: as figuras lado a lado, no tamanho do painel do site,
// com paletas da marca e controles de espessura e cor (variáveis --hairline-*).
// Uso: node design/hairline/preview.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const kernel = readFileSync(
	join(here, '../../.claude/skills/hairline-create/kernel.js'),
	'utf8'
)
const names = process.argv[2] ? process.argv[2].split(',') : ['turno', 'sinal', 'encaixe']
const preset = process.argv[3] || ''
const figures = names.map(n =>
	readFileSync(join(here, `${n}.js`), 'utf8')
)

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hairline · prévia Monocode</title>
<style>
  body { margin: 0; padding: 32px; font: 14px/1.5 system-ui, sans-serif; background: #e9eee9; color: #0f3b27; }
  h1 { font-size: 18px; margin: 0 0 16px; }
  .bar { display: flex; flex-wrap: wrap; gap: 12px 20px; align-items: center; margin-bottom: 24px; }
  .bar button { font: inherit; padding: 6px 12px; border: 1px solid #0f3b27; background: #fff; border-radius: 999px; cursor: pointer; }
  .bar button[aria-pressed="true"] { background: #0f3b27; color: #f7f9f7; }
  .bar label { display: flex; gap: 6px; align-items: center; font: 12px ui-monospace, monospace; }
  .row { display: flex; flex-wrap: wrap; gap: 24px; padding: 24px; border-radius: 4px; }
  .cell { width: var(--size, 300px); }
  .cell p { margin: 8px 0 0; font: 12px ui-monospace, monospace; opacity: .7; }
  .frame { position: relative; }
  .frame::before, .frame::after { content: ""; position: absolute; width: 12px; height: 12px; border-color: currentColor; pointer-events: none; }
  .frame::before { top: 0; left: 0; border-top: 1.5px solid; border-left: 1.5px solid; }
  .frame::after { bottom: 0; right: 0; border-bottom: 1.5px solid; border-right: 1.5px solid; }
</style>
</head>
<body>
<h1>Hairline · prévia nas cores do site</h1>
<div class="bar" id="bar"></div>
<div class="row" id="row"></div>
<script>${kernel}</script>
<script>
const PRESETS = {
  'Soluções · verde + laranja': { bg: '#f5f8f5', ink: '#0f3b27', plate: '#f5f8f5', edge: '#0f3b27', mid: '#8fa597', lo: '#cfdcd3', hi: '#ff7036' },
  'Soluções · verde tom sobre tom': { bg: '#f5f8f5', ink: '#0f3b27', plate: '#f5f8f5', edge: '#4d6b5c', mid: '#9db2a4', lo: '#d3ded6', hi: '#0f3b27' },
  'Soluções · menta': { bg: '#cff1d2', ink: '#0f3b27', plate: '#e4f5e6', edge: '#0f3b27', mid: '#5f8a70', lo: '#a9cfb0', hi: '#ff7036' },
  'Como trabalhamos · escuro': { bg: '#0f3d29', ink: '#92ff5f', plate: '#0f3d29', edge: '#92ff5f', mid: '#4f9a5f', lo: '#2b6443', hi: '#ff7036' },
}
const VARS = ['plate', 'edge', 'mid', 'lo', 'hi']
const row = document.getElementById('row'), bar = document.getElementById('bar')
const figs = []
window.hairline = f => figs.push(f)
${figures.map(f => '{\n' + f + '\n}').join('\n')}
HL.inject(document)
const stages = figs.map(f => {
  const cell = document.createElement('div'); cell.className = 'cell'
  const frame = document.createElement('div'); frame.className = 'frame'
  const stage = document.createElement('div'); stage.setAttribute('data-hairline', f.name)
  const p = document.createElement('p')
  frame.append(stage); cell.append(frame, p); row.append(cell)
  const svg = HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, stage)
  const read = { set textContent(v) { p.textContent = f.name + ' · ' + v } }
  read.textContent = 'rest'
  f.mount({ stage, svg, read }, f.range[1])
  return stage
})
let current = PRESETS[${JSON.stringify(preset)}] ? ${JSON.stringify(preset)} : Object.keys(PRESETS)[0], stroke = 1.2, size = 300
function apply() {
  const c = PRESETS[current]
  row.style.background = c.bg; row.style.color = c.ink
  row.style.setProperty('--size', size + 'px')
  for (const s of stages) {
    s.style.setProperty('--hairline-stroke', stroke)
    for (const k of VARS) s.style.setProperty('--hairline-' + k, c[k])
  }
  for (const k of VARS) document.getElementById('c-' + k).value = c[k]
  document.getElementById('sv').textContent = stroke.toFixed(2)
  bar.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.textContent === current))
}
for (const name of Object.keys(PRESETS)) {
  const b = document.createElement('button'); b.textContent = name
  b.onclick = () => { current = name; apply() }; bar.append(b)
}
const label = (html) => { const l = document.createElement('label'); l.innerHTML = html; bar.append(l); return l }
label('espessura <input id="sw" type="range" min="0.6" max="2.4" step="0.05" value="1.2"> <span id="sv"></span>')
  .querySelector('input').oninput = e => { stroke = Number(e.target.value); apply() }
label('tamanho <input type="range" min="240" max="480" step="10" value="300">')
  .querySelector('input').oninput = e => { size = Number(e.target.value); apply() }
for (const k of VARS) {
  label(k + ' <input id="c-' + k + '" type="color">').querySelector('input').oninput = e => { PRESETS[current][k] = e.target.value; apply() }
}
apply()
</script>
</body>
</html>`

const outName = process.argv[4] || 'preview.html'
writeFileSync(join(here, outName), html)
console.log('wrote', join(here, outName))
