import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { initI18n } from '@/helpers/i18n';

export function I18nProvider({ children }: { children: ReactNode }) {
  //set up language
  console.log("Setting up language...");
  initI18n();
  console.log("i18n provider initialized with language:", i18n.language);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}