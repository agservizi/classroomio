import { DEFAULT_LOCALE, ensureTranslations } from '$lib/utils/functions/translations';

export const load = async ({ data }) => {
  // Gestiio fork: force Italian UI — no language selector / Accept-Language fallback
  const initLocale = DEFAULT_LOCALE;
  const translationsStart = performance.now();
  await ensureTranslations(initLocale); // keep this just before the `return`
  const translationsMs = Math.round((performance.now() - translationsStart) * 100) / 100;
  console.log(`[+layout.ts] ensureTranslations: ${translationsMs}ms | locale=${initLocale}`);

  return data ?? {};
};
