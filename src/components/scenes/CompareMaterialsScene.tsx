import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import type { Group } from "three";
import { useRef } from "react";
import type { RenderSceneConfig } from "../../types/render";
import { getMaterialNames, getMaterialPreset } from "../../lib/materialPresets";
import { subscribeRenderEvent } from "../../lib/renderBus";

export function CompareMaterialsScene({ config }: { config: RenderSceneConfig }) {
  const group = useRef<Group>(null);
  const [progress, setProgress] = useState(0);
  const sceneId = config.id ?? "hero";
  const names = getMaterialNames();

  useEffect(() => {
    return subscribeRenderEvent(sceneId, (event) => {
      if (typeof event.progress === "number") {
        setProgress(event.progress);
      }
    });
  }, [sceneId]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * (0.05 + progress * 0.15);
    }
  });

  return (
    <>
      <group ref={group} position={[0, 0.1, 0]}>
        {names.slice(0, 5).map((name, index) => {
          const material = getMaterialPreset(name);
          const x = (index - 2) * 0.88;

          return (
            <Float key={name} speed={1 + index * 0.1} floatIntensity={0.18} rotationIntensity={0.15}>
              <group position={[x, Math.sin(index) * 0.08, 0]}>
                <mesh castShadow receiveShadow>
                  <sphereGeometry args={[0.34, 64, 32]} />
                  <meshPhysicalMaterial {...material} transparent={Boolean(material.opacity)} />
                </mesh>
              </group>
            </Float>
          );
        })}
      </group>
      <ContactShadows position={[0, -0.9, 0]} opacity={0.35} blur={2.4} far={5} />
    </>
  );
}
