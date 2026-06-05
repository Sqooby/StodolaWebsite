import { writeFileSync } from 'fs';
import { join } from 'path';
import { loadEnv, requireEnv } from './load-env.mjs';

const KEYS = ['WIFI_SSID', 'WIFI_PASSWORD'];

export function generateRegulaminConfig(root) {
  const env = requireEnv(loadEnv(root), KEYS);

  const output = `// Wygenerowano automatycznie — nie edytuj ręcznie.
const RegulaminConfig = Object.freeze({
  ssid: ${JSON.stringify(env.WIFI_SSID)},
  password: ${JSON.stringify(env.WIFI_PASSWORD)},
});
`;

  const target = join(root, 'assets/js/regulamin-config.js');
  writeFileSync(target, output);
  return target;
}
