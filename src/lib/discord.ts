const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

interface DiscordEmbed {
  title: string;
  description?: string;
  color: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  timestamp?: string;
  footer?: { text: string };
}

export async function sendDiscordNotification(embed: DiscordEmbed) {
  if (!WEBHOOK_URL) {
    console.log("[DISCORD] No webhook URL configured, skipping.");
    return;
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            ...embed,
            timestamp: embed.timestamp || new Date().toISOString(),
            footer: embed.footer || { text: "OxaPlay Notifications" },
          },
        ],
      }),
    });

    if (res.ok) {
      console.log(`[DISCORD] Notification envoyée: ${embed.title}`);
    } else {
      console.error(`[DISCORD] Erreur ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("[DISCORD] Échec silencieux:", err);
  }
}

export async function notifyNewChat(email: string, message: string) {
  await sendDiscordNotification({
    title: "💬 Nouveau message — OxaPlay Support",
    color: 0xa855f7,
    fields: [
      { name: "📧 Email", value: email, inline: true },
      { name: "📅 Date", value: new Date().toLocaleString("fr-FR"), inline: true },
      { name: "💬 Message", value: message },
    ],
  });
}

export async function notifyNewOrder({
  orderId,
  email,
  productName,
  amount,
  currency,
}: {
  orderId: string;
  email: string;
  productName: string;
  amount: number;
  currency: string;
}) {
  const formattedAmount =
    currency === "usd"
      ? `$${(amount / 100).toFixed(2)}`
      : `${(amount / 100).toFixed(2)} €`;

  await sendDiscordNotification({
    title: "🎉 NOUVELLE COMMANDE PAYÉE !",
    color: 0x22c55e,
    fields: [
      { name: "🔢 Commande", value: orderId, inline: false },
      { name: "📧 Client", value: email, inline: true },
      { name: "📦 Produit", value: productName, inline: true },
      { name: "💰 Montant", value: formattedAmount, inline: true },
    ],
  });
}
