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
  console.log("[RESEND] Envoi email de confirmation...");
  console.log("[RESEND] Destinataire:", to, "| Commande:", orderId);

  const orderRef = `#${orderId.slice(0, 8).toUpperCase()}`;
  const formattedAmount =
    currency === "usd"
      ? `$${(amount / 100).toFixed(2)}`
      : `${(amount / 100).toFixed(2).replace(".", ",")} \u20ac`;

  // ── Plain-text fallback ──
  const text = `Confirmation de commande ${orderRef}

Bonjour,

Merci pour votre confiance. Votre commande est confirmee et en cours de preparation.

Recapitulatif :
- Commande : ${orderRef}
- Produit : ${productName}
- Total paye : ${formattedAmount}

Livraison estimee : 48 a 72h ouvrees, par Colissimo.

Une question ? Repondez directement a cet email ou contactez-nous a support@oxaplay.com.

OxaPlay SAS
42 Rue du Faubourg Saint-Honore, 75008 Paris, France
https://oxaplay.com | support@oxaplay.com`;

  // ── HTML version ──
  const html = `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Confirmation de commande ${orderRef}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Preheader text (hidden, shows in inbox preview) -->
  <div style="display:none;font-size:1px;color:#f4f4f5;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    Votre commande ${orderRef} est confirmee. Merci pour votre confiance !
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Inner card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;">

          <!-- Logo header -->
          <tr>
            <td style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid #e4e4e7;">
              <a href="https://oxaplay.com" style="text-decoration:none;">
                <span style="font-size:22px;font-weight:700;color:#09090b;letter-spacing:-0.5px;">OxaPlay</span>
              </a>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:32px;">

              <!-- Greeting -->
              <h1 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#09090b;text-align:center;">
                Commande confirm\u00e9e
              </h1>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#52525b;text-align:center;">
                Merci pour votre confiance. Votre commande est en cours de pr\u00e9paration.
              </p>

              <!-- Order summary table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa;border:1px solid #e4e4e7;border-radius:8px;overflow:hidden;margin-bottom:24px;">
                <tr>
                  <td style="padding:14px 16px;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:1.2px;border-bottom:1px solid #e4e4e7;">
                    R\u00e9capitulatif
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:12px 16px;font-size:14px;color:#71717a;border-bottom:1px solid #f4f4f5;">N\u00b0 Commande</td>
                        <td style="padding:12px 16px;font-size:14px;color:#09090b;font-weight:600;text-align:right;border-bottom:1px solid #f4f4f5;">${orderRef}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 16px;font-size:14px;color:#71717a;border-bottom:1px solid #f4f4f5;">Produit</td>
                        <td style="padding:12px 16px;font-size:14px;color:#09090b;font-weight:600;text-align:right;border-bottom:1px solid #f4f4f5;">${productName}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 16px;font-size:14px;color:#71717a;">Total pay\u00e9</td>
                        <td style="padding:12px 16px;font-size:16px;color:#09090b;font-weight:700;text-align:right;">${formattedAmount}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Shipping info -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:14px 16px;text-align:center;font-size:14px;color:#166534;">
                    Livraison estim\u00e9e : <strong>48\u201372h ouvr\u00e9es</strong> par Colissimo
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://oxaplay.com" style="display:inline-block;padding:14px 32px;background-color:#09090b;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:9999px;">
                      Suivre ma commande
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Help section -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #e4e4e7;text-align:center;">
              <p style="margin:0;font-size:13px;color:#71717a;line-height:1.6;">
                Une question ? R\u00e9pondez directement \u00e0 cet email ou contactez-nous \u00e0
                <a href="mailto:support@oxaplay.com" style="color:#09090b;text-decoration:underline;">support@oxaplay.com</a>
              </p>
            </td>
          </tr>

          <!-- Legal footer -->
          <tr>
            <td style="padding:20px 32px 28px;background-color:#fafafa;border-top:1px solid #e4e4e7;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#a1a1aa;">
                OxaPlay SAS &mdash; 42 Rue du Faubourg Saint-Honor\u00e9, 75008 Paris, France
              </p>
              <p style="margin:0 0 6px;font-size:12px;color:#a1a1aa;">
                <a href="https://oxaplay.com/mentions-legales" style="color:#a1a1aa;text-decoration:underline;">Mentions l\u00e9gales</a>
                &nbsp;&middot;&nbsp;
                <a href="https://oxaplay.com/cgv" style="color:#a1a1aa;text-decoration:underline;">CGV</a>
                &nbsp;&middot;&nbsp;
                <a href="https://oxaplay.com/politique-de-confidentialite" style="color:#a1a1aa;text-decoration:underline;">Confidentialit\u00e9</a>
              </p>
              <p style="margin:0;font-size:11px;color:#d4d4d8;">
                &copy; 2025 OxaPlay. Tous droits r\u00e9serv\u00e9s.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Inner card -->

      </td>
    </tr>
  </table>
  <!-- /Outer wrapper -->

</body>
</html>`;

  try {
    const { data, error } = await resend.emails.send({
      from: "OxaPlay <noreply@oxaplay.com>",
      replyTo: "support@oxaplay.com",
      to,
      subject: `Confirmation de commande ${orderRef} - OxaPlay`,
      html,
      text,
    });

    if (error) {
      console.error("[RESEND] Erreur:", error.message || error);
    } else {
      console.log(`[RESEND] Email envoyé à ${to} (ID: ${data?.id})`);
    }
  } catch (err) {
    console.error("[RESEND] Exception:", err instanceof Error ? err.message : String(err));
  }
}
