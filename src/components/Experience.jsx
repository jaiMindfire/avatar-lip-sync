import {
  CameraControls,
  Environment,
  Gltf,
  OrbitControls,
  useCursor,
  useProgress,
  useTexture,
} from "@react-three/drei";
import { Avatar } from "./Avatar";
import { Canvas, useThree } from "@react-three/fiber";
import { Camera } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect, useState } from "react";
import { VoiceRecognition } from "./VoiceRecognition";

export const Experience = (props) => {
  const [pos, setPos] = useState({
    x: null,
    y: null,
    z: null,
  });

  const [move, setMove] = useState(false);

  const { progress } = useProgress();

  useEffect(() => {
    // Set isLoaded to false when the component mounts to trigger the loading screen
    props.setIsLoaded(false);
    props.setProgress(progress)
    
    // Set it to true once loading is complete
    if (progress === 100) {
      props.setIsLoaded(true);
    }
  }, [progress, props.setIsLoaded]);

  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 0.001] }}>
        <CameraManager />
        <Environment preset="sunset" />
        <ambientLight color="pink" />
        <Avatar
          position={[0, -1.75, -4]}
          rotation-x={degToRad(0)}
          scale={1.6}
          pos={pos}
          move={move}
          setMove={setMove}
          command={props.command}
        />
        <Gltf
          src="/models/classroom_default.glb"
          position={[0.3, -1.7, -1]}
          onClick={(e) => {
            setPos({ x: e.point.x, y: 0, z: e.point.z });
            setMove(true);
          }}
        />
      </Canvas>
    </>
  );
};

const CameraManager = () => {
  return <CameraControls minZoom={1} maxZoom={3} />;
};
