import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function fromProcessEnv() {
  return { ...process.env };
}

function fromDotEnv(root) {
  const path = join(root, '.env');
  if (!existsSync(path)) return {};

  const env = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;

    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    env[key] = value;
  }
  return env;
}

/** Łączy .env (lokalnie) z process.env (Cloudflare Pages build). */
export function loadEnv(root) {
  return { ...fromDotEnv(root), ...fromProcessEnv() };
}

export function requireEnv(env, keys, sourceLabel = 'Cloudflare env lub .env') {
  const missing = keys.filter((key) => !env[key]);
  if (missing.length) {
    throw new Error(
      `Brakujące zmienne: ${missing.join(', ')}. Ustaw je w ${sourceLabel}.`,
    );
  }

  return keys.reduce((acc, key) => {
    acc[key] = env[key];
    return acc;
  }, {});
}
