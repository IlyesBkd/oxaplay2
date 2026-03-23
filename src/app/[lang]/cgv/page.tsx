import Link from "next/link";
import Header from "../../components/Header";

export default function CGV() {
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">Conditions Générales de Vente</h1>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Objet</h2>
            <p>Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits effectuées sur le site oxaplay.com, édité par OxaPlay SAS, 42 Rue du Faubourg Saint-Honoré, 75008 Paris, France.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Produits</h2>
            <p>Les produits proposés à la vente sont des écrans CarPlay et Android Auto pour voitures et motos. Les photographies et descriptions des produits sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite avec le produit reçu.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Prix</h2>
            <p>Les prix sont indiqués en euros toutes taxes comprises (TTC). OxaPlay SAS se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix figurant au moment de la validation de la commande sera le seul applicable.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Commande</h2>
            <p>La commande est confirmée par l&apos;envoi d&apos;un email de confirmation à l&apos;adresse fournie par le client. OxaPlay SAS se réserve le droit d&apos;annuler toute commande en cas de problème de paiement, d&apos;adresse erronée ou de tout autre problème lié au compte du client.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Paiement</h2>
            <p>Le paiement s&apos;effectue en ligne par carte bancaire (Visa, Mastercard, American Express) ou via PayPal. Le paiement est sécurisé et les données bancaires sont chiffrées. Le montant est débité au moment de la confirmation de la commande.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Livraison</h2>
            <p>Les produits sont livrés à l&apos;adresse indiquée lors de la commande. Les délais de livraison sont estimés à 2 à 5 jours ouvrés pour la France métropolitaine et 5 à 15 jours ouvrés pour l&apos;international. OxaPlay SAS ne saurait être tenu responsable des retards de livraison imputables au transporteur.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Droit de rétractation</h2>
            <p>Conformément à l&apos;article L221-18 du Code de la consommation, vous disposez d&apos;un délai de 14 jours à compter de la réception du produit pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.</p>
            <p className="mt-2">Pour exercer ce droit, contactez-nous à <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a>. Le produit devra être retourné dans son état d&apos;origine et complet (emballage, accessoires). Les frais de retour sont à la charge du client.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Garantie</h2>
            <p>Tous nos produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants du Code de la consommation) et de la garantie des vices cachés (articles 1641 et suivants du Code civil). En complément, OxaPlay offre une garantie commerciale de 2 ans couvrant les défauts de fabrication.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Responsabilité</h2>
            <p>OxaPlay SAS ne saurait être tenue responsable des dommages résultant d&apos;une mauvaise utilisation du produit. L&apos;installation doit être réalisée conformément aux instructions fournies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Service client</h2>
            <p>Pour toute question, contactez notre service client :</p>
            <ul className="mt-2 space-y-1">
              <li><strong className="text-gray-300">Email :</strong> <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a></li>
              <li><strong className="text-gray-300">Adresse :</strong> 42 Rue du Faubourg Saint-Honoré, 75008 Paris</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Litiges</h2>
            <p>Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux de Paris seront compétents. Conformément à l&apos;article L612-1 du Code de la consommation, vous pouvez recourir gratuitement au service de médiation de la consommation.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
