import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, ContactShadows, useGLTF } from "@react-three/drei";
import type { Group } from "three";
import type { RenderSceneConfig } from "../../types/render";
import { getMaterialPreset } from "../../lib/materialPresets";
import { getMotionPreset } from "../../lib/motionPresets";
import { subscribeRenderEvent } from "../../lib/renderBus";

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} dispose={null} />;
}

function FallbackObject({ materialName }: { materialName?: string }) {
  const material = getMaterialPreset(materialName);

  return (
    <mesh castShadow receiveShadow>
      <icosahedronGeometry args={[1.18, 3]} />
      <meshPhysicalMaterial {...material} transparent={Boolean(material.opacity)} />
    </mesh>
  );
}

export function PBRTurntableScene({ config }: { config: RenderSceneConfig }) {
  const group = useRef<Group>(null);
  const [materialName, setMaterialName] = useState(config.material);
  const motion = useMemo(() => getMotionPreset(config.motion), [config.motion]);
  const sceneId = config.id ?? "hero";

  useEffect(() => {
    return subscribeRenderEvent(sceneId, (event) => {
      if (event.material) {
        setMaterialName(event.material);
      }

      if (event.rotation && group.current) {
        group.current.rotation.set(...event.rotation);
      }
    });
  }, [sceneId]);

  useFrame((state, delta) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y += delta * motion.rotationSpeed;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * motion.floatAmplitude;
  });

  return (
    <>
      <Center>
        <group ref={group} rotation={config.rotation ?? [0, 0, 0]} scale={config.scale ?? 1.2}>
          {config.asset ? <Model url={config.asset} /> : <FallbackObject materialName={materialName} />}
        </group>
      </Center>
      <ContactShadows position={[0, -1.25, 0]} opacity={0.35} blur={2.5} far={4} />
    </>
  );
}
