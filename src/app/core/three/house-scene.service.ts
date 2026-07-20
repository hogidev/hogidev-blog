import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { buildModel, BOY_ROUTE, BOY_SIT, BOY_SIT_SOFA } from './house-model';

type Tab = 'home' | 'about' | 'blogs' | 'projects';

interface View {
  cam: number[];
  look: number[];
  yaw: number;
  scale: number;
  ox: number;
  oy: number;
}

/**
 * Owns the single WebGL context for the whole app. Instantiate once (in the
 * shell), call init(canvas) inside NgZone.runOutsideAngular so the 60fps loop
 * never triggers Angular change detection, and dispose() on teardown.
 */
@Injectable({ providedIn: 'root' })
export class HouseSceneService {
  private renderer?: THREE.WebGLRenderer;
  private host?: HTMLElement;
  private ro?: ResizeObserver;
  private disposers: Array<() => void> = [];
  private view: View = { cam: [0, 2.2, 7.4], look: [-1.7, 1.5, 0], yaw: -0.15, scale: 0.82, ox: 0, oy: 0 };

  private readonly VIEWS: Record<Tab, View> = {
    home: { cam: [0, 2.2, 7.4], look: [-1.7, 1.5, 0], yaw: -0.15, scale: 0.82, ox: 0, oy: 0 },
    about: { cam: [0.6, 2.9, 5.4], look: [0.1, 2.0, 0], yaw: -0.28, scale: 1.12, ox: -0.2, oy: 0.15 },
    projects: { cam: [0, 3.6, 8.6], look: [0, 1.25, 0], yaw: -0.12, scale: 0.82, ox: 0, oy: -0.1 },
    blogs: { cam: [0.6, 2.6, 6.6], look: [0.1, 1.7, 0], yaw: -0.28, scale: 0.92, ox: 0, oy: 0 },
  };

  /** Bootstraps the scene into a host element (which must contain / receive a canvas). */
  init(host: HTMLElement): void {
    if (this.renderer) return; // already initialised
    this.host = host;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    host.prepend(renderer.domElement);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
    camera.position.set(0, 2.2, 6.6);
    camera.lookAt(0, 1.45, 0);

    const hemi = new THREE.HemisphereLight('#dfe8f2', '#20242c', 1.15);
    scene.add(hemi);
    const key = new THREE.DirectionalLight('#ffffff', 1.7);
    key.position.set(3, 6, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -4, right: 4, top: 5, bottom: -1, near: 1, far: 20 });
    key.shadow.bias = -0.0005;
    scene.add(key);
    const rim = new THREE.DirectionalLight('#3ddc97', 0.45);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const model = buildModel();
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) { mesh.castShadow = true; mesh.receiveShadow = true; }
    });
    const warm1 = new THREE.PointLight('#ffd9a0', 6, 4, 1.8); warm1.position.set(-0.6, 1.2, -0.05); model.add(warm1);
    const warm2 = new THREE.PointLight('#ffd9a0', 5, 4, 1.8); warm2.position.set(-0.2, 2.7, 0.1); model.add(warm2);

    let lampMat: THREE.MeshStandardMaterial | undefined;
    let screenMat: THREE.MeshStandardMaterial | undefined;
    let glassMat: THREE.MeshStandardMaterial | undefined;
    model.traverse((o) => {
      const mat = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (!mat) return;
      if (mat.name === 'lamp_glow') lampMat = mat;
      if (mat.name === 'screen') screenMat = mat;
      if (mat.name === 'glass') glassMat = mat;
    });
    if (glassMat) glassMat.emissive = new THREE.Color('#ffd98c');

    // ---- sun shafts through the left windows ----
    const shaftGroup = new THREE.Group(); model.add(shaftGroup);
    const shaftMats: Array<{ mat: THREE.MeshBasicMaterial; base: number }> = [];

    const floorPatchTexture = () => {
      const c = document.createElement('canvas'); c.width = c.height = 256;
      const x = c.getContext('2d')!;
      x.filter = 'blur(7px)';
      const pane = (px: number, py: number, w: number, h: number) => { x.fillStyle = 'rgba(255,244,214,1)'; x.fillRect(px, py, w, h); };
      const m = 34, gap = 12, cell = (256 - m * 2 - gap) / 2;
      pane(m, m, cell, cell); pane(m + cell + gap, m, cell, cell);
      pane(m, m + cell + gap, cell, cell); pane(m + cell + gap, m + cell + gap, cell, cell);
      x.filter = 'none';
      const grad = x.createRadialGradient(128, 128, 40, 128, 128, 138);
      grad.addColorStop(0, 'rgba(0,0,0,0)'); grad.addColorStop(1, 'rgba(0,0,0,1)');
      x.globalCompositeOperation = 'destination-out'; x.fillStyle = grad; x.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    };
    const patchTex = floorPatchTexture();

    const beamTexture = () => {
      const c = document.createElement('canvas'); c.width = 128; c.height = 128;
      const x = c.getContext('2d')!;
      const across = x.createLinearGradient(0, 0, 0, 128);
      across.addColorStop(0, 'rgba(255,255,255,0)'); across.addColorStop(0.5, 'rgba(255,255,255,1)'); across.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = across; x.fillRect(0, 0, 128, 128);
      const along = x.createLinearGradient(0, 0, 128, 0);
      along.addColorStop(0, 'rgba(0,0,0,0)'); along.addColorStop(0.15, 'rgba(0,0,0,0)'); along.addColorStop(1, 'rgba(0,0,0,0.85)');
      x.globalCompositeOperation = 'destination-out'; x.fillStyle = along; x.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    };
    const beamTex = beamTexture();

    const dust: Array<{ pts: THREE.Points; mat: THREE.PointsMaterial; base: Float32Array; seed: number[] }> = [];
    const WINDOWS = [
      { wc: new THREE.Vector3(-1.6, 0.92, 0.35), fc: new THREE.Vector3(-0.5, 0.155, 0.55), size: 0.62 },
      { wc: new THREE.Vector3(-1.6, 2.42, -0.2), fc: new THREE.Vector3(-0.5, 1.655, 0.0), size: 0.62 },
    ];
    WINDOWS.forEach(({ wc, fc, size }) => {
      const dir = fc.clone().sub(wc);
      const len = dir.length();
      const mid = new THREE.Vector3().lerpVectors(wc, fc, 0.5);
      const beamGrp = new THREE.Group();
      beamGrp.position.copy(mid);
      beamGrp.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir.clone().normalize());
      shaftGroup.add(beamGrp);
      for (let i = 0; i < 3; i++) {
        const mat = new THREE.MeshBasicMaterial({ map: beamTex, color: '#ffe9bf', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
        shaftMats.push({ mat, base: 0.5 });
        const pl = new THREE.Mesh(new THREE.PlaneGeometry(len * 1.05, size * 1.5), mat);
        pl.rotation.x = (i * Math.PI) / 3;
        beamGrp.add(pl);
      }
      const pMat = new THREE.MeshBasicMaterial({ map: patchTex, color: '#ffefcf', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      shaftMats.push({ mat: pMat, base: 1.0 });
      const patch = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.95), pMat);
      patch.rotation.x = -Math.PI / 2;
      patch.position.set(fc.x, fc.y + 0.012, fc.z);
      shaftGroup.add(patch);
      const N = 90, pos = new Float32Array(N * 3), seed: number[] = [];
      for (let i = 0; i < N; i++) {
        const f = Math.random();
        const p = wc.clone().lerp(fc, f);
        p.x += (Math.random() - 0.5) * size; p.y += (Math.random() - 0.5) * size; p.z += (Math.random() - 0.5) * size * 1.3;
        pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z;
        seed.push(Math.random() * Math.PI * 2);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const dMat = new THREE.PointsMaterial({ color: '#fff2d4', size: 0.015, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
      const pts = new THREE.Points(geo, dMat); shaftGroup.add(pts);
      dust.push({ pts, mat: dMat, base: pos.slice(), seed });
    });

    const spots = ([[2.0, 0.35, 0.14], [3.4, -0.2, 1.64]] as number[][]).map(([sy, z, ty]) => {
      const s = new THREE.SpotLight('#ffe3ae', 0, 7, 0.5, 0.7, 1.2);
      s.position.set(-2.9, sy, z); s.target.position.set(-0.4, ty, z);
      model.add(s); model.add(s.target); return s;
    });

    const LIGHTING = {
      dark: { key: 0.9, keyCol: new THREE.Color('#c9d4f5'), hemi: 0.55, warm: 6, warm2: 5, lamp: 1.25, rim: 0.5, shaft: 0, spot: 0, glass: 0 },
      light: { key: 2.5, keyCol: new THREE.Color('#fff1d0'), hemi: 1.3, warm: 0, warm2: 0, lamp: 0.08, rim: 0.12, shaft: 0.5, spot: 26, glass: 1.3 },
    };

    const pivot = new THREE.Group();
    model.position.y = -1.5;
    pivot.add(model);
    pivot.position.y = 1.45;
    const ground = new THREE.Mesh(new THREE.CircleGeometry(4.2, 48), new THREE.ShadowMaterial({ opacity: 0.22 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -1.5; ground.receiveShadow = true;
    pivot.add(ground);
    scene.add(pivot);

    // ---- hacker code on the monitors ----
    const codeCanvas = document.createElement('canvas'); codeCanvas.width = 256; codeCanvas.height = 192;
    const cctx = codeCanvas.getContext('2d')!;
    const codeTex = new THREE.CanvasTexture(codeCanvas); codeTex.colorSpace = THREE.SRGBColorSpace;
    const SNIP = ['ssh root@10.0.4.', 'inject(payload_0x', '>> decrypt --key=', 'GET /api/v2/token', '[ok] handshake #', 'sudo nmap -sS 192.', 'for(;;){fork(0x', 'AES256::unlock(', '#!/bin/sh -x ', 'trace: 0x7ffe', 'push rax ; mov 0x', 'access GRANTED @'];
    const rows: string[] = [];
    const drawCode = () => {
      rows.push(SNIP[(Math.random() * SNIP.length) | 0] + ((Math.random() * 0xffff) | 0).toString(16));
      if (rows.length > 15) rows.shift();
      cctx.fillStyle = '#02120b'; cctx.fillRect(0, 0, 256, 192);
      cctx.font = '11px monospace';
      rows.forEach((r, i) => {
        cctx.fillStyle = i > rows.length - 3 ? '#5cf5b2' : (i % 4 === 0 ? '#2fbf82' : '#1c7a54');
        cctx.fillText(r, 6, 16 + i * 12);
      });
      if (Math.floor(performance.now() / 400) % 2) { cctx.fillStyle = '#5cf5b2'; cctx.fillRect(6, 8 + rows.length * 12, 7, 10); }
      codeTex.needsUpdate = true;
    };
    drawCode();
    const codeTimer = setInterval(drawCode, 150);
    this.disposers.push(() => clearInterval(codeTimer));
    ['monitor_screen', 'monitor2_screen'].forEach((n) => {
      const m = model.getObjectByName(n) as THREE.Mesh | null;
      if (m) m.material = new THREE.MeshBasicMaterial({ map: codeTex });
    });

    // ---- Doraemon cartoon on the floor-1 TV ----
    const tvCanvas = document.createElement('canvas'); tvCanvas.width = 240; tvCanvas.height = 135;
    const tctx = tvCanvas.getContext('2d')!;
    const tvTex = new THREE.CanvasTexture(tvCanvas); tvTex.colorSpace = THREE.SRGBColorSpace;
    const drawDora = (time: number) => {
      const W = 240, H = 135;
      const sky = tctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#9fdcff'); sky.addColorStop(1, '#e9f7ff');
      tctx.fillStyle = sky; tctx.fillRect(0, 0, W, H);
      tctx.fillStyle = '#8fd18a'; tctx.fillRect(0, H - 26, W, 26);
      tctx.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i = 0; i < 3; i++) {
        const cx = ((time * 12 + i * 90) % (W + 60)) - 30, cy = 22 + i * 8;
        tctx.beginPath(); tctx.arc(cx, cy, 11, 0, 7); tctx.arc(cx + 12, cy + 3, 9, 0, 7); tctx.arc(cx - 12, cy + 3, 9, 0, 7); tctx.fill();
      }
      const bob = Math.sin(time * 2) * 3, cx = W / 2, cy = 90 + bob;
      tctx.fillStyle = '#0f9bd8'; tctx.beginPath(); tctx.arc(cx, cy, 46, 0, 7); tctx.fill();
      tctx.fillStyle = '#f4f9fb'; tctx.beginPath(); tctx.arc(cx, cy + 10, 31, 0, 7); tctx.fill();
      tctx.fillStyle = '#e23b2e'; tctx.fillRect(cx - 40, cy - 26, 80, 8);
      tctx.fillStyle = '#f7d21e'; tctx.beginPath(); tctx.arc(cx, cy - 15, 8, 0, 7); tctx.fill();
      tctx.fillStyle = '#111'; tctx.fillRect(cx - 6, cy - 16, 12, 2); tctx.beginPath(); tctx.arc(cx, cy - 10, 2, 0, 7); tctx.fill();
      tctx.fillStyle = '#fff'; tctx.beginPath(); tctx.ellipse(cx - 11, cy - 40, 9, 12, 0, 0, 7); tctx.ellipse(cx + 11, cy - 40, 9, 12, 0, 0, 7); tctx.fill();
      tctx.fillStyle = '#111'; tctx.beginPath(); tctx.arc(cx - 7, cy - 38, 4, 0, 7); tctx.arc(cx + 7, cy - 38, 4, 0, 7); tctx.fill();
      tctx.fillStyle = '#e23b2e'; tctx.beginPath(); tctx.arc(cx, cy - 30, 6, 0, 7); tctx.fill();
      tctx.strokeStyle = '#c81f14'; tctx.lineWidth = 1.6; tctx.beginPath(); tctx.moveTo(cx, cy - 24); tctx.lineTo(cx, cy - 6); tctx.stroke();
      tctx.strokeStyle = '#333'; tctx.lineWidth = 1.6;
      for (const s of [-1, 1]) for (let w = 0; w < 3; w++) {
        tctx.beginPath(); tctx.moveTo(cx + s * 10, cy - 22 + w * 6); tctx.lineTo(cx + s * 40, cy - 26 + w * 8); tctx.stroke();
      }
      tctx.strokeStyle = '#8a1109'; tctx.lineWidth = 2; tctx.beginPath(); tctx.arc(cx, cy - 6, 14, 0.15 * Math.PI, 0.85 * Math.PI, false); tctx.stroke();
      tvTex.needsUpdate = true;
    };

    // ---- outdoor scenery behind windows ----
    const skyMats: THREE.MeshBasicMaterial[] = [];
    const skyTexture = () => {
      const c = document.createElement('canvas'); c.width = 200; c.height = 200;
      const x = c.getContext('2d')!;
      const sky = x.createLinearGradient(0, 0, 0, 200);
      sky.addColorStop(0, '#7ec4f5'); sky.addColorStop(0.6, '#bfe4fb'); sky.addColorStop(1, '#e6f5e0');
      x.fillStyle = sky; x.fillRect(0, 0, 200, 200);
      x.fillStyle = 'rgba(255,247,214,0.95)'; x.beginPath(); x.arc(150, 48, 26, 0, 7); x.fill();
      x.fillStyle = 'rgba(255,255,255,0.9)';
      ([[55, 60, 20], [90, 52, 15], [40, 66, 14], [120, 80, 16], [150, 88, 12]] as number[][]).forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); });
      x.fillStyle = '#8bc98a'; x.beginPath(); x.moveTo(0, 150); x.quadraticCurveTo(60, 120, 120, 148); x.quadraticCurveTo(170, 165, 200, 140); x.lineTo(200, 200); x.lineTo(0, 200); x.fill();
      x.fillStyle = '#6fb46f'; x.fillRect(0, 168, 200, 32);
      x.fillStyle = '#4f8f57'; [30, 95, 170].forEach((tx2) => { x.beginPath(); x.arc(tx2, 150, 13, 0, 7); x.fill(); x.fillStyle = '#7a5638'; x.fillRect(tx2 - 2, 150, 4, 16); x.fillStyle = '#4f8f57'; });
      return new THREE.CanvasTexture(c);
    };
    const skyTex = skyTexture();
    ([[-1.92, 0.92, 0.35], [-1.92, 2.42, -0.2]] as number[][]).forEach(([x, y, z]) => {
      const mat = new THREE.MeshBasicMaterial({ map: skyTex });
      skyMats.push(mat);
      const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.0), mat);
      pl.position.set(x, y, z); pl.rotation.y = Math.PI / 2; model.add(pl);
    });

    const tvScreen = model.getObjectByName('tv_screen') as THREE.Mesh | null;
    if (tvScreen) tvScreen.material = new THREE.MeshBasicMaterial({ map: tvTex });

    // ---- boy animation ----
    const boy = model.getObjectByName('boy')!;
    const legL = model.getObjectByName('leg_l')!;
    const legR = model.getObjectByName('leg_r')!;
    const armL = model.getObjectByName('arm_l')!;
    const armR = model.getObjectByName('arm_r')!;
    const buildSegs = (route: number[][]) => route.slice(0, -1).map((a, i) => {
      const b = route[i + 1];
      return { a, b, len: Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) };
    });
    const UP = BOY_ROUTE, DOWN = BOY_ROUTE.slice().reverse();
    const segUp = buildSegs(UP), segDown = buildSegs(DOWN);
    const lenUp = segUp.reduce((s, x) => s + x.len, 0);
    const lenDown = segDown.reduce((s, x) => s + x.len, 0);
    const DESK = UP[UP.length - 1], SOFA_STAND = DOWN[DOWN.length - 1];
    const tmp = new THREE.Vector3();
    const ease = (x: number) => x * x * (3 - 2 * x);
    const routePos = (segs: { a: number[]; b: number[]; len: number }[], d: number, out: THREE.Vector3, endPt: number[]) => {
      for (const s of segs) {
        if (d <= s.len) {
          const f = d / s.len;
          out.set(s.a[0] + (s.b[0] - s.a[0]) * f, s.a[1] + (s.b[1] - s.a[1]) * f, s.a[2] + (s.b[2] - s.a[2]) * f);
          return Math.atan2(s.b[0] - s.a[0], s.b[2] - s.a[2]);
        }
        d -= s.len;
      }
      out.set(endPt[0], endPt[1], endPt[2]);
      return 0;
    };
    const turnTo = (yaw: number, k = 0.12) => {
      let dy = yaw - boy.rotation.y;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      boy.rotation.y += dy * k;
    };
    const poseWalk = (t: number) => {
      const ph = t * 7;
      legL.rotation.x = Math.sin(ph) * 0.55; legR.rotation.x = -Math.sin(ph) * 0.55;
      armL.rotation.x = -Math.sin(ph) * 0.4; armR.rotation.x = Math.sin(ph) * 0.4;
      boy.position.y += Math.abs(Math.sin(ph)) * 0.012;
    };
    const sitPose = (fromPt: number[], sit: { pos: number[]; yaw: number }, f: number) => {
      const e = ease(f);
      boy.position.set(fromPt[0] + (sit.pos[0] - fromPt[0]) * e, fromPt[1] + (sit.pos[1] - fromPt[1]) * e, fromPt[2] + (sit.pos[2] - fromPt[2]) * e);
      turnTo(sit.yaw, 0.15);
      legL.rotation.x = 1.15 * e; legR.rotation.x = 1.15 * e;
      armL.rotation.x = 0.95 * e; armR.rotation.x = 0.95 * e;
    };
    const SPEED = 0.5;
    const P = [
      { d: lenUp / SPEED, kind: 'walkUp' },
      { d: 0.8, kind: 'sit', from: DESK, sit: BOY_SIT },
      { d: 6.5, kind: 'code' },
      { d: 0.8, kind: 'stand', from: DESK, sit: BOY_SIT },
      { d: lenDown / SPEED, kind: 'walkDown' },
      { d: 0.8, kind: 'sit', from: SOFA_STAND, sit: BOY_SIT_SOFA },
      { d: 6.5, kind: 'watch' },
      { d: 0.8, kind: 'stand', from: SOFA_STAND, sit: BOY_SIT_SOFA },
    ] as Array<{ d: number; kind: string; from?: number[]; sit?: { pos: number[]; yaw: number } }>;
    const T_CYCLE = P.reduce((s, p) => s + p.d, 0);
    const walkBoy = (t: number) => {
      let u = t % T_CYCLE;
      let ph = P[0];
      for (const p of P) { if (u < p.d) { ph = p; break; } u -= p.d; }
      if (ph.kind === 'walkUp') {
        const yaw = routePos(segUp, u * SPEED, tmp, DESK); boy.position.copy(tmp); turnTo(yaw); poseWalk(t);
      } else if (ph.kind === 'walkDown') {
        const yaw = routePos(segDown, u * SPEED, tmp, SOFA_STAND); boy.position.copy(tmp); turnTo(yaw); poseWalk(t);
      } else if (ph.kind === 'sit') {
        sitPose(ph.from!, ph.sit!, u / ph.d);
      } else if (ph.kind === 'stand') {
        sitPose(ph.from!, ph.sit!, 1 - u / ph.d);
      } else if (ph.kind === 'code') {
        sitPose(DESK, BOY_SIT, 1);
        const w = t * 11;
        armL.rotation.x = 0.95 + Math.sin(w) * 0.09; armR.rotation.x = 0.95 + Math.sin(w + 2.2) * 0.09;
      } else {
        sitPose(SOFA_STAND, BOY_SIT_SOFA, 1);
        armL.rotation.x = 0.55; armR.rotation.x = 0.55;
      }
    };

    // ---- camera + interaction ----
    const camLook = new THREE.Vector3(-1.7, 1.5, 0);
    this.setView((document.body.dataset['tab'] as Tab) || 'home');

    let tx = 0, ty = 0;
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointer);
    this.disposers.push(() => window.removeEventListener('pointermove', onPointer));

    const onResize = () => this.setView((document.body.dataset['tab'] as Tab) || 'home');
    window.addEventListener('resize', onResize);
    this.disposers.push(() => window.removeEventListener('resize', onResize));

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    this.ro = new ResizeObserver(resize);
    this.ro.observe(host);
    resize();

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const t = clock.getElapsedTime();
      const isLight = document.documentElement.dataset['theme'] === 'light';
      const L = isLight ? LIGHTING.light : LIGHTING.dark;
      const k = 0.04;
      key.intensity += (L.key - key.intensity) * k;
      key.color.lerp(L.keyCol, k);
      hemi.intensity += (L.hemi - hemi.intensity) * k;
      warm1.intensity += (L.warm - warm1.intensity) * k;
      warm2.intensity += (L.warm2 - warm2.intensity) * k;
      rim.intensity += (L.rim - rim.intensity) * k;
      if (lampMat) lampMat.emissiveIntensity += (L.lamp - lampMat.emissiveIntensity) * k;
      if (glassMat) glassMat.emissiveIntensity += (L.glass - glassMat.emissiveIntensity) * k;
      shaftMats.forEach((s) => (s.mat.opacity += (L.shaft * s.base - s.mat.opacity) * k));
      dust.forEach((d) => {
        d.mat.opacity += (L.shaft * 2.2 - d.mat.opacity) * k;
        const p = d.pts.geometry.attributes['position'].array as Float32Array;
        for (let i = 0; i < d.seed.length; i++) {
          p[i * 3] = d.base[i * 3] + Math.sin(t * 0.3 + d.seed[i]) * 0.04;
          p[i * 3 + 1] = d.base[i * 3 + 1] + Math.sin(t * 0.22 + d.seed[i] * 1.7) * 0.05;
          p[i * 3 + 2] = d.base[i * 3 + 2] + Math.cos(t * 0.27 + d.seed[i]) * 0.04;
        }
        d.pts.geometry.attributes['position'].needsUpdate = true;
      });
      spots.forEach((s) => (s.intensity += (L.spot - s.intensity) * k));
      drawDora(t);
      const skyTint = isLight ? 1 : 0.32;
      skyMats.forEach((m) => m.color.lerp(new THREE.Color(skyTint, skyTint, skyTint * 1.1), k));
      if (screenMat) screenMat.emissiveIntensity += ((L.warm ? 0.85 : 0.45) - screenMat.emissiveIntensity) * k;
      const ck = 0.05;
      camera.position.lerp(new THREE.Vector3(this.view.cam[0], this.view.cam[1], this.view.cam[2]), ck);
      camLook.lerp(new THREE.Vector3(this.view.look[0], this.view.look[1], this.view.look[2]), ck);
      camera.lookAt(camLook);
      pivot.scale.setScalar(pivot.scale.x + (this.view.scale - pivot.scale.x) * ck);
      pivot.position.x += (this.view.ox - pivot.position.x) * ck;
      pivot.position.y += (1.45 + this.view.oy - pivot.position.y) * ck;
      const targetY = this.view.yaw + tx * 0.5, targetX = 0.06 + ty * 0.13;
      pivot.rotation.y += (targetY - pivot.rotation.y) * 0.06;
      pivot.rotation.x += (targetX - pivot.rotation.x) * 0.06;
      walkBoy(t);
      renderer.render(scene, camera);
    });
    this.disposers.push(() => renderer.setAnimationLoop(null));
  }

  /** Switch the camera framing per route; shrinks + centers the house on small screens. */
  setView(tab: Tab): void {
    const v = this.VIEWS[tab] ?? this.VIEWS.home;
    this.view = { cam: [...v.cam], look: [...v.look], yaw: v.yaw, scale: v.scale, ox: v.ox, oy: v.oy };
    const w = window.innerWidth;
    if (w <= 1024) {
      const tight = w <= 560;
      this.view.look[0] = 0; this.view.ox = 0;
      this.view.cam = [0, tight ? 2.3 : 2.2, tight ? 9.5 : 8.2];
      this.view.scale = tight ? 0.78 : 0.9;
      this.view.yaw = -0.15;
    }
  }

  dispose(): void {
    this.disposers.forEach((d) => d());
    this.disposers = [];
    this.ro?.disconnect();
    if (this.renderer) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
      this.renderer = undefined;
    }
  }
}
