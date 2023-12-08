import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import './style.css';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 0, 300);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xefefef);

const light = new THREE.DirectionalLight();
light.position.set(0, 500, 500);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const steps: { obj: THREE.Group; mixer: THREE.AnimationMixer; duration: number }[] = [];
let current = 0;

Array(8)
  .fill(0)
  .forEach((_, i) => {
    const loader = new GLTFLoader();
    loader.load(import.meta.env.BASE_URL + `car/0${i + 1}.glb`, (gltf) => {
      const obj = gltf.scene;
      const mixer = new THREE.AnimationMixer(obj);
      let duration = 0;
      gltf.animations.forEach((animation) => {
        const action = mixer.clipAction(animation);
        action.clampWhenFinished = false;
        action.play();
        duration = Math.max(duration, animation.duration);
      });
      steps[i] = { obj, mixer, duration };
      if (i === current) {
        scene.add(steps[current].obj);
      }
    });
  });

const prevButton = document.getElementById('prev')!;
function updateButtons() {
  if (current === 0) {
    prevButton.setAttribute('disabled', 'true');
  } else {
    prevButton.removeAttribute('disabled');
  }
  if (current === steps.length - 1) {
    nextButton.setAttribute('disabled', 'true');
  } else {
    nextButton.removeAttribute('disabled');
  }
}
prevButton.addEventListener('click', () => {
  scene.remove(steps[current].obj);
  current = Math.max(0, current - 1);
  updateButtons();
  steps[current].mixer.setTime(0);
  scene.add(steps[current].obj);
});
const nextButton = document.getElementById('next')!;
nextButton.addEventListener('click', () => {
  scene.remove(steps[current].obj);
  const max = steps.length - 1;
  current = Math.min(max, current + 1);
  updateButtons();
  steps[current].mixer.setTime(0);
  scene.add(steps[current].obj);
});

const time = document.getElementById('time')!;
// const onInput = ({ target }: HTMLElementEventMap['input']) => {
//   if (!(target instanceof HTMLInputElement)) return;
//   steps[current].mixer.setTime(Number(target.value));
// };
time.addEventListener('input', ({ target }) => {
  if (!(target instanceof HTMLInputElement)) return;
  clock.stop();
  steps[current].mixer.setTime((Number(target.value) * steps[current].duration) / 100);
});
time.addEventListener('change', ({ target }) => {
  if (!(target instanceof HTMLInputElement)) return;
  clock.start();
});

const clock = new THREE.Clock();
clock.running = true;
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  if (clock.running) {
    const step = steps[current];
    if (step) {
      if (time instanceof HTMLInputElement) {
        step.mixer.setTime(Math.min(step.duration-0.001,step.mixer.time+clock.getDelta()))
        const rate = Math.min(100,(step.mixer.time / step.duration) * 100);
        time.value = String(rate);
      }
    }
  }

  renderer.render(scene, camera);
}
animate();

document.getElementById('viewer')!.appendChild(renderer.domElement);
