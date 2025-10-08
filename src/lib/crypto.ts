// Lightweight client-side crypto helpers
// Uses Web Crypto API: PBKDF2 → AES-GCM.
// Passphrase UI removed: we now derive a stable project key automatically.

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_ANSWER_ENCRYPTION_KEY } from '$env/static/public';

export type EncryptedPayloadV1 = {
  v: 1;
  alg: 'AES-GCM';
  kdf: 'PBKDF2';
  iters: number;
  salt: string; // base64
  iv: string;   // base64
  ct: string;   // base64 ciphertext
};

let inMemoryPassphrase: string | null = null;
const SESSION_KEY = 'shadowwork_passphrase';

export function setPassphrase(passphrase: string, persistInSession = true) {
  inMemoryPassphrase = passphrase || null;
  if (persistInSession && passphrase) {
    try { sessionStorage.setItem(SESSION_KEY, passphrase); } catch {}
  }
}

export function clearPassphrase() {
  inMemoryPassphrase = null;
  try { sessionStorage.removeItem(SESSION_KEY); } catch {}
}

export function getPassphrase(): string | null {
  if (inMemoryPassphrase) return inMemoryPassphrase;
  try {
    const s = sessionStorage.getItem(SESSION_KEY);
    if (s && s.length > 0) {
      inMemoryPassphrase = s;
      return s;
    }
  } catch {}
  return null;
}

// New: derive an automatic project-level passphrase (no UX prompts)
function getAutoPassphrase(): string {
  // Use a project-wide key from env; fallback to anon key for dev
  const base = PUBLIC_ANSWER_ENCRYPTION_KEY || PUBLIC_SUPABASE_ANON_KEY || 'shadowwork-default-key';
  // General encryption key (no per-user salt component here)
  const passphrase = `sw:answers:v1:${base}`;
  return passphrase;
}

function getRandomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return arr;
}

function bufToBase64(buf: ArrayBuffer | ArrayBufferLike): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBuf(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function deriveAesKey(passphrase: string, saltBuf: ArrayBuffer, iterations = 200_000): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBuf, iterations, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
  return key;
}

export function isEncryptedPayload(text: string | null | undefined): boolean {
  if (!text) return false;
  try {
    const obj = JSON.parse(text);
    return obj && obj.v === 1 && obj.alg === 'AES-GCM' && typeof obj.ct === 'string';
  } catch {
    return false;
  }
}

export async function encryptText(plaintext: string, passphrase?: string | null): Promise<string> {
  // Prefer explicit passphrase; otherwise use automatic project-derived one
  const p = passphrase ?? getPassphrase() ?? getAutoPassphrase();

  const enc = new TextEncoder();
  const saltBytes = getRandomBytes(16);
  const ivBytes = getRandomBytes(12);
  const key = await deriveAesKey(p, saltBytes.buffer as ArrayBuffer);
  const ptBytes = enc.encode(plaintext);
  const ctBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: ivBytes.buffer as ArrayBuffer },
    key,
    ptBytes.buffer as ArrayBuffer
  );
  const payload: EncryptedPayloadV1 = {
    v: 1,
    alg: 'AES-GCM',
    kdf: 'PBKDF2',
    iters: 200_000,
    salt: bufToBase64(saltBytes.buffer as ArrayBuffer),
    iv: bufToBase64(ivBytes.buffer as ArrayBuffer),
    ct: bufToBase64(ctBuf)
  };
  return JSON.stringify(payload);
}

export async function decryptText(ciphertextJson: string, passphrase?: string | null): Promise<string> {
  const p = passphrase ?? getPassphrase() ?? getAutoPassphrase();
  let payload: EncryptedPayloadV1;
  try {
    payload = JSON.parse(ciphertextJson);
  } catch {
    throw new Error('Invalid encrypted payload');
  }
  if (payload.v !== 1 || payload.alg !== 'AES-GCM') throw new Error('Unsupported payload');

  const saltBuf = base64ToBuf(payload.salt);
  const ivBuf = base64ToBuf(payload.iv);
  const ctBuf = base64ToBuf(payload.ct);
  const key = await deriveAesKey(p, saltBuf as ArrayBuffer, payload.iters || 200_000);
  const ptBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuf as ArrayBuffer },
    key,
    ctBuf as ArrayBuffer
  );
  const dec = new TextDecoder();
  return dec.decode(ptBuf);
}

export async function tryDecrypt(text: string | null | undefined): Promise<string | null> {
  if (!text) return null;
  if (!isEncryptedPayload(text)) return text;
  try {
    return await decryptText(text);
  } catch {
    return null; // Cannot decrypt without passphrase or invalid payload
  }
}