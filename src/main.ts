import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import './style.css';
import OrigamiPaper from './paper/paper';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xefefef);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 300);
 
const crane = new OrigamiPaper(100);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(crane, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const light = new THREE.DirectionalLight();
light.position.set(0, 0, 500);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}
animate();

document.getElementById('viewer')?.appendChild(renderer.domElement);
