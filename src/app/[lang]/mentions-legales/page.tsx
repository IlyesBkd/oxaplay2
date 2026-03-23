import Link from "next/link";
import Header from "../../components/Header";

export default function MentionsLegales() {
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">Mentions Légales</h1>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Éditeur du site</h2>
            <p>Le site oxaplay.com est édité par :</p>
            <ul className="mt-2 space-y-1">
              <li><strong className="text-gray-300">Raison sociale :</strong> OxaPlay SAS</li>
              <li><strong className="text-gray-300">Siège social :</strong> 42 Rue du Faubourg Saint-Honoré, 75008 Paris, France</li>
              <li><strong className="text-gray-300">Email :</strong> support@oxaplay.com</li>
              <li><strong className="text-gray-300">Capital social :</strong> 10 000 €</li>
              <li><strong className="text-gray-300">RCS :</strong> Paris B 912 345 678</li>
              <li><strong className="text-gray-300">N° TVA intracommunautaire :</strong> FR 12 912345678</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Directeur de la publication</h2>
            <p>Le directeur de la publication est le représentant légal de la société OxaPlay SAS.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Hébergeur</h2>
            <p>Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Propriété intellectuelle</h2>
            <p>L&apos;ensemble du contenu du site (textes, images, vidéos, logos, graphismes) est protégé par le droit d&apos;auteur et le droit des marques. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans l&apos;autorisation écrite préalable de OxaPlay SAS.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Données personnelles</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données personnelles. Pour exercer ces droits, contactez-nous à : <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a>.</p>
            <p className="mt-2">Pour plus d&apos;informations, consultez notre <Link href="/politique-de-confidentialite" className="text-purple-400 hover:underline">Politique de Confidentialité</Link>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Cookies</h2>
            <p>Le site utilise des cookies pour améliorer l&apos;expérience utilisateur et réaliser des statistiques de visites. Vous pouvez configurer votre navigateur pour refuser les cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Litiges</h2>
            <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux de Paris seront seuls compétents.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
