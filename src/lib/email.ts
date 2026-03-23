import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  productName,
  amount,
  currency,
}: {
  to: string;
  orderId: string;
  productName: string;
  amount: number;
  currency: string;
}) {
  console.log("[RESEND] 📧 Tentative d'envoi d'email...");
  console.log("[RESEND] Destinataire:", to);
  console.log("[RESEND] Commande ID:", orderId);
  console.log("[RESEND] Produit:", productName);
  console.log("[RESEND] Montant:", amount, currency);
  console.log("[RESEND] API Key présente:", !!process.env.RESEND_API_KEY);
  console.log("[RESEND] API Key (premiers chars):", process.env.RESEND_API_KEY?.slice(0, 10) + "...");

  const formattedAmount =
    currency === "usd"
      ? `$${(amount / 100).toFixed(2)}`
      : `${(amount / 100).toFixed(2)} €`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#000;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#a855f7;font-size:24px;margin:0;">OxaPlay</h1>
    </div>

    <!-- Success badge -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);line-height:64px;font-size:28px;">
        ✓
      </div>
    </div>

    <h2 style="color:#fff;text-align:center;font-size:22px;margin:0 0 8px;">Commande confirmée !</h2>
    <p style="color:#9ca3af;text-align:center;font-size:14px;margin:0 0 32px;line-height:1.6;">
      Merci pour votre achat. Votre paiement a été validé avec succès.
    </p>

    <!-- Order details card -->
    <div style="background:#18181b;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:24px;margin-bottom:24px;">
      <p style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 16px;font-weight:700;">Récapitulatif</p>
      
      <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
        <span style="color:#9ca3af;font-size:14px;">Commande</span>
        <span style="color:#fff;font-size:14px;font-weight:600;">#${orderId.slice(0, 8).toUpperCase()}</span>
      </div>
      
      <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
        <span style="color:#9ca3af;font-size:14px;">Produit</span>
        <span style="color:#fff;font-size:14px;font-weight:600;">${productName}</span>
      </div>
      
      <div style="display:flex;justify-content:space-between;padding:12px 0;">
        <span style="color:#9ca3af;font-size:14px;">Total payé</span>
        <span style="color:#a855f7;font-size:18px;font-weight:700;">${formattedAmount}</span>
      </div>
    </div>

    <!-- Shipping info -->
    <div style="background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.15);border-radius:12px;padding:16px;text-align:center;margin-bottom:32px;">
      <p style="color:#c084fc;font-size:13px;margin:0;">🚚 Livraison estimée : <strong>48-72h ouvrées</strong></p>
    </div>

    <!-- Footer -->
    <p style="color:#4b5563;text-align:center;font-size:12px;margin:32px 0 0;line-height:1.6;">
      Une question ? Contactez-nous à <a href="mailto:support@oxaplay.com" style="color:#a855f7;text-decoration:none;">support@oxaplay.com</a>
    </p>
    <p style="color:#374151;text-align:center;font-size:11px;margin:8px 0 0;">
      © 2025 OxaPlay. Tous droits réservés.
    </p>
  </div>
</body>
</html>`;

  try {
    console.log("[RESEND] 🚀 Appel API Resend en cours...");
    
    const { data, error } = await resend.emails.send({
      from: "OxaPlay <noreply@oxaplay.com>",
      to,
      subject: "🎉 Commande confirmée - Bienvenue chez OxaPlay",
      html,
    });

    console.log("[RESEND] 📬 Réponse API reçue");
    console.log("[RESEND] Data:", JSON.stringify(data, null, 2));
    console.log("[RESEND] Error:", JSON.stringify(error, null, 2));

    if (error) {
      console.error("[RESEND] ❌ Erreur détectée:", error);
      console.error("[RESEND] Type d'erreur:", typeof error);
      console.error("[RESEND] Message d'erreur:", error.message || error);
    } else {
      console.log(`[RESEND] ✅ Email envoyé avec succès à ${to}`);
      console.log(`[RESEND] ID de l'email: ${data?.id}`);
    }
  } catch (err) {
    console.error("[RESEND] 💥 Exception capturée:", err);
    console.error("[RESEND] Type d'exception:", typeof err);
    console.error("[RESEND] Stack trace:", err instanceof Error ? err.stack : "N/A");
    console.error("[RESEND] Message:", err instanceof Error ? err.message : String(err));
  }
}
