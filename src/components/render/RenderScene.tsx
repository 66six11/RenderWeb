import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import type { RenderSceneConfig } from "../../types/render";
import { getCameraPreset } from "../../lib/cameraPresets";
import { getRenderQuality } from "../../lib/renderQuality";
import { CameraRig } from "./CameraRig";
import { getSceneComponent } from "./SceneRegistry";

interface RenderSceneProps {
  config: RenderSceneConfig;
}

export default function RenderScene({ config }: RenderSceneProps) {
  const Scene = getSceneComponent(config.preset);
  const cameraPreset = getCameraPreset(config.camera);
  const quality = getRenderQuality(config.quality);
  const sceneId = config.id ?? "hero";

  return (
    <div className="render-canvas-shell" data-render-scene={sceneId}>
      <Canvas
        dpr={quality.dpr}
        shadows={quality.shadows}
        camera={{ position: cameraPreset.position, fov: cameraPreset.fov }}
        gl={{
          antialias: quality.antialias,
          powerPreference: "high-performance",
          alpha: true
        }}
      >
        <color attach="background" args={[config.background ?? "#080b12"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={2.2} castShadow={quality.shadows} />
        <directionalLight position={[-4, 2, -3]} intensity={0.8} />
        <Suspense fallback={<Html center className="render-loading">Loading render...</Html>}>
          <Scene config={config} />
          <Environment preset="city" />
        </Suspense>
        <CameraRig sceneId={sceneId} cameraPreset={config.camera} />
      </Canvas>
    </div>
  );
}
