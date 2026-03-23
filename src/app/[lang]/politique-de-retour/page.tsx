import Link from "next/link";
import Header from "../../components/Header";

export default function PolitiqueDeRetour() {
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">Politique de Retour & Remboursement</h1>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Droit de rétractation</h2>
            <p>Conformément à la législation française, vous disposez d&apos;un délai de <strong className="text-gray-300">14 jours</strong> à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Conditions de retour</h2>
            <p>Pour être accepté, le retour doit respecter les conditions suivantes :</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Le produit doit être dans son emballage d&apos;origine, complet et non endommagé</li>
              <li>Le produit ne doit pas avoir été installé ou utilisé de manière prolongée</li>
              <li>Tous les accessoires et documentations fournis doivent être inclus</li>
              <li>Le produit doit être retourné dans un colis adapté pour éviter tout dommage durant le transport</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Procédure de retour</h2>
            <p>Pour initier un retour :</p>
            <ol className="mt-2 list-decimal list-inside space-y-1">
              <li>Contactez-nous à <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a> en indiquant votre numéro de commande</li>
              <li>Notre équipe vous enverra un formulaire de retour et les instructions d&apos;expédition</li>
              <li>Expédiez le produit à l&apos;adresse indiquée dans les instructions</li>
              <li>Une fois le colis reçu et inspecté, nous procéderons au remboursement</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Frais de retour</h2>
            <p>Les frais de retour sont à la charge du client, sauf en cas de produit défectueux ou d&apos;erreur de notre part. Dans ce cas, OxaPlay prend en charge l&apos;intégralité des frais de retour.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Remboursement</h2>
            <p>Le remboursement sera effectué dans un délai maximum de <strong className="text-gray-300">14 jours</strong> suivant la réception du produit retourné. Le remboursement sera effectué via le même moyen de paiement utilisé lors de la commande initiale.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Produits défectueux</h2>
            <p>Si vous recevez un produit défectueux ou endommagé, contactez-nous immédiatement à <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a> avec des photos du produit. Nous vous proposerons un remplacement ou un remboursement intégral, frais de retour inclus.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Garantie commerciale</h2>
            <p>Tous les produits OxaPlay bénéficient d&apos;une <strong className="text-gray-300">garantie de 2 ans</strong> couvrant les défauts de fabrication. Cette garantie ne couvre pas les dommages résultant d&apos;une mauvaise utilisation, d&apos;une installation incorrecte ou de l&apos;usure normale.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Contact</h2>
            <p>Pour toute question relative aux retours et remboursements :</p>
            <ul className="mt-2 space-y-1">
              <li><strong className="text-gray-300">Email :</strong> <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a></li>
              <li><strong className="text-gray-300">Adresse :</strong> OxaPlay SAS, 42 Rue du Faubourg Saint-Honoré, 75008 Paris, France</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
