# Mise en ligne — Strass Go v117 « Pro »

1. Décompresser le zip.
2. Déposer **tous les fichiers à la racine** du dépôt GitHub (remplacer les anciens) :
   `index.html`, `sw.js`, `version.json`, `manifest.json`, `icon-192.png`, `icon-512.png`, `logo-cts.png`, `logo-strasbourg.png`, `logo-alpha-korner.png`.
3. Commit + push. GitHub Pages publie en 1 à 2 minutes (domaine strassgo.fr).
4. Le service worker charge la page « réseau d'abord » : les utilisateurs reçoivent la nouvelle version à la prochaine ouverture, sans changer le numéro de version.
5. Si un téléphone garde l'ancienne version : fermer l'app, la rouvrir (ou vider le cache du navigateur).

Vidéo de présentation (plus tard) : dans `index.html`, rechercher `SG_PROMO_VIDEO=""` et y coller l'URL du fichier MP4.

Aucune action n'est nécessaire sur le Worker Cloudflare, Supabase ou la base SQL.
