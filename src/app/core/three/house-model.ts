import * as THREE from 'three';

/**
 * Two-story cutaway house — soft rounded furniture + organic boy character.
 * Units: meters, y-up, base at y=0, centered on origin. Open front (+z).
 * Direct TS port of the HTML prototype's model.js.
 */
export function buildModel(): THREE.Group {
  const g = new THREE.Group();
  g.name = 'house';

  const M = {
    wall: new THREE.MeshStandardMaterial({ name: 'wall', color: '#ece7db', roughness: 0.9 }),
    wall2: new THREE.MeshStandardMaterial({ name: 'wall_accent', color: '#c9d6cd', roughness: 0.9 }),
    wood: new THREE.MeshStandardMaterial({ name: 'wood', color: '#b58a5f', roughness: 0.65 }),
    woodDk: new THREE.MeshStandardMaterial({ name: 'wood_dark', color: '#8a6544', roughness: 0.7 }),
    dark: new THREE.MeshStandardMaterial({ name: 'dark', color: '#2a2f36', roughness: 0.55 }),
    metal: new THREE.MeshStandardMaterial({ name: 'metal', color: '#9aa3ad', metalness: 0.35, roughness: 0.3 }),
    mint: new THREE.MeshStandardMaterial({ name: 'mint', color: '#3ddc97', roughness: 0.55 }),
    screen: new THREE.MeshStandardMaterial({ name: 'screen', color: '#10241c', emissive: new THREE.Color('#2fbf82'), emissiveIntensity: 0.85, roughness: 0.35 }),
    glass: new THREE.MeshStandardMaterial({ name: 'glass', color: '#bfe4f0', metalness: 0.1, roughness: 0.05, transparent: true, opacity: 0.28 }),
    fabric: new THREE.MeshStandardMaterial({ name: 'fabric', color: '#5b7fa6', roughness: 0.9 }),
    curtain: new THREE.MeshStandardMaterial({ name: 'curtain', color: '#d8b98a', roughness: 0.95 }),
    white: new THREE.MeshStandardMaterial({ name: 'white', color: '#f2f0ea', roughness: 0.8 }),
    leaf: new THREE.MeshStandardMaterial({ name: 'leaf', color: '#3f9d5f', roughness: 0.8 }),
    coral: new THREE.MeshStandardMaterial({ name: 'coral', color: '#e2634f', roughness: 0.7 }),
    lamp: new THREE.MeshStandardMaterial({ name: 'lamp_glow', color: '#ffe9c4', emissive: new THREE.Color('#ffb85c'), emissiveIntensity: 1.1, roughness: 0.5 }),
    skin: new THREE.MeshStandardMaterial({ name: 'skin', color: '#e8b48f', roughness: 0.7 }),
    hair: new THREE.MeshStandardMaterial({ name: 'hair', color: '#3b2d23', roughness: 0.85 }),
  };

  const box = (name: string, mat: THREE.Material, w: number, h: number, d: number, x: number, y: number, z: number, parent: THREE.Object3D = g, ry = 0): THREE.Mesh => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.name = name; m.position.set(x, y, z); m.rotation.y = ry; parent.add(m); return m;
  };
  const rboxGeo = (w: number, h: number, d: number, r: number): THREE.ExtrudeGeometry => {
    r = Math.min(r, w / 4.5, h / 4.5, d / 4.5);
    const a = w / 2 - r, b = h / 2 - r, c = Math.min(r, a - 0.001, b - 0.001);
    const s = new THREE.Shape();
    s.absarc(a - c, b - c, c, 0, Math.PI / 2, false);
    s.absarc(-(a - c), b - c, c, Math.PI / 2, Math.PI, false);
    s.absarc(-(a - c), -(b - c), c, Math.PI, Math.PI * 1.5, false);
    s.absarc(a - c, -(b - c), c, Math.PI * 1.5, Math.PI * 2, false);
    const geo = new THREE.ExtrudeGeometry(s, { depth: d - 2 * r, bevelEnabled: true, bevelThickness: r, bevelSize: r, bevelSegments: 4, curveSegments: 6 });
    geo.center();
    return geo;
  };
  const rbox = (name: string, mat: THREE.Material, w: number, h: number, d: number, r: number, x: number, y: number, z: number, parent: THREE.Object3D = g, ry = 0): THREE.Mesh => {
    const m = new THREE.Mesh(rboxGeo(w, h, d, r), mat);
    m.name = name; m.position.set(x, y, z); m.rotation.y = ry; parent.add(m); return m;
  };
  const cyl = (name: string, mat: THREE.Material, rT: number, rB: number, h: number, x: number, y: number, z: number, parent: THREE.Object3D = g, seg = 28): THREE.Mesh => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rT, rB, h, seg), mat);
    m.name = name; m.position.set(x, y, z); parent.add(m); return m;
  };
  const sph = (name: string, mat: THREE.Material, r: number, x: number, y: number, z: number, parent: THREE.Object3D = g, sx = 1, sy = 1, sz = 1): THREE.Mesh => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 18), mat);
    m.name = name; m.position.set(x, y, z); m.scale.set(sx, sy, sz); parent.add(m); return m;
  };

  // ===== shell =====
  rbox('foundation', M.dark, 3.9, 0.08, 2.9, 0.02, 0, 0.04, 0);
  box('ground_floor', M.wood, 3.8, 0.06, 2.8, 0, 0.11, 0);
  box('wall_back_f1', M.wall, 3.6, 1.4, 0.08, 0, 0.84, -1.26);
  box('wall_left_f1', M.wall, 0.08, 1.4, 2.6, -1.76, 0.84, 0);
  box('wall_right_f1', M.wall, 0.08, 1.4, 2.6, 1.76, 0.84, 0);
  box('baseboard_f1', M.white, 3.44, 0.09, 0.02, 0, 0.185, -1.21);
  box('slab_f2_main', M.woodDk, 3.58, 0.1, 2.0, 0, 1.59, 0.3);
  box('slab_f2_back', M.woodDk, 2.19, 0.1, 0.6, -0.695, 1.59, -1.0);
  box('slab_trim', M.white, 3.62, 0.04, 2.04, 0, 1.56, 0.3);
  box('wall_back_f2', M.wall2, 3.6, 1.4, 0.08, 0, 2.34, -1.26);
  box('wall_left_f2', M.wall, 0.08, 1.4, 2.6, -1.76, 2.34, 0);
  box('wall_right_f2', M.wall, 0.08, 1.4, 2.6, 1.76, 2.34, 0);
  rbox('roof', M.white, 4.0, 0.14, 3.0, 0.04, 0, 3.11, 0);
  rbox('roof_fascia', M.woodDk, 4.04, 0.06, 3.04, 0.02, 0, 3.06, 0);

  const win = (id: string, x: number, y: number, z: number, ry: number) => {
    const w = new THREE.Group(); w.name = id; w.position.set(x, y, z); w.rotation.y = ry; g.add(w);
    rbox(id + '_frame', M.white, 0.74, 0.64, 0.06, 0.015, 0, 0, 0, w);
    box(id + '_glass', M.glass, 0.62, 0.52, 0.02, 0, 0, 0.015, w);
    box(id + '_mullion_v', M.white, 0.025, 0.52, 0.02, 0, 0, 0.026, w);
    box(id + '_mullion_h', M.white, 0.62, 0.025, 0.02, 0, 0, 0.026, w);
    rbox(id + '_curtain_l', M.curtain, 0.18, 0.9, 0.06, 0.025, -0.42, -0.08, 0.06, w);
    rbox(id + '_curtain_r', M.curtain, 0.18, 0.9, 0.06, 0.025, 0.42, -0.08, 0.06, w);
    cyl(id + '_rod', M.metal, 0.012, 0.012, 1.0, 0, 0.4, 0.06, w, 10).rotation.z = Math.PI / 2;
  };
  win('window_f1', -1.73, 0.92, 0.35, Math.PI / 2);
  win('window_f2', -1.73, 2.42, -0.2, Math.PI / 2);

  // ===== stairs + railing =====
  const stairs = new THREE.Group(); stairs.name = 'stairs'; g.add(stairs);
  for (let i = 0; i < 10; i++) {
    const h = (i + 1) * 0.146;
    box(`step_${i}`, M.wood, 0.11, h, 0.45, 0.555 + i * 0.11, 0.14 + h / 2, -0.955, stairs);
    rbox(`step_nose_${i}`, M.woodDk, 0.115, 0.03, 0.46, 0.012, 0.555 + i * 0.11, 0.14 + h - 0.012, -0.955, stairs);
  }
  const rail = new THREE.Group(); rail.name = 'stair_rail'; g.add(rail);
  [0, 3, 6, 9].forEach((i) => {
    const topY = 0.14 + (i + 1) * 0.146;
    cyl(`rail_post_${i}`, M.dark, 0.014, 0.014, 0.62, 0.555 + i * 0.11, topY + 0.31, -0.72, rail, 12);
  });
  const hr = rbox('handrail', M.wood, 1.32, 0.05, 0.055, 0.02, 1.05, 1.62, -0.72, rail);
  hr.rotation.z = Math.atan2(1.31, 0.99);
  rbox('guard_top', M.wood, 1.36, 0.055, 0.05, 0.02, 1.08, 2.5, -0.7);
  [0.45, 0.85, 1.25, 1.65].forEach((x, i) =>
    cyl(`guard_post_${i}`, M.dark, 0.013, 0.013, 0.86, x, 2.07, -0.7, g, 12));

  // ===== floor 1 — living room =====
  const F1 = 0.14;
  cyl('rug_f1', M.mint, 0.72, 0.72, 0.015, -0.6, F1 + 0.008, -0.02, g, 44).scale.z = 0.72;
  const sofa = new THREE.Group(); sofa.name = 'sofa'; sofa.position.set(-0.6, F1, 0.78); g.add(sofa);
  rbox('sofa_base', M.fabric, 1.34, 0.28, 0.6, 0.07, 0, 0.22, 0, sofa);
  rbox('sofa_back', M.fabric, 1.34, 0.46, 0.18, 0.07, 0, 0.5, 0.245, sofa);
  rbox('sofa_arm_l', M.fabric, 0.17, 0.28, 0.6, 0.07, -0.6, 0.46, 0, sofa);
  rbox('sofa_arm_r', M.fabric, 0.17, 0.28, 0.6, 0.07, 0.6, 0.46, 0, sofa);
  rbox('sofa_seat_1', M.white, 0.54, 0.12, 0.48, 0.05, -0.28, 0.4, -0.04, sofa);
  rbox('sofa_seat_2', M.white, 0.54, 0.12, 0.48, 0.05, 0.28, 0.4, -0.04, sofa);
  const p1 = rbox('sofa_pillow_1', M.mint, 0.28, 0.28, 0.11, 0.05, -0.4, 0.58, 0.13, sofa); p1.rotation.z = 0.15;
  const p2 = rbox('sofa_pillow_2', M.coral, 0.28, 0.28, 0.11, 0.05, 0.42, 0.58, 0.13, sofa); p2.rotation.z = -0.1;
  cyl('leg_sofa_1', M.woodDk, 0.02, 0.015, 0.09, -0.55, 0.045, 0.2, sofa, 12);
  cyl('leg_sofa_2', M.woodDk, 0.02, 0.015, 0.09, 0.55, 0.045, 0.2, sofa, 12);
  const table = new THREE.Group(); table.name = 'coffee_table'; table.position.set(-0.6, F1, -0.05); g.add(table);
  cyl('table_top', M.wood, 0.32, 0.32, 0.045, 0, 0.36, 0, table, 40);
  cyl('table_stem', M.dark, 0.03, 0.05, 0.32, 0, 0.18, 0, table, 16);
  cyl('table_foot', M.dark, 0.16, 0.18, 0.025, 0, 0.02, 0, table, 24);
  rbox('table_book_1', M.coral, 0.2, 0.03, 0.14, 0.008, -0.08, 0.395, 0.02, table, 0.3);
  rbox('table_book_2', M.fabric, 0.17, 0.025, 0.12, 0.008, -0.06, 0.42, 0.03, table, 0.1);
  cyl('table_mug', M.white, 0.03, 0.026, 0.07, 0.14, 0.415, -0.06, table, 16);
  rbox('tv_panel', M.dark, 1.04, 0.58, 0.05, 0.015, -0.6, 1.0, -1.2);
  box('tv_screen', M.screen, 0.96, 0.5, 0.012, -0.6, 1.0, -1.172);
  rbox('tv_soundbar', M.dark, 0.8, 0.055, 0.07, 0.02, -0.6, 0.66, -1.16);
  const cons = new THREE.Group(); cons.name = 'tv_console'; cons.position.set(-0.6, F1, -1.05); g.add(cons);
  rbox('console_body', M.wood, 1.3, 0.3, 0.35, 0.035, 0, 0.21, 0, cons);
  rbox('console_door_l', M.woodDk, 0.54, 0.2, 0.02, 0.008, -0.32, 0.21, 0.18, cons);
  rbox('console_door_r', M.woodDk, 0.54, 0.2, 0.02, 0.008, 0.32, 0.21, 0.18, cons);
  cyl('console_leg_1', M.dark, 0.015, 0.012, 0.12, -0.58, 0.06, 0.12, cons, 10);
  cyl('console_leg_2', M.dark, 0.015, 0.012, 0.12, 0.58, 0.06, 0.12, cons, 10);
  cyl('console_vase', M.mint, 0.04, 0.03, 0.12, 0.45, 0.42, 0, cons, 16);
  const plant = new THREE.Group(); plant.name = 'plant'; plant.position.set(-1.5, F1, -1.0); g.add(plant);
  cyl('plant_pot', M.coral, 0.14, 0.1, 0.24, 0, 0.12, 0, plant);
  cyl('plant_trunk', M.woodDk, 0.02, 0.025, 0.25, 0, 0.32, 0, plant, 10);
  ([[0, 0.58, 0, 0.2], [-0.13, 0.48, 0.05, 0.13], [0.12, 0.5, -0.06, 0.14], [0.02, 0.47, 0.13, 0.11]] as number[][]).forEach((s, i) =>
    sph(`plant_leaf_${i}`, M.leaf, s[3], s[0], s[1], s[2], plant, 1, 1.2, 1));
  const flamp = new THREE.Group(); flamp.name = 'floor_lamp'; flamp.position.set(-1.5, F1, 0.95); g.add(flamp);
  cyl('flamp_base', M.dark, 0.11, 0.13, 0.025, 0, 0.012, 0, flamp);
  cyl('flamp_pole', M.metal, 0.012, 0.012, 1.05, 0, 0.55, 0, flamp, 10);
  cyl('flamp_shade', M.curtain, 0.1, 0.15, 0.2, 0, 1.12, 0, flamp);
  sph('flamp_bulb', M.lamp, 0.045, 0, 1.06, 0, flamp);
  rbox('art_frame_f1', M.woodDk, 0.3, 0.4, 0.03, 0.008, 0.15, 1.02, -1.2);
  box('art_canvas_f1', M.mint, 0.24, 0.34, 0.012, 0.15, 1.02, -1.182);
  cyl('pendant_cord_f1', M.dark, 0.005, 0.005, 0.24, -0.6, 1.42, -0.05, g, 8);
  cyl('pendant_shade_f1', M.dark, 0.05, 0.14, 0.12, -0.6, 1.26, -0.05, g);
  sph('pendant_bulb_f1', M.lamp, 0.04, -0.6, 1.23, -0.05);

  // ===== floor 2 — bedroom + PC setup =====
  const F2 = 1.64;
  const bed = new THREE.Group(); bed.name = 'bed'; bed.position.set(-1.26, F2, -0.5); g.add(bed);
  rbox('bed_frame', M.wood, 0.92, 0.15, 1.58, 0.03, 0, 0.1, 0, bed);
  rbox('bed_headboard', M.wood, 0.92, 0.44, 0.07, 0.025, 0, 0.3, -0.76, bed);
  rbox('bed_mattress', M.white, 0.84, 0.15, 1.42, 0.05, 0, 0.24, 0.02, bed);
  rbox('bed_pillow', M.white, 0.52, 0.12, 0.3, 0.05, 0, 0.36, -0.56, bed);
  const bp2 = rbox('bed_pillow_2', M.mint, 0.3, 0.1, 0.22, 0.04, 0.1, 0.42, -0.5, bed); bp2.rotation.z = 0.12;
  rbox('bed_blanket', M.mint, 0.88, 0.08, 0.88, 0.03, 0, 0.32, 0.3, bed);
  rbox('bed_blanket_fold', M.white, 0.88, 0.04, 0.2, 0.015, 0, 0.36, -0.05, bed);
  cyl('bed_leg_1', M.woodDk, 0.02, 0.016, 0.06, 0.4, 0.03, 0.72, bed, 10);
  cyl('bed_leg_2', M.woodDk, 0.02, 0.016, 0.06, 0.4, 0.03, -0.72, bed, 10);
  const bside = new THREE.Group(); bside.name = 'bedside'; bside.position.set(-1.5, F2, 0.55); g.add(bside);
  rbox('bside_body', M.wood, 0.32, 0.3, 0.32, 0.03, 0, 0.19, 0, bside);
  rbox('bside_drawer', M.woodDk, 0.24, 0.07, 0.02, 0.008, 0, 0.24, 0.17, bside);
  cyl('bside_lamp_base', M.dark, 0.05, 0.06, 0.02, 0, 0.35, 0, bside, 16);
  cyl('bside_lamp_pole', M.metal, 0.008, 0.008, 0.12, 0, 0.42, 0, bside, 8);
  cyl('bside_lamp_shade', M.curtain, 0.05, 0.075, 0.09, 0, 0.51, 0, bside);
  const desk = new THREE.Group(); desk.name = 'desk'; desk.position.set(0.35, F2, -0.98); g.add(desk);
  rbox('desk_top', M.wood, 1.1, 0.05, 0.48, 0.015, 0, 0.72, 0, desk);
  rbox('desk_leg_l', M.dark, 0.05, 0.7, 0.42, 0.015, -0.5, 0.35, 0, desk);
  rbox('desk_leg_r', M.dark, 0.05, 0.7, 0.42, 0.015, 0.5, 0.35, 0, desk);
  rbox('desk_drawer', M.woodDk, 0.3, 0.12, 0.4, 0.02, 0.34, 0.6, 0, desk);
  cyl('monitor_stand', M.metal, 0.03, 0.05, 0.13, -0.16, 0.8, -0.1, desk, 14);
  const mp = rbox('monitor_panel', M.dark, 0.5, 0.3, 0.035, 0.01, -0.16, 1.02, -0.12, desk); mp.rotation.y = 0.12;
  const ms = box('monitor_screen', M.screen, 0.46, 0.26, 0.012, -0.16, 1.02, -0.098, desk); ms.rotation.y = 0.12;
  cyl('monitor2_stand', M.metal, 0.025, 0.045, 0.11, 0.28, 0.79, -0.1, desk, 14);
  const mp2 = rbox('monitor2_panel', M.dark, 0.3, 0.4, 0.035, 0.01, 0.28, 1.04, -0.12, desk); mp2.rotation.y = -0.15;
  const ms2 = box('monitor2_screen', M.screen, 0.26, 0.36, 0.012, 0.28, 1.04, -0.098, desk); ms2.rotation.y = -0.15;
  rbox('mousepad', M.dark, 0.5, 0.01, 0.22, 0.004, -0.05, 0.748, 0.1, desk);
  rbox('keyboard', M.metal, 0.32, 0.022, 0.11, 0.008, -0.12, 0.757, 0.09, desk);
  sph('mouse', M.dark, 0.03, 0.14, 0.76, 0.1, desk, 1, 0.7, 1.4);
  cyl('desk_lamp_arm', M.metal, 0.008, 0.008, 0.3, -0.46, 0.9, -0.12, desk, 8);
  cyl('desk_lamp_head', M.dark, 0.03, 0.05, 0.08, -0.46, 1.06, -0.1, desk);
  const pc = new THREE.Group(); pc.name = 'pc_tower'; pc.position.set(0.78, F2, -1.0); g.add(pc);
  rbox('pc_case', M.dark, 0.22, 0.46, 0.42, 0.02, 0, 0.23, 0, pc);
  box('pc_glass', M.glass, 0.005, 0.38, 0.34, 0.115, 0.24, 0, pc);
  box('pc_led_1', M.mint, 0.02, 0.02, 0.34, 0.1, 0.42, 0, pc);
  cyl('pc_fan_1', M.mint, 0.05, 0.05, 0.015, 0.1, 0.32, -0.1, pc, 20).rotation.z = Math.PI / 2;
  cyl('pc_fan_2', M.mint, 0.05, 0.05, 0.015, 0.1, 0.18, -0.1, pc, 20).rotation.z = Math.PI / 2;
  const chair = new THREE.Group(); chair.name = 'chair'; chair.position.set(0.22, F2, -0.42); g.add(chair);
  cyl('chair_base', M.dark, 0.19, 0.21, 0.03, 0, 0.02, 0, chair, 24);
  cyl('chair_post', M.metal, 0.022, 0.022, 0.3, 0, 0.18, 0, chair, 12);
  rbox('chair_seat', M.coral, 0.38, 0.09, 0.38, 0.035, 0, 0.36, 0, chair);
  const cb = rbox('chair_back', M.coral, 0.36, 0.48, 0.08, 0.035, 0, 0.63, 0.19, chair); cb.rotation.x = -0.12;
  rbox('chair_head', M.dark, 0.2, 0.09, 0.06, 0.025, 0, 0.87, 0.215, chair);
  rbox('chair_arm_l', M.dark, 0.045, 0.18, 0.2, 0.018, -0.2, 0.42, 0.02, chair);
  rbox('chair_arm_r', M.dark, 0.045, 0.18, 0.2, 0.018, 0.2, 0.42, 0.02, chair);
  cyl('rug_f2', M.fabric, 0.5, 0.5, 0.014, -0.25, F2 + 0.007, 0.4, g, 40).scale.z = 0.7;
  rbox('shelf', M.wood, 0.75, 0.045, 0.22, 0.012, 1.25, F2 + 1.0, -1.12);
  box('shelf_bracket_l', M.dark, 0.03, 0.12, 0.18, 1.0, F2 + 0.93, -1.13);
  box('shelf_bracket_r', M.dark, 0.03, 0.12, 0.18, 1.5, F2 + 0.93, -1.13);
  ([[M.coral, 0.08, 0.22, 1.06], [M.fabric, 0.06, 0.19, 1.14], [M.mint, 0.07, 0.24, 1.21], [M.white, 0.05, 0.17, 1.28]] as [THREE.Material, number, number, number][]).forEach((b, i) =>
    rbox(`shelf_book_${i}`, b[0], b[1], b[2], 0.15, 0.01, b[3], F2 + 1.02 + b[2] / 2, -1.12));
  rbox('poster_frame_1', M.dark, 0.34, 0.46, 0.025, 0.006, -0.7, F2 + 0.95, -1.2);
  box('poster_1', M.coral, 0.28, 0.4, 0.012, -0.7, F2 + 0.95, -1.185);
  rbox('poster_frame_2', M.dark, 0.46, 0.32, 0.025, 0.006, -0.15, F2 + 1.0, -1.2);
  box('poster_2', M.fabric, 0.4, 0.26, 0.012, -0.15, F2 + 1.0, -1.185);
  cyl('pendant_cord_f2', M.dark, 0.005, 0.005, 0.22, -0.4, 2.9, 0.1, g, 8);
  cyl('pendant_shade_f2', M.white, 0.04, 0.12, 0.11, -0.4, 2.75, 0.1, g);
  sph('pendant_bulb_f2', M.lamp, 0.035, -0.4, 2.72, 0.1);

  // ===== boy character =====
  const boy = new THREE.Group(); boy.name = 'boy';
  boy.position.set(-0.2, F1, 0.2);
  const cap = (name: string, mat: THREE.Material, r: number, len: number, x: number, y: number, z: number, parent: THREE.Object3D): THREE.Mesh => {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 8, 20), mat);
    m.name = name; m.position.set(x, y, z); parent.add(m); return m;
  };
  const legL = new THREE.Group(); legL.name = 'leg_l'; legL.position.set(-0.052, 0.36, 0); boy.add(legL);
  cap('leg_l_mesh', M.fabric, 0.042, 0.2, 0, -0.14, 0, legL);
  sph('shoe_l', M.white, 0.05, 0, -0.31, 0.018, legL, 0.9, 0.62, 1.5);
  const legR = new THREE.Group(); legR.name = 'leg_r'; legR.position.set(0.052, 0.36, 0); boy.add(legR);
  cap('leg_r_mesh', M.fabric, 0.042, 0.2, 0, -0.14, 0, legR);
  sph('shoe_r', M.white, 0.05, 0, -0.31, 0.018, legR, 0.9, 0.62, 1.5);
  const torso = cap('torso', M.coral, 0.115, 0.15, 0, 0.5, 0, boy);
  torso.scale.set(1, 1, 0.72);
  sph('collar', M.white, 0.06, 0, 0.63, 0.02, boy, 1.5, 0.5, 1.1);
  const armL = new THREE.Group(); armL.name = 'arm_l'; armL.position.set(-0.132, 0.6, 0); boy.add(armL);
  cap('arm_l_mesh', M.coral, 0.03, 0.13, 0, -0.09, 0, armL);
  sph('hand_l', M.skin, 0.034, 0, -0.185, 0, armL);
  const armR = new THREE.Group(); armR.name = 'arm_r'; armR.position.set(0.132, 0.6, 0); boy.add(armR);
  cap('arm_r_mesh', M.coral, 0.03, 0.13, 0, -0.09, 0, armR);
  sph('hand_r', M.skin, 0.034, 0, -0.185, 0, armR);
  cyl('neck', M.skin, 0.03, 0.032, 0.05, 0, 0.665, 0, boy, 14);
  sph('head', M.skin, 0.1, 0, 0.78, 0, boy, 0.95, 1.05, 0.95);
  sph('ear_l', M.skin, 0.02, -0.093, 0.78, 0, boy);
  sph('ear_r', M.skin, 0.02, 0.093, 0.78, 0, boy);
  sph('nose', M.skin, 0.016, 0, 0.765, 0.095, boy);
  sph('eye_l', M.dark, 0.012, -0.036, 0.795, 0.085, boy);
  sph('eye_r', M.dark, 0.012, 0.036, 0.795, 0.085, boy);
  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.106, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.58), M.hair);
  hairCap.name = 'hair_cap'; hairCap.position.y = 0.79; hairCap.scale.set(0.96, 1.05, 0.96); boy.add(hairCap);
  sph('hair_back', M.hair, 0.09, 0, 0.79, -0.045, boy, 1, 1, 0.9);
  sph('hair_fringe', M.hair, 0.05, 0, 0.855, 0.07, boy, 1.6, 0.5, 0.9);
  g.add(boy);

  return g;
}

// Walk route (living room sofa -> stairs -> desk). Boy codes upstairs, then
// walks back down to the sofa to watch TV, then loops.
export const BOY_ROUTE: number[][] = [
  [-0.55, 0.14, 0.34],
  [0.1, 0.14, -0.35],
  [0.45, 0.14, -0.95],
  [1.62, 1.64, -0.95],
  [1.1, 1.64, 0.15],
  [0.5, 1.64, 0.02],
];
export const BOY_SIT = { pos: [0.22, 1.7, -0.42], yaw: Math.PI };
export const BOY_SIT_SOFA = { pos: [-0.5, 0.28, 0.7], yaw: Math.PI };
