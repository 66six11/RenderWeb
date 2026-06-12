import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import type { RenderSceneConfig } from "../../types/render";
import { getMaterialPreset } from "../../lib/materialPresets";

export function GalleryStageScene({ config }: { config: RenderSceneConfig }) {
  const group = useRef<Group>(null);
  const primary = getMaterialPreset(config.material ?? "obsidian");
  const accent = getMaterialPreset("neon");

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.07;
    }
  });

  return (
    <>
      <group ref={group}>
        <Float speed={1.2} floatIntensity={0.2} rotationIntensity={0.1}>
          <mesh castShadow receiveShadow position={[-0.95, 0, 0]}>
            <dodecahedronGeometry args={[0.55, 1]} />
            <meshPhysicalMaterial {...primary} />
          </mesh>
        </Float>
        <Float speed={1.5} floatIntensity={0.18} rotationIntensity={0.1}>
          <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
            <torusGeometry args={[0.45, 0.13, 32, 96]} />
            <meshPhysicalMaterial {...accent} />
          </mesh>
        </Float>
        <Float speed={1.1} floatIntensity={0.22} rotationIntensity={0.1}>
          <mesh castShadow receiveShadow position={[0.95, -0.05, 0]}>
            <icosahedronGeometry args={[0.5, 2]} />
            <meshPhysicalMaterial {...primary} roughness={0.28} />
          </mesh>
        </Float>
      </group>
      <ContactShadows position={[0, -0.95, 0]} opacity={0.32} blur={2.4} far={5} />
    </>
  );
}
