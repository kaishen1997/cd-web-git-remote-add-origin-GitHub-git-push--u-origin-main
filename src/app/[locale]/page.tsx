import {useTranslations} from 'next-intl';
import Image from "next/image";

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
        {t('title')}
      </h1>
      <p className="text-lg md:text-xl text-black/60 max-w-2xl mb-12 uppercase tracking-widest">
        {t('description')}
      </p>

      <div className="flex gap-4">
        <button className="px-8 py-4 bg-black text-white uppercase text-sm tracking-widest hover:bg-black/80 transition-all">
          View Products
        </button>
        <button className="px-8 py-4 border border-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all">
          Get a Quote
        </button>
      </div>
    </div>
  );
}
