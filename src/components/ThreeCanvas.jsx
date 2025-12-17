import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import fragmentShader from "./Sphere.fragment.glsl?raw";
import vertexShader from "./Sphere.vertex.glsl?raw";
import { useRef } from "react";
import { vec3 } from "three/tsl";
import { Vector3 } from "three";
import bGvertexShader from "./Gradient.vertex.glsl?raw";
import bGfragmentShader from "./Gradient.fragment.glsl?raw";

export const ThreeCanvas = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#111111" }}>
        <Canvas>
            {/* <RadialGradientBackground /> */}
            <OrbitControls makeDefault />
            <Sphere />
        </Canvas>
    </div>
  );
};

const RadialGradientBackground = () => {
  const meshRef = useRef();
  const uniforms = useRef({
    uTime: { value: 0 },
  });

  useFrame((_, delta) => {
    uniforms.current.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        vertexShader={bGvertexShader}
        fragmentShader={bGfragmentShader}
        uniforms={uniforms.current}
        depthWrite={false} // so it doesn’t block other objects
      />
    </mesh>
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
      <icosahedronGeometry args={[3.0, 64]} />
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
