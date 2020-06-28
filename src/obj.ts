import * as THREE from "three";
import { makeSea } from "./sea/sea";

export interface Object {
  object: THREE.Mesh;
  update: () => void | undefined;
}

export const makeObj = () => {
  // const { object, update } = makeSea();

  return makeSea();
};
