import * as THREE from 'three';

import './style.css';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xefefef);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 200);

const geometry = new THREE.PlaneGeometry(50, 50);
const front = new THREE.MeshLambertMaterial({ color: 0xff0000, side: THREE.FrontSide });
const back = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.BackSide });
geometry.faces[0].materialIndex = 0;
geometry.faces[1].materialIndex = 0;
const crane = new THREE.Mesh(geometry, [front, back]);
crane.position.set(0, 0, 0);
crane.rotateX(15);
crane.rotateZ(-15);
scene.add(crane);

const light = new THREE.DirectionalLight();
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  crane.rotation.y += 0.005;

  renderer.render(scene, camera);
}
animate();

document.getElementById('viewer')?.appendChild(renderer.domElement);
