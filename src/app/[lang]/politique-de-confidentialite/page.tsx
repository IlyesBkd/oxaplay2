import Link from "next/link";
import Header from "../../components/Header";

export default function PolitiqueConfidentialite() {
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">Politique de Confidentialité</h1>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Responsable du traitement</h2>
            <p>OxaPlay SAS, dont le siège social est situé au 42 Rue du Faubourg Saint-Honoré, 75008 Paris, France, est responsable du traitement de vos données personnelles.</p>
            <p className="mt-2">Contact : <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Données collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Adresse de livraison et de facturation</li>
              <li>Numéro de téléphone</li>
              <li>Données de navigation (cookies, adresse IP)</li>
              <li>Historique de commandes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Finalités du traitement</h2>
            <p>Vos données sont collectées pour :</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>La gestion et le suivi de vos commandes</li>
              <li>La livraison de vos produits</li>
              <li>La gestion de la relation client et du service après-vente</li>
              <li>L&apos;envoi de communications commerciales (avec votre consentement)</li>
              <li>L&apos;amélioration de nos services et de notre site</li>
              <li>Le respect de nos obligations légales et réglementaires</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Base légale</h2>
            <p>Le traitement de vos données repose sur : l&apos;exécution du contrat de vente, votre consentement, notre intérêt légitime, et le respect de nos obligations légales.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Durée de conservation</h2>
            <p>Vos données personnelles sont conservées pendant la durée nécessaire à la finalité du traitement, et au maximum 3 ans après votre dernière interaction avec notre service. Les données relatives aux transactions sont conservées 10 ans conformément aux obligations comptables.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Partage des données</h2>
            <p>Vos données peuvent être partagées avec :</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Nos prestataires de livraison</li>
              <li>Nos prestataires de paiement sécurisé</li>
              <li>Nos outils d&apos;analyse (Google Analytics)</li>
            </ul>
            <p className="mt-2">Nous ne vendons jamais vos données à des tiers.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition</li>
              <li>Droit à la limitation du traitement</li>
            </ul>
            <p className="mt-2">Pour exercer ces droits : <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Cookies</h2>
            <p>Notre site utilise des cookies essentiels au fonctionnement du site et des cookies analytiques. Vous pouvez gérer vos préférences via les paramètres de votre navigateur.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Réclamation</h2>
            <p>Si vous estimez que le traitement de vos données ne respecte pas la réglementation, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés).</p>
          </section>
        </div>
      </div>
    </main>
  );
}
