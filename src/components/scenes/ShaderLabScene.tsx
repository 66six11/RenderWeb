import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { ShaderMaterial } from "three";
import type { Mesh } from "three";
import type { RenderSceneConfig } from "../../types/render";
import { subscribeRenderEvent } from "../../lib/renderBus";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normal;
    vec3 displaced = position + normal * sin(position.y * 8.0 + uv.x * 4.0) * 0.03;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uMix;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    float wave = sin((vUv.x + uTime * 0.07) * 18.0) * 0.5 + 0.5;
    vec3 colorA = vec3(0.08, 0.14, 0.28);
    vec3 colorB = vec3(0.12, 0.95, 0.86);
    vec3 colorC = vec3(0.90, 0.35, 1.0);
    vec3 color = mix(colorA, colorB, smoothstep(0.15, 0.95, wave));
    color = mix(color, colorC, uMix * smoothstep(0.4, 1.0, vUv.y));
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
    gl_FragColor = vec4(color + fresnel * 0.35, 1.0);
  }
`;

export function ShaderLabScene({ config }: { config: RenderSceneConfig }) {
  const mesh = useRef<Mesh>(null);
  const [mix, setMix] = useState(0.35);
  const sceneId = config.id ?? "hero";
  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMix: { value: 0.35 }
      },
      vertexShader,
      fragmentShader
    });
  }, []);

  useEffect(() => {
    return subscribeRenderEvent(sceneId, (event) => {
      if (typeof event.progress === "number") {
        setMix(event.progress);
      }
    });
  }, [sceneId]);

  useFrame((state, delta) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMix.value = mix;

    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.16;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.18;
    }
  });

  return (
    <>
      <mesh ref={mesh} material={material} castShadow receiveShadow>
        <torusKnotGeometry args={[0.82, 0.28, 192, 32]} />
      </mesh>
      <ContactShadows position={[0, -1.45, 0]} opacity={0.4} blur={2.2} far={4} />
    </>
  );
}
