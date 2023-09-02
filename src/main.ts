import * as THREE from 'three';

import './style.css';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 200);

const geometry = new THREE.BoxGeometry(50, 50, 0.001);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const crane = new THREE.Mesh(geometry, material);
crane.rotateZ(-15);
scene.add(crane);

const light = new THREE.DirectionalLight(0xffffff);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  crane.rotation.y += 0.005;

  renderer.render(scene, camera);
}
animate();

document.getElementById('viewer')?.appendChild(renderer.domElement);
