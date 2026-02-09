"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface Model3DProps {
  playAnimation: boolean;
  onAnimationComplete?: () => void;
}

function CocytusModel({ playAnimation, onAnimationComplete }: Model3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  
  const { scene, animations } = useGLTF("/3d/equipt_cocytus_overlord.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => {
                mat.needsUpdate = true;
              });
            } else {
              mesh.material.needsUpdate = true;
            }
          }
        }
      });
    }
  }, [scene]);

  // Setup animation mixer once
  useEffect(() => {
    if (animations && animations.length > 0 && groupRef.current && !mixerRef.current) {
      mixerRef.current = new THREE.AnimationMixer(groupRef.current);
      
      const firstAnimation = animations[0];
      actionRef.current = mixerRef.current.clipAction(firstAnimation);
      actionRef.current.setLoop(THREE.LoopOnce, 1);
      actionRef.current.clampWhenFinished = true;
      
      console.log("Animation setup complete", animations);
    }
    
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [animations]);

  // Play animation when playAnimation becomes true
  useEffect(() => {
    if (playAnimation && actionRef.current && mixerRef.current) {
      console.log("Playing animation...");
      
      // Reset and play the animation
      actionRef.current.reset();
      actionRef.current.play();
      
      // Listen for animation completion
      const handleFinished = (e: any) => {
        console.log("Animation finished");
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      };
      
      mixerRef.current.addEventListener("finished", handleFinished);
      
      return () => {
        if (mixerRef.current) {
          mixerRef.current.removeEventListener("finished", handleFinished);
        }
      };
    }
  }, [playAnimation, onAnimationComplete]);

  // Update animation mixer on each frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    
    // REMOVED: No idle rotation
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

export default function Model3DViewer({ playAnimation, onAnimationComplete }: Model3DProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, []);

  if (hasError) {
    return (
      <div style={{ 
        width: "100%", 
        height: "100%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: "#888",
        flexDirection: "column",
        gap: "10px"
      }}>
        <p>Failed to load 3D model</p>
        <button onClick={() => setHasError(false)}>Retry</button>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: false
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          console.error('WebGL context lost');
          setHasError(true);
        });
        
        gl.domElement.addEventListener('webglcontextrestored', () => {
          console.log('WebGL context restored');
          setHasError(false);
        });
      }}
      style={{ 
        width: "100%", 
        height: "100%",
        background: "transparent"
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={50} />
      
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      <directionalLight position={[-5, 3, -5]} intensity={0.5} />
      <directionalLight position={[0, 5, -8]} intensity={0.8} color="#4a90e2" />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 2, 2]} intensity={0.5} color="#ffffff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.5}
        castShadow
      />
      
      <Environment preset="studio" />
      
      <CocytusModel 
        playAnimation={playAnimation} 
        onAnimationComplete={onAnimationComplete}
      />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={3}
        maxDistance={8}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  );
}

useGLTF.preload("/3d/equipt_cocytus_overlord.glb");