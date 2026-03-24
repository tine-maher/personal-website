/**
 * Ar-o1 — Terminal text effects: scramble (decrypt-style) then typewriter.
 * No ScrambleText plugin; custom character shuffle + GSAP timeline.
 */

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function scrambleText(
  element: HTMLElement,
  finalText: string,
  duration: number,
  onComplete?: () => void
): void {
  const len = finalText.length;
  let elapsed = 0;
  const interval = 20;
  const steps = Math.max(1, Math.floor((duration * 1000) / interval));

  function tick(): void {
    elapsed += 1;
    const progress = elapsed / steps;
    let out = "";
    for (let i = 0; i < len; i++) {
      const reveal = progress >= (i + 1) / len;
      out += reveal ? finalText[i] : randomChar();
    }
    element.textContent = out;
    if (elapsed < steps) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = finalText;
      onComplete?.();
    }
  }
  requestAnimationFrame(tick);
}

export function typewriter(
  element: HTMLElement,
  text: string,
  charDelay: number,
  onComplete?: () => void
): void {
  element.textContent = "";
  let i = 0;
  function addChar(): void {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(addChar, charDelay);
    } else {
      onComplete?.();
    }
  }
  setTimeout(addChar, charDelay);
}
