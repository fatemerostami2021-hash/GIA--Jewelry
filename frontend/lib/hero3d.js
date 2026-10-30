import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * createHero3DScene
 * Builds a professional, jewellery-house-style 3D scene using the user's gemstone
 * photos as textures. The scene has three layers:
 *
 *   1. A central faceted "gem" cylinder — a tall hexagonal column that catches
 *      a gold rim light. It rotates slowly with scroll and pointer.
 *   2. A ring of 8 floating "gem cards" — textured planes with rounded alpha
 *      masks, orbiting on a tilted axis, with subtle per-card sway.
 *   3. A gold particle dust field — small additive points that drift upward,
 *      giving the scene warmth without the clutter of floating photo collages.
 *
 * The whole thing is fixed behind the hero, fades in once the first texture is
 * ready, fades out if WebGL context is lost, and is fully disposed on unmount.
 */
const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

function roundedMask(radius = 22) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, 128, 128);
  g.fillStyle = '#fff';
  g.beginPath();
  if (g.roundRect) g.roundRect(6, 6, 116, 116, radius);
  else g.rect(6, 6, 116, 116);
  g.fill();
  // a soft inner vignette so the cards feel like they sit in glass
  const grad = g.createRadialGradient(64, 64, 30, 64, 64, 70);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.35)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function particleTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,243,207,1)');
  grad.addColorStop(0.4, 'rgba(212,175,55,0.6)');
  grad.addColorStop(1, 'rgba(212,175,55,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export function createHero3DScene(el, images) {
  gsap.registerPlugin(ScrollTrigger);

  const N = Math.min(images.length, 8);
  const rand = rng(7);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = 'absolute inset-0 h-full w-full';
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0610, 0.045);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  camera.position.set(0, 0, 11);

  // ===== Lights for the faceted gem ===========================================
  const ambient = new THREE.AmbientLight(0x4a2a7a, 0.55);
  scene.add(ambient);
  const goldKey = new THREE.DirectionalLight(0xf2d98a, 1.6);
  goldKey.position.set(4, 5, 6);
  scene.add(goldKey);
  const purpleRim = new THREE.DirectionalLight(0x7b4bb7, 1.1);
  purpleRim.position.set(-5, -2, 4);
  scene.add(purpleRim);

  // ===== 1. Central faceted "gem column" ======================================
  const gemGroup = new THREE.Group();
  scene.add(gemGroup);

  const gemGeo = new THREE.CylinderGeometry(1.4, 1.4, 3.2, 6, 1, false);
  const gemMat = new THREE.MeshStandardMaterial({
    color: 0x2a0e44,
    metalness: 0.85,
    roughness: 0.18,
    emissive: 0x3d1d63,
    emissiveIntensity: 0.25,
    flatShading: true,
  });
  const gem = new THREE.Mesh(gemGeo, gemMat);
  gemGroup.add(gem);

  // A thin gold rim around the top and bottom of the column
  const rimGeo = new THREE.TorusGeometry(1.45, 0.04, 12, 64);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, metalness: 1, roughness: 0.25, emissive: 0x3a2a05, emissiveIntensity: 0.35,
  });
  const rimTop = new THREE.Mesh(rimGeo, rimMat);
  rimTop.rotation.x = Math.PI / 2; rimTop.position.y = 1.6;
  const rimBot = rimTop.clone(); rimBot.position.y = -1.6;
  gemGroup.add(rimTop, rimBot);

  // ===== 2. Floating gem cards in an orbit ring ===============================
  const cards = [];
  const mask = roundedMask();
  const loader = new THREE.TextureLoader();
  const cardGeo = new THREE.PlaneGeometry(1, 1);
  const RING_RADIUS = 5.2;
  const TILT = 0.32; // gentle tilt of the orbit plane
  let ready = 0;
  for (let i = 0; i < N; i++) {
    const mat = new THREE.MeshBasicMaterial({
      transparent: true, alphaMap: mask, opacity: 0.92, depthWrite: false, side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(cardGeo, mat);
    const a = (i / N) * Math.PI * 2;
    mesh.userData = {
      a, // angle on the ring
      r: RING_RADIUS + (rand() - 0.5) * 0.6,
      h: 1.55 + rand() * 0.45,
      sway: rand() * Math.PI * 2,
      swayAmp: 0.12 + rand() * 0.18,
      spin: 0.2 + rand() * 0.4,
    };
    scene.add(mesh);
    cards.push(mesh);
    loader.load(images[i], (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      mat.map = tex;
      mat.needsUpdate = true;
      const k = tex.image.width / tex.image.height;
      const h = mesh.userData.h;
      mesh.scale.set(Math.min(h * k, 2.1), h, 1);
      ready++;
      if (ready === 1) el.style.opacity = '1';
    });
  }

  // ===== 3. Gold particle dust =================================================
  const dustCount = 80;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  const dustSeed = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3 + 0] = (rand() - 0.5) * 16;
    dustPos[i * 3 + 1] = (rand() - 0.5) * 10;
    dustPos[i * 3 + 2] = (rand() - 0.5) * 8 - 1;
    dustSeed[i] = rand() * Math.PI * 2;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    size: 0.16,
    map: particleTexture(),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.85,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // ===== Resize ===============================================================
  let xs = 1;
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

  // ===== Scroll state =========================================================
  const state = { p: 0 };
  const ctx = gsap.context(() => {
    gsap.to(state, {
      p: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });
  }, el);

  // ===== Pointer parallax =====================================================
  let mx = 0, my = 0;
  const onMove = (e) => {
    mx = (e.clientX / innerWidth - 0.5) * 2;
    my = (e.clientY / innerHeight - 0.5) * 2;
  };
  addEventListener('pointermove', onMove, { passive: true });
  const onLost = (e) => { e.preventDefault(); el.style.opacity = '0'; };
  renderer.domElement.addEventListener('webglcontextlost', onLost);

  // ===== Tick =================================================================
  const tick = (t) => {
    if (document.hidden) return;
    const ts = t * 0.001;

    // Central gem: slow spin + scroll-driven extra rotation
    gemGroup.rotation.y = ts * 0.18 + state.p * Math.PI * 1.2 + mx * 0.25;
    gemGroup.rotation.x = my * 0.12 + Math.sin(ts * 0.3) * 0.04;
    gemGroup.position.y = -1.2 + Math.sin(ts * 0.4) * 0.12;

    // Cards orbiting on a tilted ring
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i], u = c.userData;
      const a = u.a + ts * 0.12 + state.p * 0.9;
      const tilt = TILT + Math.sin(ts * 0.2 + i) * 0.04;
      // ring position
      const rx = Math.cos(a) * u.r * xs;
      const rz = Math.sin(a) * u.r;
      const ry = Math.sin(a) * u.r * tilt + Math.sin(ts * 0.5 + u.sway) * u.swayAmp;
      c.position.set(rx, ry - 0.3, rz);
      // face camera softly
      c.lookAt(camera.position.x, c.position.y, camera.position.z);
      c.material.opacity = 0.92 * (0.55 + 0.45 * (Math.sin(a) * 0.5 + 0.5));
    }

    // Dust drifting upward
    const dp = dustGeo.attributes.position.array;
    for (let i = 0; i < dustCount; i++) {
      const k = i * 3;
      dp[k + 1] += 0.004 + Math.sin(ts + dustSeed[i]) * 0.0015;
      if (dp[k + 1] > 5) dp[k + 1] = -5;
      dp[k] += Math.sin(ts * 0.3 + dustSeed[i]) * 0.0012;
    }
    dustGeo.attributes.position.needsUpdate = true;

    // Camera parallax
    camera.position.x += (mx * 0.7 - camera.position.x) * 0.05;
    camera.position.y += (-my * 0.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };
  gsap.ticker.add(tick);

  // ===== Dispose ==============================================================
  return () => {
    gsap.ticker.remove(tick);
    ctx.revert();
    removeEventListener('pointermove', onMove);
    renderer.domElement.removeEventListener('webglcontextlost', onLost);
    ro.disconnect();
    cards.forEach((c) => { c.material.map?.dispose(); c.material.alphaMap?.dispose(); c.material.dispose(); });
    cardGeo.dispose();
    mask.dispose();
    gemGeo.dispose(); gemMat.dispose();
    rimGeo.dispose(); rimMat.dispose();
    dustGeo.dispose();
    dustMat.map?.dispose(); dustMat.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
