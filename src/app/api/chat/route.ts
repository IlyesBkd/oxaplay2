import { NextResponse } from "next/server";
import { notifyNewChat } from "@/lib/discord";

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message vide" }, { status: 400 });
    }

    console.log(`[CHAT] Nouveau message de ${email}: ${message}`);

    // Send Discord notification (fail silently)
    await notifyNewChat(email, message);

    return NextResponse.json({
      success: true,
      reply: "Merci pour votre message ! Notre équipe vous répondra par email dans les plus brefs délais.",
    });
  } catch (err) {
    console.error("[CHAT] Erreur:", err);
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}
