import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function TabletopPrinter({ phase }) {
  const canvas = useRef(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    const element = canvas.current;
    const renderer = new THREE.WebGLRenderer({ canvas: element, alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-2.7, 2.7, 2.7, -2.7, .1, 50);
    camera.position.set(5.1, 3.7, 6.5);
    camera.lookAt(0, .03, 0);
    scene.add(new THREE.HemisphereLight(0xdfe7ee, 0x0b0c10, 3));
    const key = new THREE.DirectionalLight(0xffffff, 4.4);
    key.position.set(-3, 7, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x95a5b4, 2);
    fill.position.set(5, 3, -4);
    scene.add(fill);

    const shell = new THREE.MeshStandardMaterial({ color: 0x222529, roughness: .48, metalness: .13 });
    const lid = new THREE.MeshStandardMaterial({ color: 0x303338, roughness: .38, metalness: .18 });
    const face = new THREE.MeshStandardMaterial({ color: 0x171a1d, roughness: .56, metalness: .08 });
    const seam = new THREE.MeshStandardMaterial({ color: 0x080a0c, roughness: .74 });
    const metal = new THREE.MeshStandardMaterial({ color: 0x55595c, roughness: .37, metalness: .5 });
    const vent = new THREE.MeshStandardMaterial({ color: 0x07090b, roughness: 1 });
    const light = new THREE.MeshStandardMaterial({ color: 0x34c781, emissive: 0x18a764, emissiveIntensity: 1.2 });

    const box = (width, height, depth, radius, material, x, y, z) => {
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 5, radius), material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return mesh;
    };

    box(3.25, 2.5, 3.2, .32, shell, 0, -.12, 0);
    box(3.2, .47, 3.12, .23, lid, 0, 1.1, -.02);
    box(3.02, .055, 2.84, .03, seam, 0, 1.31, -.03);
    box(2.78, 2.01, .12, .23, seam, -.04, -.08, 1.58);
    box(2.68, 1.91, .12, .21, face, -.04, -.08, 1.64);
    box(2.78, .28, .37, .12, seam, -.04, -1.17, 1.62);
    box(2.53, .16, .28, .06, shell, -.04, -1.12, 1.86);

    box(2.42, .10, .43, .035, metal, -.16, 1.39, .46);
    box(2.28, .035, .27, .015, seam, -.16, 1.45, .46);
    box(2.17, .025, .07, .01, vent, -.16, 1.46, .59);
    box(.37, .10, .64, .04, shell, 1.08, 1.43, .35);
    box(.33, .025, .25, .012, seam, 1.08, 1.49, .48);

    const buttonGeometry = new THREE.CylinderGeometry(.064, .064, .022, 20);
    for (const x of [-.95, -.65, -.35]) {
      const button = new THREE.Mesh(buttonGeometry, metal);
      button.rotation.x = Math.PI / 2;
      button.position.set(x, -1.08, 2.02);
      scene.add(button);
    }
    const indicator = new THREE.Mesh(new THREE.SphereGeometry(.055, 16, 12), light);
    indicator.position.set(-1.12, -1.08, 2.025);
    scene.add(indicator);

    const holeGeometry = new THREE.CircleGeometry(.027, 12);
    for (let row = 0; row < 4; row += 1) {
      for (let column = 0; column < 9; column += 1) {
        const hole = new THREE.Mesh(holeGeometry, vent);
        hole.rotation.y = Math.PI / 2;
        hole.position.set(1.634, -.74 + row * .15, -1.02 + column * .23);
        scene.add(hole);
      }
    }

    const resize = () => {
      const size = element.clientWidth;
      renderer.setSize(size, size, false);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const printing = phaseRef.current === 'printing';
      light.emissive.setHex(printing ? 0xe6a44d : 0x18a764);
      light.emissiveIntensity = printing ? 1.2 + Math.sin(clock.getElapsedTime() * 9) * .7 : 1.2;
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      const geometries = new Set();
      const materials = new Set();
      scene.traverse(object => {
        if (object.isMesh) {
          geometries.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
        }
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvas} className="vp-model-canvas" aria-hidden="true" />;
}
