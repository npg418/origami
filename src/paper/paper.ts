import * as THREE from 'three';
import { FoldingSteps } from './step2vertex';

export default class OrigamiPaper extends THREE.BufferGeometry {
  size: number;
  constructor(size: number, steps?: FoldingSteps) {
    super();
    this.size = size;
    const vertices = new Float32Array([0, 0, 0, size, 0, 0, size, size, 0, 0, 0, 0, 0, size, 0, size, size, 0]);
    this.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  }

  fold(deg: number) {
    const pos = this.attributes.position;
    const op = (Math.sqrt(2) * this.size) / 2;
    const z = Math.sin((deg * Math.PI) / 180) * op;
    const oh = Math.sqrt((op ^ 2) - (z ^ 2));
    const d = oh * Math.sqrt(2) * (deg > 90 ? -1 : 1);
    const c = this.size / 2;
    pos.setXYZ(1, c + d, c + d, z);
    pos.needsUpdate = true;
  }
}
