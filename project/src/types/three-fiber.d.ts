import { Mesh } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      meshStandardMaterial: any;
      mesh: any;
    }
  }
}

declare module '@react-three/fiber' {
  export interface ThreeElements {
    mesh: any;
    ambientLight: any;
    pointLight: any;
    meshStandardMaterial: any;
  }
}

declare module '@react-three/drei' {
  export interface DreiElements {
    OrbitControls: any;
    Sphere: any;
    MeshDistortMaterial: any;
  }
} 