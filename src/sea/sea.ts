import * as THREE from "three";
import seaFragShader from "./seaFragShader.glsl";
import seaVertShader from "./seaVertShader.glsl";

interface Object {
  object: THREE.Mesh;
  update: () => void | undefined;
}

const makeUniforms = () => {
  const map = {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(640, 480) }, // TODO
  };
  return map;
};

const makeShaderMat = (uniforms: { [uniform: string]: THREE.IUniform }) => {
  return new THREE.ShaderMaterial({
    vertexShader: seaVertShader,
    fragmentShader: seaFragShader,
    uniforms,
  });
};

export const makeSea = (): Object => {
  const geo = new THREE.PlaneGeometry(4, 4, 2, 2);
  const uniforms = makeUniforms();
  const mat = makeShaderMat(uniforms);
  const object = new THREE.Mesh(geo, mat);

  const update = () => {
    uniforms.u_time.value += 0.005;
  };
  return { object, update };
};

const a = THREE.MeshPhongMaterial;
