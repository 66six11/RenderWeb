import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import type { Group } from "three";
import type { RenderSceneConfig } from "../../types/render";
import { getMaterialPreset } from "../../lib/materialPresets";
import { subscribeRenderEvent } from "../../lib/renderBus";

const partOffsets = [
  [-1, 0.2, 0],
  [1, 0.2, 0],
  [0, 1, 0],
  [0, -0.65, 0],
  [0, 0.2, 1.05],
  [0, 0.2, -1.05]
] as const;

export function ScrollExplodeScene({ config }: { config: RenderSceneConfig }) {
  const group = useRef<Group>(null);
  const [progress, setProgress] = useState(0.35);
  const material = useMemo(() => getMaterialPreset(config.material ?? "brushed-metal"), [config.material]);
  const sceneId = config.id ?? "hero";

  useEffect(() => {
    return subscribeRenderEvent(sceneId, (event) => {
      if (typeof event.progress === "number") {
        setProgress(event.progress);
      }
    });
  }, [sceneId]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    }
  });

  return (
    <>
      <group ref={group}>
        {partOffsets.map((offset, index) => (
          <mesh
            key={index}
            castShadow
            receiveShadow
            position={[offset[0] * progress, offset[1] * progress, offset[2] * progress]}
            rotation={[index * 0.2, index * 0.35, 0]}
          >
            <boxGeometry args={[0.72, 0.72, 0.72]} />
            <meshPhysicalMaterial {...material} />
          </mesh>
        ))}
      </group>
      <ContactShadows position={[0, -1.3, 0]} opacity={0.38} blur={2.6} far={5} />
    </>
  );
}
