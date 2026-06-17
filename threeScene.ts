import * as THREE from "three";

type SceneHandle = {
  setIntensity: (value: number) => void;
  destroy: () => void;
};

export function bootNeuralGrid(canvas: HTMLCanvasElement): SceneHandle {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x03050d, 0.055);

  const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 120);
  camera.position.set(0, 4.2, 13);

  const group = new THREE.Group();
  scene.add(group);

  const grid = new THREE.GridHelper(42, 42, 0x00f5ff, 0x242b68);
  grid.position.y = -2.6;
  group.add(grid);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.75, 0.28, 180, 18, 2, 5),
    new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x1222ff,
      metalness: 0.72,
      roughness: 0.18
    })
  );
  knot.position.set(0, 0.25, 0);
  group.add(knot);

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xff2bd6,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide
  });

  for (let i = 0; i < 4; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.2 + i * 1.15, 0.012, 8, 160), ringMaterial.clone());
    ring.rotation.x = Math.PI / 2 + i * 0.32;
    ring.rotation.y = i * 0.22;
    group.add(ring);
  }

  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 680;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const palette = [new THREE.Color("#00f5ff"), new THREE.Color("#ff2bd6"), new THREE.Color("#f8ff6a")];

  for (let i = 0; i < particleCount; i += 1) {
    const radius = 5 + Math.random() * 22;
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = -3 + Math.random() * 12;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
    const color = palette[i % palette.length];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.82
    })
  );
  scene.add(particles);

  const lightA = new THREE.PointLight(0x00f5ff, 46, 32);
  lightA.position.set(-6, 5, 6);
  scene.add(lightA);

  const lightB = new THREE.PointLight(0xff2bd6, 34, 28);
  lightB.position.set(5, 2, 6);
  scene.add(lightB);

  scene.add(new THREE.AmbientLight(0xffffff, 0.42));

  let intensity = 1;
  let frame = 0;
  let animationId = 0;

  function resize() {
    const { innerWidth, innerHeight } = window;
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }

  function animate() {
    frame += 0.01 * intensity;
    knot.rotation.x += 0.007 * intensity;
    knot.rotation.y += 0.012 * intensity;
    group.rotation.y = Math.sin(frame * 0.7) * 0.12;
    particles.rotation.y -= 0.0018 * intensity;
    particles.rotation.x = Math.sin(frame * 0.45) * 0.02;
    camera.position.x = Math.sin(frame * 0.3) * 0.45;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    animationId = window.requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener("resize", resize);

  return {
    setIntensity(value: number) {
      intensity = value;
    },
    destroy() {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      particleGeometry.dispose();
    }
  };
}
