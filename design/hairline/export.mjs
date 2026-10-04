// Copia o kernel e as figuras do Hairline para apps/web como módulos ES.
// A fonte continua em design/hairline/*.js (o formato do skill hairline-create).
// Uso: node design/hairline/export.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, '../../apps/web/src/components/hairline/figures')
mkdirSync(out, { recursive: true })

const kernel = readFileSync(
	join(here, '../../.claude/skills/hairline-create/kernel.js'),
	'utf8'
)
writeFileSync(
	join(out, 'kernel.js'),
	`// @ts-nocheck\n// Gerado por design/hairline/export.mjs. Não editar.\n${kernel}\nexport default HL\n`
)

for (const name of ['turno', 'sinal', 'encaixe']) {
	const src = readFileSync(join(here, `${name}.js`), 'utf8')
	const body = src
		.replace(/=\s*HL;/, '= HL;')
		.replace(/\nhairline\(\{/, '\nexport default {')
		.replace(/\}\);\s*$/, '};\n')
	writeFileSync(
		join(out, `${name}.js`),
		`// @ts-nocheck\n// Gerado por design/hairline/export.mjs a partir de design/hairline/${name}.js. Não editar.\nimport HL from './kernel'\n${body}`
	)
}
console.log('exported to', out)
