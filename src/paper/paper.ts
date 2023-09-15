import * as THREE from 'three';

export default class OrigamiPaper extends THREE.PlaneGeometry {
  constructor(size: number) {
    super(size, size, 1, 1);
  }
}

