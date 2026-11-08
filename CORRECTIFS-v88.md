# Strass&Go v88 — fiches au toucher (bus, tram, P+R, vélo, parking, caméra, trafic…)

- CAUSE TROUVÉE : le « filet de sécurité » de la v87 testait `window.St`, mais `St` est une `const` → n'existe pas sur `window`. Le filet ne s'est donc jamais activé.
- Nouveau routeur de taps universel : ouvre la fiche au relâchement du doigt (pointerup/touchend), même si le navigateur n'envoie pas de « click ». Anti-doublon avec le click Leaflet.
- Testé (Chromium mobile + écran tactile) avec tous les clics natifs bloqués : les fiches s'ouvrent quand même.
- Version 88 synchronisée : index.html, version.json, sw.js.
Note : le suivi tram en direct de l'ancienne v86 n'est pas dans cette branche.
