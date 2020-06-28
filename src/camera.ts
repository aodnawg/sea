import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const makeCamera = (
  width: number,
  height: number,
  renderer?: THREE.WebGLRenderer
) => {
  const ratio = width / height;
  const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
  camera.position.z = 5;

  if (renderer) {
    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 5;
    controls.maxDistance = 10;
  }

  return camera;
};
