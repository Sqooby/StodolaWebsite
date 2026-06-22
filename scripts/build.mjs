#!/usr/bin/env node
/**
 * Składa index.html z szablonu i partials.
 * Uruchom: node scripts/build.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateEmailjsConfig } from './generate-emailjs-config.mjs';
import { generateRegulaminConfig } from './generate-regulamin-config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

generateEmailjsConfig(root);
generateRegulaminConfig(root);

const navPartials = ['nav'];
const mainPartials = ['hero', 'intro', 'gallery', 'amenities', 'location', 'contact'];
const footerPartials = ['footer'];

const readPartials = (names) =>
  names.map((name) => readFileSync(join(root, 'partials', `${name}.html`), 'utf8')).join('\n\n');

let output = readFileSync(join(root, 'index.template.html'), 'utf8');
output = output.replace('<!-- PARTIALS:nav -->', readPartials(navPartials));
output = output.replace('<!-- PARTIALS:main -->', readPartials(mainPartials));
output = output.replace('<!-- PARTIALS:footer -->', readPartials(footerPartials));

writeFileSync(join(root, 'index.html'), output);
console.log('Built index.html + emailjs-config.js + regulamin-config.js');
