'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();

  const navItems = [
    { label: t('home'), href: `/${locale}` },
    { label: t('products'), href: `/${locale}/products` },
    { label: t('about'), href: `/${locale}/about` },
    { label: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <nav className="border-b border-black/10 py-6 px-8 flex justify-between items-center sticky top-0 bg-[#f5f5f5]/80 backdrop-blur-md z-50">
      <div className="text-xl font-bold tracking-tighter uppercase">
        <Link href={`/${locale}`}>Industrial Precision</Link>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="hover:text-black/50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
