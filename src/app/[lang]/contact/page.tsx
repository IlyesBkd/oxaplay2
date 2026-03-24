import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";


const CONTACT_INFO = [
  {
    label: "Email",
    value: "support@oxaplay.com",
    href: "mailto:support@oxaplay.com",
    svg: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "Horaires",
    value: "Lun – Ven, 9h – 18h",
    href: null,
    svg: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Adresse",
    value: "42 Rue du Faubourg Saint-Honoré, 75008 Paris",
    href: null,
    svg: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
  },
  {
    label: "Délai de réponse",
    value: "Moins de 24h en jours ouvrés",
    href: null,
    svg: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white">
      <Header />

      <section className="w-full py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-6">Support</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Contactez-nous.</h1>
          <p className="text-zinc-500 text-base max-w-xl mx-auto">Une question ? Notre équipe vous répond sous 24h.</p>
        </div>
      </section>

      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact info */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">Nos coordonnées</h2>
              <div className="space-y-4">
                {CONTACT_INFO.map((c) => (
                  <div key={c.label} className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors duration-300">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                      <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={c.svg} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-1">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-white hover:text-zinc-300 transition-colors duration-300">{c.value}</a>
                      ) : (
                        <p className="text-sm text-zinc-400">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <p className="text-sm text-zinc-500 mb-3">Consultez aussi :</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/faq" className="px-3 py-1.5 rounded-full bg-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300">FAQ</Link>
                  <Link href="/politique-de-retour" className="px-3 py-1.5 rounded-full bg-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300">Retours & Remboursements</Link>
                  <Link href="/cgv" className="px-3 py-1.5 rounded-full bg-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300">CGV</Link>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">Envoyez-nous un message</h2>
              <form action="#" className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-2">Nom</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Votre nom complet"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-2">Sujet</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Ex: Question sur la compatibilité"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Décrivez votre demande en détail..."
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Envoyer le message
                </button>
                <p className="text-xs text-zinc-600 text-center">Nous répondons généralement sous 24h en jours ouvrés.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-zinc-800/50 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-700">© 2025 OxaPlay. Tous droits réservés.</p>
            <div className="flex gap-6 text-xs text-zinc-600">
              <Link href="/mentions-legales" className="hover:text-white transition-colors duration-300">Mentions Légales</Link>
              <Link href="/cgv" className="hover:text-white transition-colors duration-300">CGV</Link>
              <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors duration-300">Confidentialité</Link>
              <Link href="/politique-de-retour" className="hover:text-white transition-colors duration-300">Retours</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
