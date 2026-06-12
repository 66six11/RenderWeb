import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { getCameraPreset } from "../../lib/cameraPresets";
import { subscribeRenderEvent } from "../../lib/renderBus";

interface CameraRigProps {
  sceneId: string;
  cameraPreset?: string;
}

export function CameraRig({ sceneId, cameraPreset }: CameraRigProps) {
  const { camera } = useThree();
  const preset = getCameraPreset(cameraPreset);
  const desiredPosition = useRef(new Vector3(...preset.position));
  const desiredTarget = useRef(new Vector3(...preset.target));
  const currentTarget = useRef(new Vector3(...preset.target));

  useEffect(() => {
    camera.position.set(...preset.position);
    camera.lookAt(...preset.target);
  }, []);

  useEffect(() => {
    return subscribeRenderEvent(sceneId, (event) => {
      if (!event.camera) {
        return;
      }

      const nextPreset = getCameraPreset(event.camera);
      desiredPosition.current.set(...nextPreset.position);
      desiredTarget.current.set(...nextPreset.target);
    });
  }, [sceneId]);

  useFrame((_, delta) => {
    const easing = 1 - Math.exp(-delta * 4.5);
    camera.position.lerp(desiredPosition.current, easing);
    currentTarget.current.lerp(desiredTarget.current, easing);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
