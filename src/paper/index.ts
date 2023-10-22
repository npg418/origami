import * as THREE from 'three';
import * as SceneUtils from 'three/addons/utils/SceneUtils.js';

export default class Paper extends THREE.Group {
  size: number;

  constructor(size: number, frontColor: number, backColor?: number) {
    super();
    this.size = size;

    const hf = size / 2;
    const paperGeometry = this.#createPaperGeometry(hf);
    const frontMaterial = new THREE.MeshLambertMaterial({ color: frontColor, side: THREE.FrontSide });
    const backMaterial = new THREE.MeshLambertMaterial({ color: backColor ?? 0xffffff, side: THREE.BackSide });
    const paperMesh = SceneUtils.createMultiMaterialObject(paperGeometry, [frontMaterial, backMaterial]);
    paperMesh.castShadow = true;
    paperMesh.receiveShadow = true;
    this.add(paperMesh);

    const wireframe = new THREE.Mesh(
      paperGeometry,
      // TODO: wireframeの幅を変えられるようにする
      new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 5 })
    );
    this.add(wireframe);
  }

  #createPaperGeometry(hf: number) {
    const geometry = new THREE.BufferGeometry();
    /**
     * 3   2
     *
     * 0   1
     */
    // prettier-ignore
    const vertices = new Float32Array([
        -hf, -hf, 0,
        hf, -hf, 0,
        hf, hf, 0,
        -hf, hf, 0,
      ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // prettier-ignore
    const indices = new Uint16Array([
      0, 1, 2,
      2, 3, 0,
    ]);
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    geometry.computeVertexNormals();

    return geometry;
  }

  fold(deg: number) {
    const op = Math.sqrt(2) * 50;
    const z = Math.sin((deg * Math.PI) / 180) * op;
    const d = Math.cos((deg * Math.PI) / 180) * op;
    const dx = Math.sin((1 / 4) * Math.PI) * d;
    const dy = Math.cos((1 / 4) * Math.PI) * d;

    const recursiveFold = (obj: THREE.Object3D) => {
      if (obj instanceof THREE.Group) {
        obj.children.forEach(recursiveFold);
      } else if (obj instanceof THREE.Mesh) {
        const pos = obj.geometry.attributes.position;
        pos.setXYZ(3, dx, -dy, z);
        pos.needsUpdate = true;
        obj.geometry.computeVertexNormals();
      }
    };
    recursiveFold(this);
  }
}
