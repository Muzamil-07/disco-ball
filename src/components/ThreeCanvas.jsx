import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import fragmentShader from "./Sphere.fragment.glsl?raw";
import vertexShader from "./Sphere.vertex.glsl?raw";
import { useRef } from "react";
import { vec3 } from "three/tsl";
import { Vector3 } from "three";
import AnimatedGlowCircle from "./AnimateGlow";

export const ThreeCanvas = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#111111", overflow: "hidden" }}>
        <AnimatedGlowCircle/>
        <Canvas>
            <OrbitControls makeDefault enableZoom={false} />
            <Sphere />
        </Canvas>
    </div>
  );
};

const Sphere = () => {
    const uTime = useRef({value: 0.0});
    const uMousePostion = useRef({value: vec3(0,0,-5)});
    const { camera, pointer, scene, raycaster } = useThree();

    useFrame((_, delta) => {
        uTime.current.value += delta;

        let mouseTarget;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(scene, true);
        if (intersects.length > 0) {
            const point = intersects[0].point;
            uMousePostion.current.value = point;
        }

        if (mouseTarget){
            uMousePostion.current.value.lerp(mouseTarget, delta * 10.0);
        }
        else {
            uMousePostion.current.value.lerp(new Vector3(0,0,0), delta);
        }
    })

  return (
    <mesh>
      <icosahedronGeometry args={[2.3, 64]} />
      <shaderMaterial args={[{
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime : uTime.current,
            uMousePosition : uMousePostion.current,
        },
        transparent: true,
        wireframe: true,
      }]} />
    </mesh>
  );
};
