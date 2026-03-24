import Image from "next/image";
import Link from "next/link";
import RatingBadge from "../../components/RatingBadge";
import Header from "../../components/Header";


const TESTIMONIAL_VIDEOS = [
  "/Voiture/temoignages_clients/8617e897bf7249b88b80b3d27bf0e139.HD-720p-1.6Mbps-55016171.mp4",
  "/Voiture/temoignages_clients/b6ee109822b549dba85b66bdf05c87e7.HD-720p-1.6Mbps-55016167.mp4",
  "/Voiture/temoignages_clients/e31e12046750442496efb7bbc708240f.HD-720p-1.6Mbps-55016169.mp4",
  "/Voiture/temoignages_clients/f846a94508024394a8b09956d50115d5.HD-720p-1.6Mbps-55016168.mp4",
];

const TEXT_REVIEWS = [
  { name: "Laurent M.", stars: 5, text: "Incroyable ! J'ai installé l'écran en 3 minutes sur ma BMW E90. Le son passe par le Bluetooth de ma voiture, c'est parfait. CarPlay sans fil, rien à redire." },
  { name: "Sophie D.", stars: 5, text: "J'hésitais à cause du prix, mais franchement c'est le meilleur achat auto que j'ai fait. L'écran est magnifique et Waze tourne super bien." },
  { name: "Karim B.", stars: 5, text: "Livraison reçue en 48h comme promis. L'installation est vraiment plug & play. Ma vieille Clio a maintenant CarPlay, je suis bluffé." },
  { name: "Marie-Claire T.", stars: 4, text: "Très bon produit. Le seul petit bémol c'est que l'écran met 10 secondes à démarrer, mais une fois lancé c'est fluide et réactif." },
  { name: "Thomas R.", stars: 5, text: "J'ai pris la version moto pour mon Yamaha MT-07. Étanche, solide et le GPS fonctionne parfaitement même en plein soleil. Top !" },
  { name: "Émilie V.", stars: 5, text: "Le SAV est au top. J'avais un souci de Bluetooth, ils m'ont répondu en 2h et résolu le problème. Produit + service 5 étoiles." },
  { name: "Nicolas P.", stars: 5, text: "Acheté pour offrir à mon père. Il a 65 ans et a réussi à l'installer tout seul. Si c'est pas du plug & play ça... Merci OxaPlay !" },
  { name: "Amina K.", stars: 5, text: "Spotify, Apple Maps, les appels... tout marche sans fil. Plus besoin du support téléphone sur le pare-brise. Je recommande à 100%." },
];

function MiniStars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`inline-flex items-center justify-center w-4 h-4 rounded-[2px] ${i < count ? "bg-green-500" : "bg-gray-700"}`}>
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white">
            <path d="M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function AvisPage() {
  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white">
      <Header />

      <section className="w-full py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-6">+2 500 avis</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Ce que nos conducteurs pensent d&apos;OxaPlay.
          </h1>
          <p className="text-zinc-500 text-base max-w-xl mx-auto mb-8">Des milliers de clients satisfaits sur la route.</p>
          <div className="inline-flex flex-col items-center gap-3">
            <RatingBadge />
            <p className="text-sm text-zinc-500">Basé sur <strong className="text-white">2 547</strong> avis vérifiés</p>
          </div>
        </div>
      </section>

      <section className="w-full pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">Témoignages vidéo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIAL_VIDEOS.map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500"
              >
                <video src={src} controls playsInline preload="metadata" className="w-full aspect-[9/16] object-cover bg-zinc-900" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">Avis clients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEXT_REVIEWS.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-white">{r.name}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-medium uppercase tracking-wide">
                      Acheteur vérifié
                    </span>
                  </div>
                  <MiniStars count={r.stars} />
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/#products"
              className="inline-flex items-center px-8 py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] active:scale-95"
            >
              Rejoindre +2 500 clients satisfaits
            </Link>
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
