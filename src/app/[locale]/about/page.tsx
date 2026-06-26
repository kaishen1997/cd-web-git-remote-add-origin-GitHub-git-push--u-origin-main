import {useTranslations} from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="px-8 py-20 max-w-4xl">
      <h1 className="text-5xl font-bold uppercase tracking-tighter mb-12 border-b-4 border-black pb-4 inline-block">
        {t('title')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div className="space-y-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-black/40">{t('subtitle')}</h2>
          <p className="text-lg leading-relaxed">
            {t('content')}
          </p>
        </div>
        
        <div className="border-l border-black/10 pl-12 space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase mb-2">{t('mission_title')}</h3>
            <p className="text-black/60">{t('mission_text')}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-2">{t('values_title')}</h3>
            <ul className="text-black/60 space-y-1 uppercase text-xs tracking-widest">
              {t.raw('values').map((val: string, i: number) => (
                <li key={i}>• {val}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-3 gap-8 border-t border-black/10 pt-12 text-center">
        <div>
          <div className="text-3xl font-bold">15+</div>
          <div className="text-xs uppercase tracking-widest text-black/40">{t('stats.exp')}</div>
        </div>
        <div>
          <div className="text-3xl font-bold">5000+</div>
          <div className="text-xs uppercase tracking-widest text-black/40">{t('stats.clients')}</div>
        </div>
        <div>
          <div className="text-3xl font-bold">0.001mg</div>
          <div className="text-xs uppercase tracking-widest text-black/40">{t('stats.tolerance')}</div>
        </div>
      </div>
    </div>
  );
}
