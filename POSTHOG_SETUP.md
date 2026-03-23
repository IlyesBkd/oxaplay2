# PostHog Analytics - Guide de Configuration

## 📋 Vue d'ensemble

Ce document décrit l'implémentation complète de PostHog Analytics pour le tracking du tunnel de conversion e-commerce.

## 🔧 Configuration Initiale

### 1. Variables d'environnement

Ajoutez ces variables à votre fichier `.env.local` :

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
```

> **Note**: Utilisez `https://us.posthog.com` si votre projet PostHog est hébergé aux États-Unis.

### 2. Composants créés

- **`src/app/components/PostHogProvider.tsx`** : Provider principal qui initialise PostHog
- **`src/app/components/PostHogPageView.tsx`** : Composant pour le tracking automatique des pages
- **`src/app/components/OrderCompletedTracker.tsx`** : Composant client pour tracker les commandes complétées

### 3. Intégration dans le layout

Le `PostHogProvider` enveloppe toute l'application dans `src/app/layout.tsx` et le `PostHogPageView` track automatiquement chaque changement de route.

## 📊 Événements Trackés

### 1. **Product_Viewed**
- **Déclenché** : Lors du chargement d'une page produit
- **Propriétés** :
  - `product_name` : "CarPlay Voiture" ou "CarPlay Moto"
  - `price` : Prix en euros (nombre décimal)
- **Fichiers** : 
  - `src/app/[lang]/carplay-voiture/page.tsx`
  - `src/app/[lang]/carplay-moto/page.tsx`

### 2. **Checkout_Started**
- **Déclenché** : Quand l'utilisateur clique sur "Commander maintenant"
- **Propriétés** :
  - `product_name` : Nom du produit
  - `price` : Prix en euros
  - `currency` : "EUR"
- **Fichiers** : Pages produits (fonction `handleCheckoutClick`)

### 3. **Checkout_Step_Completed**
- **Déclenché** : Après validation du formulaire de livraison (étape 1)
- **Propriétés** :
  - `step` : 1
  - `product_name` : Nom du produit
  - `email` : Email du client
- **Fichier** : `src/app/components/CheckoutModal.tsx`
- **Note** : L'utilisateur est également identifié avec `posthog.identify(email)` à ce moment

### 4. **Order_Completed** ⭐ (CRUCIAL pour ROI)
- **Déclenché** : Sur la page de succès après paiement validé
- **Propriétés** :
  - `order_id` : ID de la commande
  - `revenue` : Montant total (en unités monétaires, pas en centimes)
  - `currency` : "EUR" ou "USD"
  - `product_name` : Nom du produit
- **Fichier** : `src/app/[lang]/success/page.tsx` via `OrderCompletedTracker`

## 🔍 Identification des Utilisateurs

L'identification se fait automatiquement lors de la soumission du formulaire de checkout (étape 1) :

```typescript
posthog.identify(email);
```

Cela permet de lier toutes les sessions anonymes précédentes à l'email du client.

## 🛡️ Bonnes Pratiques Implémentées

### 1. Gestion des erreurs
Tous les appels PostHog sont encapsulés dans des blocs `try/catch` pour éviter que les erreurs de tracking ne cassent l'application.

### 2. Vérification de l'initialisation
Chaque appel vérifie que `posthog` est bien initialisé avant d'envoyer des événements.

### 3. Performance
- `capture_pageview: false` dans l'initialisation (géré manuellement pour SSR)
- `autocapture: false` pour un tracking explicite uniquement
- Tracking côté client uniquement (pas de surcharge serveur)

### 4. Logs de développement
En mode développement, PostHog affiche des logs de confirmation dans la console.

## 📈 Utilisation dans PostHog

### Créer un Funnel de Conversion

1. Allez dans PostHog → **Insights** → **New Insight** → **Funnel**
2. Configurez les étapes :
   - Étape 1 : `Product_Viewed`
   - Étape 2 : `Checkout_Started`
   - Étape 3 : `Checkout_Step_Completed`
   - Étape 4 : `Order_Completed`

### Calculer le ROI

Utilisez la propriété `revenue` de l'événement `Order_Completed` pour :
- Calculer le revenu total
- Analyser le panier moyen
- Mesurer le ROI des campagnes marketing

### Segmentation

Vous pouvez segmenter par :
- `product_name` : Comparer Voiture vs Moto
- `currency` : Analyser par marché (EUR vs USD)
- Email identifié : Analyser le parcours complet d'un client

## 🚀 Prochaines Étapes

Pour aller plus loin, vous pourriez ajouter :

1. **Événements additionnels** :
   - `Video_Viewed` : Quand un utilisateur regarde une vidéo témoignage
   - `FAQ_Opened` : Quand un utilisateur ouvre une question FAQ
   - `Add_To_Cart` : Si vous ajoutez un panier

2. **Propriétés supplémentaires** :
   - Source de trafic (UTM parameters)
   - Appareil (mobile/desktop)
   - Pays de livraison

3. **A/B Testing** :
   - Utiliser PostHog Feature Flags pour tester différentes versions

## ⚠️ Important

- Ne commitez JAMAIS vos clés PostHog dans Git
- Utilisez toujours les variables d'environnement
- Testez en mode développement avant de déployer en production
- Vérifiez que les événements arrivent bien dans PostHog après le déploiement

## 🐛 Debugging

Si les événements n'apparaissent pas dans PostHog :

1. Vérifiez que les variables d'environnement sont bien configurées
2. Ouvrez la console du navigateur et cherchez les logs `[PostHog]`
3. Vérifiez l'onglet Network pour voir si les requêtes vers PostHog sont envoyées
4. Assurez-vous que votre bloqueur de publicités n'interfère pas

## 📚 Ressources

- [Documentation PostHog](https://posthog.com/docs)
- [PostHog React SDK](https://posthog.com/docs/libraries/react)
- [E-commerce Analytics Guide](https://posthog.com/docs/product-analytics/ecommerce)
