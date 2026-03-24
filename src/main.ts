/**
 * Ar-o1 Terminal — Entry. WebGL background, grain (in HTML), GSAP terminal sequence.
 * Optimized TypeScript; <500kb gzip target.
 */

import { createParticleScene } from "./webgl/particles";
import { scrambleText, typewriter } from "./terminal/sequence";
import gsap from "gsap";

const ROOT = document.getElementById("root")!;
const CANVAS = document.getElementById("webgl-background") as HTMLCanvasElement;

if (!CANVAS) throw new Error("Missing #webgl-background");

// ——— WebGL Background ———
const particleScene = createParticleScene(CANVAS);

function onResize(): void {
  const w = window.innerWidth;
  const h = window.innerHeight;
  particleScene.resize(w, h);
}

window.addEventListener("resize", onResize);

let mouseX = 0.5;
let mouseY = 0.5;

function onMouseMove(e: MouseEvent): void {
  mouseX = e.clientX / window.innerWidth;
  mouseY = 1 - e.clientY / window.innerHeight;
  particleScene.setMouse(mouseX, mouseY);
}

function onTouchMove(e: TouchEvent): void {
  if (e.touches.length) {
    mouseX = e.touches[0].clientX / window.innerWidth;
    mouseY = 1 - e.touches[0].clientY / window.innerHeight;
    particleScene.setMouse(mouseX, mouseY);
  }
}

window.addEventListener("mousemove", onMouseMove, { passive: true });
window.addEventListener("touchmove", onTouchMove, { passive: true });

// ——— GSAP Terminal Sequence ———
const terminalTextEl = document.querySelector<HTMLElement>(
  '[maher-element="terminal-text"]'
);
const terminalMissionEl = document.querySelector<HTMLElement>(
  '[maher-element="terminal-mission"]'
);

const heroText =
  terminalTextEl?.dataset.terminalText ?? "AR-O1 // TINE MAHER";
const missionText =
  terminalMissionEl?.dataset.terminalMission ??
  "Sovereign AI Infrastructure. Building at the intersection of hardware, software, and agentic systems.";

function runTerminalSequence(): void {
  if (!terminalTextEl || !terminalMissionEl) return;

  gsap.set(terminalTextEl, { opacity: 1 });
  scrambleText(terminalTextEl, heroText, 1.2, () => {
    gsap.set(terminalMissionEl, { opacity: 1 });
    typewriter(terminalMissionEl, missionText, 28);
  });
}

// Start after first paint
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => runTerminalSequence());
  });
} else {
  requestAnimationFrame(() => runTerminalSequence());
}
