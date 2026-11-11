# Strass Go — v117 « Pro » — Journal des modifications

Version : **117** (inchangée) · Fichier unique `index.html` (images intégrées)
Contraintes respectées : **aucune modification du Worker Cloudflare, de Supabase ni du SQL** · seul `sgu_prefs` est écrit sur le téléphone · aucune donnée inventée, aucune mention de source ou de date ajoutée.

---

## 1. Carte de la ville

### Arrivée sur la carte
- La feuille du bas, repliée, n'ouvre plus de fiche d'office (avant : une mairie s'affichait directement).
- Elle montre les **compteurs trams et bus en direct** (en route / au départ), puis un bouton **« Tous les services »** avec une flèche animée et l'invite « Glissez vers le haut · 18 services… ».
- Une fiche ne s'ouvre qu'après un choix : un point sur la carte ou un lieu dans la liste.

### Feuille remontée : navigateur de services
- Onglet « Tous les services » (remplace « Liste par rue » en mode carte de la ville).
- Niveau 1 : tous les services avec leur résumé réel en direct (ex. « 8 parkings · 2 067 places libres », « 40 stations · 202 vélos disponibles »), le nombre de lieux, et « Masqué sur la carte · touchez pour l'afficher » pour les services coupés.
- Niveau 2 : tous les lieux du service, triés par distance, avec la valeur réelle (ex. « 766 / 955 places libres · Ouvert »), recherche par nom ou rue.
- Toucher un lieu : fiche complète + la carte se cadre dessus.

### Fiche d'un lieu (bas de carte) — tout en grand
- Valeur principale en grand : « 326 personnes sur place », « 176 places libres sur 600 », « 12 min d'attente », prix carburant, vélos disponibles.
- Codes bruts traduits : `GREEN` → « Affluence faible » / « Places disponibles », `ORANGE` → « Affluence modérée » / « Se remplit », `RED` → « Forte affluence » / « Presque complet », `BLACK`/`CLOSED` → « Fermé ».
- `isopen` → pastille « Ouvert / Fermé ».
- `dayschedule` → « Horaires du jour : 14 h – 18 h 30 » et état calculé : « Ferme à 18 h 30 », « Ouvre à 14 h », « Fermé pour aujourd'hui ».
- Parkings : barre d'occupation colorée (« 71 % occupé »).
- Toutes les autres informations dans une grille lisible (les champs techniques et doublons sont masqués).
- Listes : parkings affichés « X / Y places libres », vélos et patinoire avec leur valeur réelle.
- Page « Tout voir » : les mêmes valeurs en pastilles + ligne « Horaires du jour ».

### Signalements communautaires (façon Waze, style Uber)
- Nouveau bouton à droite de la carte (au-dessus du filtre).
- Feuille de choix : **Police (contrôle), Radar mobile, Radar fixe, Accident, Travaux, Danger, Bouchon**.
- Envoi à la position actuelle, visible par **tous les utilisateurs pendant 45 min**, actualisation toutes les 30 s et à chaque déplacement de la carte.
- Repères sur la carte avec fenêtre « Signalé il y a X min · Toujours là / N'est plus là ».
- Utilise la table publique **existante** `sg_reports` (déjà utilisée par la v117), sans modification de la base.
- `works` (travaux) et `radar_mobile` sont de nouveaux types : si la base les refuse, l'app les renvoie automatiquement sous `hazard` et `police`.
  → Pour que chacun soit reconnu à part chez tous les utilisateurs, la colonne `type` doit accepter ces deux valeurs (décision côté base, non faite ici).

### Caméras
- **Les 1 154 caméras sont de retour** : un filtre de 60 km autour de Strasbourg n'en laissait passer que 53.
- Service Caméras : les 1 154. Carte de la ville : les 300 les plus proches de la zone affichée.

### Icônes
- Icônes au trait nettes à la place des rendus 3D / emojis pour **tous les services** : en-tête de la feuille, compteurs trams/bus, filtres en haut de la carte, liste des services, sélecteur « Que voulez-vous voir ? », pages de service. Toujours contenues dans leur case.
- Bouton « Tous les services » : le texte ne dépasse plus de sa case.

---

## 2. Écrans d'autorisation (à l'entrée dans l'app)

- Position puis notifications : **pages pleines façon Uber** au lieu des fenêtres flottantes.
- Indicateur « 1 / 2 », « 2 / 2 » avec barres de progression blanches.
- Grande illustration animée en haut :
  - Position : plan de ville stylisé, votre point rouge au centre avec ondes, tracé animé, et les services (tram, bus, parking, caméra, Vélhop, piscine, carburant) qui apparaissent autour.
  - Notifications : pile de notifications Strass Go façon iOS qui arrivent une à une (textes génériques, aucun chiffre).
- Titre aligné à gauche.
- Bouton principal blanc « **Partager la position** » / « Activer les notifications », et en dessous un simple lien discret « Ne pas partager » / « Pas maintenant ».
- Sur les deux pages : deux bandes pleine largeur des icônes de tous les services (tram, bus, parkings, P+R, caméras, Vélhop, carburants, trafic, alertes, météo, air, piscines, patinoire, mairies), qui défilent en sens inverse, sans texte.
- Textes réécrits pour présenter **toute l'app** :
  - Position : « Pour profiter de toutes les fonctions de Strass Go autour de vous » — services proches (arrêts, parkings, Vélhop…), carte centrée et itinéraires, signalements à votre position.
  - Notifications : « Pour recevoir les alertes de Strass Go au bon moment, même application fermée » — passage imminent des bus et trams favoris, alertes importantes de l'app.
- La logique d'autorisation de la v117 est inchangée : seul l'habillage et les textes changent.

## 3. Accueil de l'app (après connexion)

- **Bouton jour / nuit** en haut à droite (lune en mode jour, soleil en mode nuit), mémorisé dans les préférences.
- Bandeau du haut : traits plus visibles, ombres légères façon iOS ; carte « Strasbourg en direct » avec ombre douce et tracés de tram plus saturés et lisibles.
- **Services / Dashboard / Favoris** : contrôle segmenté sobre (pastille blanche / grise), le pavé rouge 3D est supprimé.
- **Raccourcis** : tuiles nettes avec icônes au trait (les icônes 3D sont retirées).
- Filtres « Tout / En direct / Favoris » supprimés (doublon des onglets).
- La longue liste de services devient une **grille de cartes par catégorie**, chacune avec sa valeur en direct.
- **« En un coup d'œil »** : Parkings, Bus & tram, Vélhop, Météo, Piscines, Patinoire avec leur valeur réelle.
- **« Bien démarrer »** : carrousel d'astuces avec barres de progression.
- Cartes « À la une » : encoche avec flèche (carte découpée).
- Les chiffres en direct glissent jusqu'à leur nouvelle valeur (uniquement des valeurs réelles affichées par l'app).
- Boutons principaux : aplats nets façon Uber, sans anneau ni animation tape-à-l'œil.
- Conteneurs avec bordures fines (clair et sombre).

---

## 4. Page publique (avant connexion)

- Fond noir uni + grain discret, titres alignés à gauche, cartes à bordure fine, icônes au trait à la place des emojis.
- Textes harmonisés au **vouvoiement**.
- Nouvelles sections (composants recréés en JS/CSS natif) :
  - Frise de services animée (logo carousel)
  - **Globe 3D** centré sur Strasbourg avec les services en orbite (cobe, licence MIT) + « Strasbourg » rempli d'une photo animée + titre pixel « EN DIRECT »
  - Onglets par moyen de transport (Bus & tram, Voiture, Vélo, À pied) avec maquettes d'interface sobres
  - « Comment ça marche » : schéma services → Strass Go → votre téléphone + grille de faisceaux animés
  - « Pour qui ? » (grille de cartes illustrées)
  - « En quatre gestes » (carrousel avec barres de progression)
  - Lecteur vidéo de présentation (affiche « bientôt disponible » ; coller l'URL MP4 dans `SG_PROMO_VIDEO` le jour venu)
  - Communauté (bulles de discussion)
  - Sécurité (point de contrôle : connexion chiffrée HTTPS)
  - Installation (carte sobre : icône + « Strass Go · Application web », titre, bouton rouge fin, « Installation manuelle » en 3 étapes numérotées) : **vrai bouton « Installer »** — quand le navigateur le permet (Chrome, Edge, Android), l'installation se fait en 1 geste et l'icône se place seule sur l'écran d'accueil (bouton rouge « Installer l'app en 1 geste »).
    Sinon, les 3 gestes adaptés à l'appareil, détecté automatiquement (plus aucune question « Android ou iOS ? ») : Android → les **3 points ⋮** → « Installer l'application » ; iPhone → Partager ⤴ → « Sur l'écran d'accueil » ; Samsung Internet → menu ☰ ; ordinateur → icône d'installation de la barre d'adresse. Une fois installée : « Strass Go est installée ».
    Les bulles blanche et rouge sont supprimées.
  - Appel final « Prêt à partir ? » en police pixel + faisceaux animés
- Photos de la ville en cartes à encoche.
- Ancien schéma « Comment ça marche » masqué (il citait les sources et affichait des temps de passage d'exemple).
- Logos partenaires et icône intégrés directement dans `index.html`.

---

## 5. Composants (inspirés de cult-ui, réécrits sans React)

metal-button (simplifié en bouton sobre) · cutout-card · folded-card · logo-carousel · gateway-endpoint · illustration-card-grid · comment-bubble · security-checkpoint · merging-bubbles · globe (cobe 2.0.1, MIT) · hover-video-player · loading-carousel · grid-beam · bg-image-texture · text-animate · rolling-number · pixel-heading (Geist Pixel, OFL 1.1) · text-gif

`npm install next@latest` n'a pas été appliqué : l'app est un fichier unique sur GitHub Pages, une migration Next.js imposerait de la réécrire.

---

## 6. Points à vérifier sur téléphone (données réelles)

- Signalements : faire un signalement et vérifier qu'il apparaît sur un second appareil.
- Mentions commerciales héritées de la v117, non modifiées : « +7 500 Strasbourgeois », « N°1 à Strasbourg », prix barré 15,90 €, « Offre de lancement −57 % · 48 h » (un compte à rebours permanent ou un ancien prix jamais pratiqué peut être considéré comme une pratique commerciale trompeuse).

---

## 7. Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'app complète (logos et icône intégrés) |
| `sw.js` | Service worker (v117) |
| `version.json` | `{"version":"117"}` |
| `manifest.json` | Manifeste PWA |
| `icon-192.png`, `icon-512.png` | Icônes de l'app installée |
| `logo-cts.png`, `logo-strasbourg.png`, `logo-alpha-korner.png` | Logos partenaires (aussi intégrés dans index.html) |
| `CHANGELOG-v117-pro.md` | Ce document |
| `DEPLOIEMENT.md` | Mise en ligne sur GitHub Pages |

---

## 8. Correctifs : zoom et accès admin

- **Zoom de page désactivé partout** (avant et après connexion) : `maximum-scale=1, user-scalable=no` dans la balise viewport, y compris quand l'app la réécrit pour les téléphones ; `touch-action: manipulation` contre le zoom au double-tap ; pincement bloqué sur iPhone. Les cartes (Leaflet, globe, vue 3D) gardent leur propre zoom.
- **Accès admin rétabli** : la signature « By Brice Jct · Alpha OS · Strasbourg » en bas du menu ☰ s'ouvre de nouveau au double-tap (le double-tap faisait zoomer la page au lieu d'ouvrir l'admin). Détection du double-tap ajoutée en plus du double-clic d'origine, le menu se ferme pour que l'écran admin passe au premier plan.
- **Même accès caché dans l'app** : la même signature en bas de Réglages (bouton profil en bas à gauche) ouvre l'admin au double-tap.
- La connexion admin elle-même (code, console, Supabase) est inchangée.

## 9. « Y aller » → le GPS de Strass Go

- Le bouton « Y aller » (fiche en bas de carte et page Détails) n'ouvre plus la fenêtre « Ouvrir dans… » (téléphone, Google Maps, Waze, Plans).
- Il ouvre directement **le GPS intégré de Strass Go** : la carte s'affiche avec la destination, l'aperçu du trajet et le choix du mode (voiture, bus/tram, vélo, trottinette, à pied) avec la durée de chaque mode, puis le lancement du guidage vocal.
- Les liens vers les applications externes ont été retirés de la page Détails.
- Si la position n'est pas encore connue, l'écran propose « Activer ma position » puis calcule les trajets.

## 11. Accueil allégé, rouges Strass Go, listes de service, Premium

**Accueil**
- « À la une à Strasbourg » : cartes plus petites (232 px max au lieu de 320, photo 118 px au lieu de 156). Le rond du service est maintenant à l'intérieur de la photo, en bas à gauche, et n'est plus coupé. La rangée démarre alignée sur la marge de 16 px.
- La flèche dans l'encoche des cartes passe du noir au rouge.
- Tout est un peu plus petit sur l'accueil : salutation 27 → 23 px, carte « Strasbourg en direct » 168 → 148 px, onglets 46 → 40 px, raccourcis 64 → 54 px, titres de section 22 → 18,5 px, tuiles et lignes de service réduites d'environ 10 %.
- Raccourcis : le choix actif passe du noir au rouge, avec son libellé en rouge.
- Nouveaux éléments légers :
  - la date du jour sous « Bonsoir » ;
  - une section « Sur la route » avec « Signaler sur la route » (ouvre la carte puis la fenêtre de signalement), « Carte en direct » et « Installer Strass Go » (masqué si l'app est déjà installée).

**Barre du bas, sur toutes les pages, en jour comme en nuit**
- Le bouton carte est rouge, du même rouge que la pastille « infos trafic ».
- L'icône profil est rouge.

**Listes de service (Parkings, Caméras, etc.)**
- Bug corrigé : en descendant dans la liste, l'en-tête se cassait (boutons et recherche en ligne, grand bloc blanc). La cause était un nom de classe `.sc` partagé entre un composant de la page publique et l'état « défilé » des en-têtes. Le composant s'appelle maintenant `.fxsc`, ce qui corrige aussi l'en-tête de l'accueil au défilement.
- Nouvel en-tête façon accueil :
  - bande rouge rayée, boutons ronds translucides, titre en blanc ;
  - recherche en pilule blanche, filtres translucides (le filtre actif est blanc) ;
  - un rebord blanc arrondi sépare nettement la recherche des résultats ;
  - au défilement, le titre se replie et un filet fin sépare l'en-tête de la liste.

**Premium**
- « J'en profite », « Passer Premium » et « Prolonger » n'ouvrent plus le paiement. Ils affichent « Les abonnements arrivent bientôt. Premium n'est pas encore ouvert à l'achat. Revenez très vite, tout sera prêt. », avec un bouton « Compris ».
- Le code promo fonctionne toujours.

**Vérifié**
- Testé en mode jour et nuit sur l'accueil, la liste Parkings, la liste Caméras défilée et le paywall : 0 erreur JS.
- 45 scripts passent `node --check`.
- Contraintes respectées : supabase 21, workers.dev 5, cts-proxy 6 ; `sw.js` et `version.json` (117) inchangés ; aucun appel nouveau ni écriture SQL ; seule la préférence locale `sgu_prefs` est écrite.

## 10. Vérification finale avant publication

- 44 scripts : 0 erreur de syntaxe.
- Parcours testés, mobile, clair et sombre, sans erreur de l'app : page publique (toutes les sections), écrans d'autorisation, accueil (bouton jour/nuit, sélecteur, raccourcis, grille, « En un coup d'œil », astuces), Carte de la ville (arrivée repliée, « Tous les services », lieux par service, fiche détaillée), patinoire, parkings, signalements (envoi + repli de type), caméras (1 154).
- Supabase : seule la table `sg_reports` est appelée, déjà utilisée par la v117. Références `supabase` 21 → 21, `workers.dev` 5 → 5, `cts-proxy` 6 → 6. Aucune table, colonne ni fonction créée ou modifiée.
- Worker Cloudflare : non modifié, utilisé en lecture comme avant.
- Stockage sur le téléphone : seul `sgu_prefs` (préférences) est écrit par les nouveautés.
- `sw.js` et `version.json` (117) inchangés.
