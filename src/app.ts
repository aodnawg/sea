import * as THREE from "three";
import { PerspectiveCamera } from "three";

import { makeObj } from "./obj";
import { makeCamera } from "./camera";

const containerSelector = "#app";

const mount = (renderer: Readonly<THREE.WebGLRenderer>, container: Element) => {
  const dom = renderer.domElement;
  container.append(dom);
};

const getContainerSize = (): [number, number] => {
  /** width, height */
  return [640, 480];
};

const makeRenderer = (width: number, height: number) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  return renderer;
};

const getContainer = (containerSelector: string) => {
  const container = document.querySelector(containerSelector);
  if (!container) {
    throw "no valid container";
  }
  return container;
};

const animate = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  update: () => void
) => {
  const render = () => {
    update();
    renderer.render(scene, camera);
    return window.requestAnimationFrame(render);
  };
  return render();
};

const main = () => {
  const container = getContainer(containerSelector);
  const [width, height] = getContainerSize();
  const renderer = makeRenderer(width, height);
  const scene = new THREE.Scene();
  const camera = makeCamera(width, height, renderer);

  const { object, update } = makeObj();

  scene.add(object);

  mount(renderer, container);
  // renderer.render(scene, camera);
  animate(renderer, scene, camera, update);
};

main();
