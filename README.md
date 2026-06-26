# Brands Family - Site E-commerce

## Comment ajouter des produits au site

### 1. Accéder au panneau d'administration
- Allez sur: http://localhost:5173/admin
- Identifiant: `admin`
- Mot de passe: `footland2026`

### 2. Ajouter un produit
- Cliquez sur "Produits" dans le menu
- Cliquez sur le bouton "Ajouter un produit"
- Remplissez le formulaire:
  - Nom du produit
  - Marque
  - Catégorie (Baskets, Running, Classique, Boots, Femme, Enfant)
  - URL de l'image (lien vers une image en ligne)
  - Prix (en DA)
  - Ancien prix (optionnel)
  - Stock
  - Note (0-5)
  - Pointures (séparées par virgule, ex: 40, 41, 42)
  - Couleurs (séparées par virgule, ex: Noir, Blanc)
  - Description
  - Cochez "Mettre en avant" pour afficher dans TOP ventes
- Cliquez sur "Ajouter"

### 3. Voir le produit sur le site
- Le produit apparaît immédiatement sur:
  - Page d'accueil (si "Mettre en avant" est coché)
  - Page Boutique (tous les produits)
  - Page de détail du produit (cliquez sur le produit)

### 4. Modifier ou supprimer un produit
- Dans le panneau admin > Produits
- Cliquez sur l'icône crayon pour modifier
- Cliquez sur l'icône corbeille pour supprimer

## Lancer le site

```bash
npm install
npm run dev
```

Le site sera accessible sur: http://localhost:5173
