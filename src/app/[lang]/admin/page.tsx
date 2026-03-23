"use client";

import { useState, useEffect, useCallback } from "react";
import type { Prices } from "@/lib/types";
import { DEFAULT_PRICES } from "@/lib/types";
import type { DbOrder } from "@/lib/types";

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED";

const STATUS_LABELS: Record<OrderStatus, { label: string; color: string }> = {
  PENDING: { label: "En attente", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  PAID: { label: "Payée", color: "bg-green-100 text-green-800 border-green-300" },
  SHIPPED: { label: "Expédiée", color: "bg-blue-100 text-blue-800 border-blue-300" },
  DELIVERED: { label: "Livrée", color: "bg-purple-100 text-purple-800 border-purple-300" },
};

const PRODUCT_LABELS: Record<string, string> = {
  "carplay-voiture": "CarPlay Voiture",
  "carplay-moto": "CarPlay Moto",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"orders" | "prices">("orders");

  // Orders
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<DbOrder | null>(null);

  // Prices
  const [prices, setPrices] = useState<Prices>(DEFAULT_PRICES);
  const [savingPrices, setSavingPrices] = useState(false);
  const [pricesSaved, setPricesSaved] = useState(false);

  const headers = useCallback(
    () => ({ "Content-Type": "application/json", "x-admin-password": password }),
    [password]
  );

  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const r = await fetch("/api/orders", { headers: { "x-admin-password": password } });
      if (r.ok) setOrders(await r.json());
    } catch {}
    setLoadingOrders(false);
  }, [password]);

  const fetchPrices = useCallback(async () => {
    try {
      const r = await fetch("/api/prices");
      if (r.ok) setPrices(await r.json());
    } catch {}
  }, []);

  // Login
  const handleLogin = async () => {
    try {
      const r = await fetch("/api/orders", { headers: { "x-admin-password": password } });
      if (r.ok) {
        setAuthed(true);
        setOrders(await r.json());
        fetchPrices();
      } else {
        alert(r.status === 401 ? "Mot de passe incorrect." : "Erreur serveur.");
      }
    } catch (e) {
      alert(`Erreur réseau : ${e instanceof Error ? e.message : "Connexion impossible"}`);
    }
  };

  useEffect(() => {
    if (authed) {
      fetchOrders();
      fetchPrices();
    }
  }, [authed, fetchOrders, fetchPrices]);

  // Update order status
  const updateStatus = async (id: string, status: OrderStatus) => {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ id, status }),
    });
    fetchOrders();
    if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status });
  };

  // Save prices
  const savePrices = async () => {
    setSavingPrices(true);
    await fetch("/api/prices", {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(prices),
    });
    setSavingPrices(false);
    setPricesSaved(true);
    setTimeout(() => setPricesSaved(false), 2000);
  };

  const formatPrice = (amount: number, currency: string) => {
    const val = (amount / 100).toFixed(2);
    return currency === "usd" ? `$${val}` : `${val} €`;
  };

  // ─── Login screen ────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-zinc-900 border border-white/[0.06] rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Admin OxaPlay</h1>
            <p className="text-sm text-gray-500 mt-1">Entrez le mot de passe administrateur</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-white rounded-xl mb-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-gray-600"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm py-3 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer"
          >
            Connexion
          </button>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-white/[0.06] flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-white/[0.06]">
          <h1 className="text-lg font-bold text-white">OxaPlay</h1>
          <p className="text-xs text-gray-500 mt-1">Back-office Admin</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          <button
            onClick={() => setTab("orders")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${tab === "orders" ? "bg-purple-600/20 text-purple-400 border border-purple-500/30" : "text-gray-300 hover:bg-white/5"}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Commandes
            {orders.filter((o) => o.status === "PENDING").length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {orders.filter((o) => o.status === "PENDING").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("prices")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${tab === "prices" ? "bg-purple-600/20 text-purple-400 border border-purple-500/30" : "text-gray-300 hover:bg-white/5"}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Gestion des Prix
          </button>
        </nav>
        <div className="p-4 border-t border-white/[0.06]">
          <button onClick={() => { setAuthed(false); setPassword(""); }} className="text-xs text-gray-500 hover:text-red-400 transition-colors cursor-pointer">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {/* ═══ COMMANDES TAB ═══ */}
        {tab === "orders" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Commandes</h2>
                <p className="text-sm text-gray-500">{orders.length} commande{orders.length !== 1 ? "s" : ""} au total</p>
              </div>
              <button onClick={fetchOrders} disabled={loadingOrders} className="px-4 py-2 bg-zinc-900 border border-white/[0.06] rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 transition-colors cursor-pointer">
                {loadingOrders ? "..." : "Actualiser"}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {(["PENDING", "PAID", "SHIPPED", "DELIVERED"] as const).map((s) => (
                <div key={s} className="bg-zinc-900 border border-white/[0.06] rounded-xl p-4">
                  <p className="text-2xl font-bold text-white">{orders.filter((o) => o.status === s).length}</p>
                  <p className="text-xs text-gray-500 font-semibold mt-1">{STATUS_LABELS[s].label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-6">
              {/* Orders table */}
              <div className="flex-1 bg-zinc-900 border border-white/[0.06] rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-800/50 border-b border-white/[0.06]">
                      <th className="text-left px-4 py-3 font-semibold text-gray-500">ID</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500">Date</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500">Client</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500">Produit</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-500">Total</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-500">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-gray-500">Aucune commande pour le moment.</td>
                      </tr>
                    ) : (
                      orders.map((o) => (
                        <tr
                          key={o.id}
                          onClick={() => setSelectedOrder(o)}
                          className={`border-b border-white/[0.03] cursor-pointer hover:bg-white/[0.02] transition-colors ${selectedOrder?.id === o.id ? "bg-purple-600/5" : ""}`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-gray-400">{o.id.slice(0, 8)}</td>
                          <td className="px-4 py-3 text-gray-500">{new Date(o.created_at).toLocaleDateString("fr-FR")}</td>
                          <td className="px-4 py-3 font-medium text-gray-200">{o.customer_email}</td>
                          <td className="px-4 py-3 text-gray-400">{PRODUCT_LABELS[o.product_slug] || o.product_slug}</td>
                          <td className="px-4 py-3 text-right font-bold text-white">{formatPrice(o.total_price, o.currency)}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-lg border ${STATUS_LABELS[o.status as OrderStatus]?.color || "bg-gray-100 text-gray-600 border-gray-300"}`}>
                              {STATUS_LABELS[o.status as OrderStatus]?.label || o.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Order detail panel */}
              {selectedOrder && (
                <div className="w-96 bg-zinc-900 border border-white/[0.06] rounded-xl p-6 self-start sticky top-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">Détail commande</h3>
                    <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-white cursor-pointer">✕</button>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-semibold mb-1">ID</p>
                      <p className="font-mono text-xs text-gray-300">{selectedOrder.id}</p>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Client</p>
                      <p className="font-medium text-gray-200">{selectedOrder.customer_email}</p>
                      {selectedOrder.customer_name && (
                        <p className="text-gray-400">{selectedOrder.customer_name}</p>
                      )}
                      {selectedOrder.customer_phone && <p className="text-gray-400">{selectedOrder.customer_phone}</p>}
                    </div>

                    {selectedOrder.customer_address && (
                      <div className="bg-purple-950/20 border border-purple-500/10 rounded-lg p-3">
                        <p className="text-xs text-purple-400 font-semibold mb-1">Adresse de livraison</p>
                        <p className="text-gray-300">{selectedOrder.customer_address}</p>
                      </div>
                    )}

                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-semibold mb-2">Produit</p>
                      <p className="font-semibold text-gray-200">{PRODUCT_LABELS[selectedOrder.product_slug] || selectedOrder.product_slug}</p>
                      <p className="text-purple-400 font-bold mt-1">{formatPrice(selectedOrder.total_price, selectedOrder.currency)}</p>
                    </div>

                    {/* Status update */}
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-2">Changer le statut</p>
                      <div className="grid grid-cols-2 gap-2">
                        {(["PENDING", "PAID", "SHIPPED", "DELIVERED"] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(selectedOrder.id, s)}
                            className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                              selectedOrder.status === s
                                ? STATUS_LABELS[s].color + " ring-2 ring-offset-1 ring-offset-zinc-900 ring-purple-500"
                                : "bg-zinc-800 border-white/[0.06] text-gray-400 hover:bg-zinc-700"
                            }`}
                          >
                            {STATUS_LABELS[s].label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedOrder.payment_intent_id && (
                      <p className="text-xs text-gray-600 font-mono">Stripe: {selectedOrder.payment_intent_id}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ═══ PRICES TAB ═══ */}
        {tab === "prices" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Gestion des Prix</h2>
              <p className="text-sm text-gray-500">Modifiez les prix de chaque produit (en centimes).</p>
            </div>

            <div className="max-w-2xl bg-zinc-900 border border-white/[0.06] rounded-xl p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                {[
                  { key: "carplayVoitureEur" as const, label: "CarPlay Voiture (EUR)", icon: "🚗" },
                  { key: "carplayVoitureUsd" as const, label: "CarPlay Voiture (USD)", icon: "🚗" },
                  { key: "carplayMotoEur" as const, label: "CarPlay Moto (EUR)", icon: "🏍️" },
                  { key: "carplayMotoUsd" as const, label: "CarPlay Moto (USD)", icon: "🏍️" },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                      {item.icon} {item.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={prices[item.key]}
                        onChange={(e) => setPrices({ ...prices, [item.key]: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-16 text-sm font-semibold bg-white/[0.04] border border-white/10 text-white rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-semibold">
                        = {(prices[item.key] / 100).toFixed(2)} {item.key.includes("Usd") ? "$" : "€"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-6 mb-6">
                <h3 className="text-sm font-bold text-white mb-4">💰 Pourcentages de Réduction</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { key: "carplayVoitureDiscount" as const, label: "Réduction Voiture (%)", icon: "🚗" },
                    { key: "carplayMotoDiscount" as const, label: "Réduction Moto (%)", icon: "🏍️" },
                  ].map((item) => (
                    <div key={item.key}>
                      <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                        {item.icon} {item.label}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={prices[item.key]}
                          onChange={(e) => setPrices({ ...prices, [item.key]: Number(e.target.value) })}
                          className="w-full px-4 py-2.5 pr-10 text-sm font-semibold bg-white/[0.04] border border-white/10 text-white rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-semibold">
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/[0.06]">
                <button
                  onClick={savePrices}
                  disabled={savingPrices}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer disabled:opacity-50"
                >
                  {savingPrices ? "Enregistrement..." : "Enregistrer les prix"}
                </button>
                {pricesSaved && (
                  <span className="text-sm text-green-400 font-semibold">Prix mis à jour !</span>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
