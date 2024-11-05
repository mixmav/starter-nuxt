export default defineNuxtPlugin(async () => {
  const { webcrypto } = await import('crypto');
  globalThis.crypto ??= webcrypto as unknown as Crypto;
});
