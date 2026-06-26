import {useTranslations} from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="px-8 py-20">
      <h1 className="text-5xl font-bold uppercase tracking-tighter mb-16 border-b-4 border-black pb-4 inline-block">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info & Form */}
        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase text-black/40 mb-2 tracking-widest">Office</h3>
              <p className="text-sm">123 Industrial Park, Manufacturing District, Shanghai, China</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase text-black/40 mb-2 tracking-widest">Contact</h3>
              <p className="text-sm">+86 (21) 5555 1234<br/>contact@industrial-precision.com</p>
            </div>
          </div>

          <form className="space-y-6 pt-8 border-t border-black/10">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black outline-none text-sm transition-colors" placeholder="Full Name" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black outline-none text-sm transition-colors" placeholder="email@company.com" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black outline-none text-sm transition-colors resize-none" placeholder="Your Inquiry..."></textarea>
            </div>
            <button className="bg-black text-white uppercase text-xs font-bold tracking-[0.2em] px-10 py-4 hover:bg-black/80 transition-all">
              Send Message
            </button>
          </form>
        </div>

        {/* Map Placeholder */}
        <div className="h-full min-h-[400px] bg-black/5 border border-black/10 relative overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-black text-black/10 uppercase mb-2 tracking-tighter">Location Map</div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-black/20 italic">Industrial Zone / Grid 42-B</div>
            </div>
          </div>
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
      </div>
    </div>
  );
}
