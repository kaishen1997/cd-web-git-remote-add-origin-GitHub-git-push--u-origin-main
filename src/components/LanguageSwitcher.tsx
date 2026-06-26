'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en';
    // Replace the current locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`) || `/${nextLocale}`;
    router.push(newPathname);
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1 border border-black/20 hover:bg-black hover:text-white transition-colors text-xs uppercase"
    >
      {locale === 'en' ? '中文' : 'EN'}
    </button>
  );
}
