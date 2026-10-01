/* ════════════════════════════════════════════════════════════════════
   smoke-ring.js — Strass&Go
   Intègre le VRAI shader WebGL "SmokeRing" de @paper-design/shaders
   (le même fragment shader que @paper-design/shaders-react, en vanilla
   JS, sans React ni étape de build). Chargé depuis jsDelivr (CDN npm).

   Nécessite un hébergement avec accès réseau sortant (GitHub Pages,
   serveur web classique...) — ne fonctionnera pas en ouverture locale
   file:// ni dans un environnement sans accès internet.

   Usage dans index.html :
     1) <script type="module" src="smoke-ring.js" defer></script>
     2) <div data-smoke-ring style="width:220px;height:220px"></div>
        (le mount gère tout seul le resize sur la taille du div)

   Options par attribut data- sur le même <div>, toutes facultatives :
     data-colors='["#ffffff"]'   (array JSON de couleurs, 1 à 10)
     data-color-back="#000000"
     data-noise-scale="3"
     data-noise-iterations="8"
     data-radius="0.25"
     data-thickness="0.65"
     data-inner-shape="0.7"
     data-speed="0.5"
     data-scale="0.8"
   ════════════════════════════════════════════════════════════════════ */

import {
  ShaderMount,
  smokeRingFragmentShader,
} from "https://cdn.jsdelivr.net/npm/@paper-design/shaders@0.0.81/dist/index.js";

/** Convertit "#rrggbb" (ou "#rrggbbaa") en vec4 [r,g,b,a] normalisé 0..1 (sRGB linéaire simple) */
function hexToVec4(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.length >= 6 ? h.slice(0, 2) : h[0] + h[0], 16) / 255;
  const g = parseInt(h.length >= 6 ? h.slice(2, 4) : h[1] + h[1], 16) / 255;
  const b = parseInt(h.length >= 6 ? h.slice(4, 6) : h[2] + h[2], 16) / 255;
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return [r, g, b, a];
}

/**
 * Monte le shader SmokeRing sur un élément hôte, avec les mêmes props
 * que le composant React <SmokeRing .../>.
 * @param {HTMLElement} el - conteneur qui recevra le canvas (position:relative recommandé)
 * @param {object} opts
 * @param {string[]} [opts.colors=["#ffffff"]]
 * @param {string} [opts.colorBack="#000000"]
 * @param {number} [opts.noiseScale=3]
 * @param {number} [opts.noiseIterations=8]
 * @param {number} [opts.radius=0.25]
 * @param {number} [opts.thickness=0.65]
 * @param {number} [opts.innerShape=0.7]
 * @param {number} [opts.speed=0.5]
 * @param {number} [opts.scale=0.8]
 * @returns {ShaderMount}
 */
export function mountSmokeRing(el, opts = {}) {
  const colors = (opts.colors && opts.colors.length ? opts.colors : ["#ffffff"]).map(hexToVec4);
  const uniforms = {
    u_colorBack: hexToVec4(opts.colorBack || "#000000"),
    u_colors: colors,
    u_colorsCount: colors.length,
    u_noiseScale: opts.noiseScale ?? 3,
    u_noiseIterations: opts.noiseIterations ?? 8,
    u_radius: opts.radius ?? 0.25,
    u_thickness: opts.thickness ?? 0.65,
    u_innerShape: opts.innerShape ?? 0.7,
    // sizing uniforms (équivalents aux props width/height/fit/scale du composant React)
    u_fit: 1, // 1 = contain
    u_scale: opts.scale ?? 0.8,
    u_rotation: 0,
    u_offsetX: 0,
    u_offsetY: 0,
    u_originX: 0.5,
    u_originY: 0.5,
    u_worldWidth: 0,
    u_worldHeight: 0,
  };
  return new ShaderMount(el, smokeRingFragmentShader, uniforms, undefined, opts.speed ?? 0.5);
}

/** Auto-init : monte le shader sur tout élément portant [data-smoke-ring] trouvé dans la page. */
function autoInit() {
  document.querySelectorAll("[data-smoke-ring]").forEach((el) => {
    if (el.__smokeRingMounted) return;
    el.__smokeRingMounted = true;
    let colors;
    try {
      colors = el.dataset.colors ? JSON.parse(el.dataset.colors) : undefined;
    } catch (e) {
      colors = undefined;
    }
    mountSmokeRing(el, {
      colors,
      colorBack: el.dataset.colorBack,
      noiseScale: el.dataset.noiseScale ? parseFloat(el.dataset.noiseScale) : undefined,
      noiseIterations: el.dataset.noiseIterations ? parseFloat(el.dataset.noiseIterations) : undefined,
      radius: el.dataset.radius ? parseFloat(el.dataset.radius) : undefined,
      thickness: el.dataset.thickness ? parseFloat(el.dataset.thickness) : undefined,
      innerShape: el.dataset.innerShape ? parseFloat(el.dataset.innerShape) : undefined,
      speed: el.dataset.speed ? parseFloat(el.dataset.speed) : undefined,
      scale: el.dataset.scale ? parseFloat(el.dataset.scale) : undefined,
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoInit);
} else {
  autoInit();
}
