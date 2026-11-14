// new_structure/modules/labs/ECCEngine.tsx
import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// محاكاة رياضية لمنحنى إهليلجي: y^2 = x^3 + ax + b
const CurvePath = ({ a = -2, b = 4 }: { a?: number; b?: number }) => {
  const points = useMemo(() => {
    const upperPoints: THREE.Vector3[] = [];
    const lowerPoints: THREE.Vector3[] = [];

    for (let x = -2; x <= 2.5; x += 0.04) {
      const y2 = Math.pow(x, 3) + a * x + b;
      if (y2 >= 0) {
        const y = Math.sqrt(y2);
        upperPoints.push(new THREE.Vector3(x, y, 0));
        lowerPoints.push(new THREE.Vector3(x, -y, 0));
      }
    }

    // Connect upper branch and reversed lower branch
    return [...upperPoints, ...lowerPoints.reverse()];
  }, [a, b]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: '#10b981', linewidth: 2 }))} />
  );
};

export const ECCEngine: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-slate-950 rounded-2xl border border-emerald-900 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.7} />
        <CurvePath />
        <OrbitControls enablePan={true} />
        <Text position={[0, 2.6, 0]} color="white" fontSize={0.25} anchorX="center" anchorY="middle">
          y² = x³ + ax + b (ECC Curve)
        </Text>
      </Canvas>
    </div>
  );
};

export default ECCEngine;
