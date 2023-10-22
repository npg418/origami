import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Paper from './paper';

import './style.css';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xefefef);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 300);

const group = new Paper(100, 0xff0000, 0x00ff00);
scene.add(group);

const light = new THREE.DirectionalLight();
light.position.set(100, 100, 100);
light.lookAt(scene.position);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

let deg = 0;
let revert = false;
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  revert ? (deg -= 0.5) : (deg += 0.5);
  if (deg >= 180) {
    revert = true;
  } else if (deg <= 0) {
    revert = false;
  }
  group.fold(deg);

  renderer.render(scene, camera);
}
animate();

document.getElementById('viewer')?.appendChild(renderer.domElement);
