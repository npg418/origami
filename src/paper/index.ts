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
    this.add(paperMesh);

    const wireframe = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    const wireframeMesh = new THREE.Mesh(paperGeometry, wireframe);
    this.add(wireframeMesh);
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
    console.log(vertices);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // prettier-ignore
    const indices = new Uint16Array([
      0, 1, 2,
      2, 3, 0
    ]);
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    geometry.computeVertexNormals();
    // const n = new Array(4).fill([0, 0, 1]).flat();
    // const normals = new Float32Array([...n, ...n.map((v) => v * -1)]);
    // geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

    return geometry;
  }
}
