#!/usr/bin/env node
/**
 * Składa index.html z szablonu i partials.
 * Uruchom: node scripts/build.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
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

const generateGalleryItems = () => {
  const imagesDir = join(root, 'assets', 'images');
  const files = readdirSync(imagesDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();

  return files
    .map((file, i) => {
      const encoded = file.split('').map((c) => {
        if (c === ' ') return '%20';
        if (c === '(') return '%28';
        if (c === ')') return '%29';
        return c;
      }).join('');
      const url = `/assets/images/${encoded}`;
      const delay = i % 4 === 0 ? '' : ` reveal-delay-${i % 4}`;
      return `    <a
      href="${url}"
      class="gallery-item reveal${delay}"
      data-gallery="cabin"
    >
      <img src="${url}" alt="Zdjęcie galerii ${i + 1}" loading="lazy" />
      <div class="gallery-item-overlay">
        <span class="gallery-item-desc">Zdjęcie ${i + 1}</span>
      </div>
    </a>`;
    })
    .join('\n');
};

let output = readFileSync(join(root, 'index.template.html'), 'utf8');
output = output.replace('<!-- PARTIALS:nav -->', readPartials(navPartials));
output = output.replace('<!-- PARTIALS:main -->', readPartials(mainPartials));
output = output.replace('<!-- PARTIALS:footer -->', readPartials(footerPartials));
output = output.replace('<!-- GALLERY:items -->', generateGalleryItems());

writeFileSync(join(root, 'index.html'), output);
console.log('Built index.html + emailjs-config.js + regulamin-config.js');
