import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

const GLOW = "shadow-[0_0_20px_rgba(168,85,247,0.6)]";
const GLOW_SM = "shadow-[0_0_15px_rgba(168,85,247,0.3)]";

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
    <main className="w-full min-h-screen bg-black text-white">
      {/* Navbar */}
      <Header />

      {/* Hero */}
      <section className="w-full py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
            Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Une question ? Notre équipe vous répond sous 24h</p>
        </div>
      </section>

      {/* Content: 2 columns */}
      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Nos coordonnées</h2>
              <div className="space-y-5">
                {CONTACT_INFO.map((c) => (
                  <div key={c.label} className="flex items-start gap-4 p-5 rounded-xl bg-zinc-900 border border-white/5 hover:border-purple-500/30 transition-colors">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={c.svg} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-purple-400 hover:underline">{c.value}</a>
                      ) : (
                        <p className="text-sm text-gray-300">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div className="mt-8 p-5 rounded-xl bg-zinc-900 border border-white/5">
                <p className="text-sm text-gray-400 mb-3">Consultez aussi :</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/faq" className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">FAQ</Link>
                  <Link href="/politique-de-retour" className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">Retours & Remboursements</Link>
                  <Link href="/cgv" className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">CGV</Link>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Envoyez-nous un message</h2>
              <form action="#" className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Nom</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Votre nom complet"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-white/5 text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none focus:shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-white/5 text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none focus:shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Sujet</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Ex: Question sur la compatibilité"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-white/5 text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none focus:shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Décrivez votre demande en détail..."
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-white/5 text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none focus:shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-base transition-all duration-300 ${GLOW}`}
                >
                  Envoyer le message
                </button>
                <p className="text-xs text-gray-600 text-center">Nous répondons généralement sous 24h en jours ouvrés.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-purple-900/30 bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">© 2025 OxaPlay. Tous droits réservés.</p>
            <div className="flex gap-6 text-xs text-gray-500">
              <Link href="/mentions-legales" className="hover:text-purple-400 transition-colors">Mentions Légales</Link>
              <Link href="/cgv" className="hover:text-purple-400 transition-colors">CGV</Link>
              <Link href="/politique-de-confidentialite" className="hover:text-purple-400 transition-colors">Confidentialité</Link>
              <Link href="/politique-de-retour" className="hover:text-purple-400 transition-colors">Retours</Link>
            </div>
          </div>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700" />
      </footer>
    </main>
  );
}
