/**
 * Ar-o1 — Digital dust particle background. BufferGeometry + ShaderMaterial, 60fps target.
 * Mobile: reduced particle count (6k vs 14k). Optional: FPS-based bypass can dispose canvas if weak.
 */

import * as THREE from "three";
import { particleVertex, particleFragment } from "./shaders";

const PARTICLE_COUNT = 14_000;
const MOBILE_PARTICLE_COUNT = 6_000;

function isLikelyMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function createParticleScene(canvas: HTMLCanvasElement): {
  resize: (w: number, h: number) => void;
  setMouse: (x: number, y: number) => void;
  dispose: () => void;
  render: () => void;
} {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000);
  camera.position.z = 500;

  const scene = new THREE.Scene();

  const count = isLikelyMobile() ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const scales = new Float32Array(count);
  const spread = 520;

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    phases[i] = Math.random();
    scales[i] = 0.6 + Math.random() * 0.6;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseInfluence: { value: 0.15 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColor: { value: new THREE.Color(0.15, 0.35, 0.5) },
    },
    vertexShader: particleVertex,
    fragmentShader: particleFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  let rafId = 0;
  let lastTime = performance.now();

  function resize(w: number, h: number): void {
    width = w;
    height = h;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    material.uniforms.uResolution.value.set(w, h);
  }

  function setMouse(x: number, y: number): void {
    material.uniforms.uMouse.value.set(x, y);
  }

  function render(): void {
    const now = performance.now();
    material.uniforms.uTime.value = (now * 0.001) % 1e4;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(render);
  }

  function dispose(): void {
    cancelAnimationFrame(rafId);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  }

  resize(canvas.clientWidth, canvas.clientHeight);
  rafId = requestAnimationFrame(render);

  return { resize, setMouse, dispose, render };
}
