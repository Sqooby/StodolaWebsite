import { writeFileSync } from 'fs';
import { join } from 'path';
import { loadEnv, requireEnv } from './load-env.mjs';

const KEYS = [
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
  'EMAILJS_PUBLIC_KEY',
];

export function generateEmailjsConfig(root) {
  const env = requireEnv(loadEnv(root), KEYS);

  const output = `// Wygenerowano automatycznie — nie edytuj ręcznie.
const EmailJSConfig = Object.freeze({
  serviceId: ${JSON.stringify(env.EMAILJS_SERVICE_ID)},
  templateId: ${JSON.stringify(env.EMAILJS_TEMPLATE_ID)},
  publicKey: ${JSON.stringify(env.EMAILJS_PUBLIC_KEY)},
});
`;

  const target = join(root, 'assets/js/emailjs-config.js');
  writeFileSync(target, output);
  return target;
}
