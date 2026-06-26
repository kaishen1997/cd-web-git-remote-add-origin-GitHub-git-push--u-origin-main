import { useTranslations } from 'next-intl';

export default function ShippingPage() {
  const t = useTranslations('Policies.shipping');

  return (
    <div className="px-8 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-12">{t('title')}</h1>
      <div className="space-y-8 text-sm leading-relaxed text-black/70">
        <section>
          <h2 className="text-black font-bold uppercase mb-4 tracking-widest text-xs">{t('section1_title')}</h2>
          <p>{t('section1_text')}</p>
        </section>
        <section>
          <h2 className="text-black font-bold uppercase mb-4 tracking-widest text-xs">{t('section2_title')}</h2>
          <p>{t('section2_text')}</p>
        </section>
        <section>
          <h2 className="text-black font-bold uppercase mb-4 tracking-widest text-xs">{t('section3_title')}</h2>
          <p>{t('section3_text')}</p>
        </section>
      </div>
    </div>
  );
}
