#!/usr/bin/env node
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateEmailjsConfig } from './generate-emailjs-config.mjs';
import { generateRegulaminConfig } from './generate-regulamin-config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

generateEmailjsConfig(root);
generateRegulaminConfig(root);

console.log('Generated emailjs-config.js + regulamin-config.js');
