import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Your photos float in 3D depth: nearer cards move faster than far ones as the page scrolls (parallax),
// with a slow sway and pointer parallax. Normal scroll, no pinning.
const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

function roundedMask() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, 128, 128);
  g.fillStyle = '#fff'; g.beginPath();
  if (g.roundRect) g.roundRect(4, 4, 120, 120, 22); else g.rect(4, 4, 120, 120);
  g.fill();
  return new THREE.CanvasTexture(c);
}

export function createStoneField(el, images) {
  gsap.registerPlugin(ScrollTrigger);
  const N = Math.min(images.length, 36);
  const rand = rng(11);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = 'absolute inset-0 h-full w-full';
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0610, 9, 24);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 60);
  camera.position.set(0, 0, 10);

  const H = Math.max(24, N * 1.5), travel = H - 4;
  const mask = roundedMask();
  const loader = new THREE.TextureLoader();
  const geo = new THREE.PlaneGeometry(1, 1);
  const cards = [];
  let xs = 1, ready = false;
  for (let i = 0; i < N; i++) {
    const z = 0.5 - rand() * 7;
    const mat = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: mask, opacity: 0.88, depthWrite: false, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { x: (i % 2 ? 1 : -1) * (3.2 + rand() * 3.8), y0: 5 - (i / N) * H + (rand() - 0.5) * 1.5, speed: 0.85 + ((z + 6.5) / 7) * 0.3, h: 1.7 + rand() * 0.9 };
    mesh.position.z = z;
    mesh.scale.set(mesh.userData.h, mesh.userData.h, 1);
    scene.add(mesh);
    cards.push(mesh);
    loader.load(images[i], (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      mat.map = tex; mat.needsUpdate = true;
      const k = tex.image.width / tex.image.height, h = mesh.userData.h;
      mesh.scale.set(Math.min(h * k, 3.2), h, 1);
      if (!ready) { ready = true; el.style.opacity = '1'; }
    });
  }

  const resize = () => {
    const w = el.clientWidth || 1, h = el.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    xs = Math.min(1, camera.aspect / 1.78);
    ScrollTrigger.refresh();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();

  const state = { p: 0 };
  const ctx = gsap.context(() => {
    gsap.to(state, { p: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true } });
  }, el);

  let mx = 0, my = 0;
  const onMove = (e) => { mx = (e.clientX / innerWidth - 0.5) * 2; my = (e.clientY / innerHeight - 0.5) * 2; };
  addEventListener('pointermove', onMove, { passive: true });
  const onLost = (e) => { e.preventDefault(); el.style.opacity = '0'; };
  renderer.domElement.addEventListener('webglcontextlost', onLost);

  const tick = (t) => {
    if (document.hidden) return;
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i], u = c.userData;
      c.position.x = u.x * xs;
      c.position.y = u.y0 + state.p * travel * u.speed + Math.sin(t * 0.6 + i) * 0.12;
      c.rotation.y = Math.sin(t * 0.35 + i * 1.7) * 0.35 + mx * 0.12;
      c.rotation.x = Math.sin(t * 0.3 + i) * 0.08 - my * 0.06;
    }
    camera.position.x += (mx * 0.6 - camera.position.x) * 0.05;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };
  gsap.ticker.add(tick);

  return () => {
    gsap.ticker.remove(tick);
    ctx.revert();
    removeEventListener('pointermove', onMove);
    renderer.domElement.removeEventListener('webglcontextlost', onLost);
    ro.disconnect();
    cards.forEach((c) => { c.material.map?.dispose(); c.material.dispose(); });
    geo.dispose();
    mask.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
