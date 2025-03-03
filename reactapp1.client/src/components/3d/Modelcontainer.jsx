import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Model } from './Model.jsx';

export default function ModelContainer({ Modelo }) {
  const controlsRef = useRef();

  if (!Modelo) return null;

  return (
    <div className='w-full h-full'>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 10, position: [10, 2, 10] }}
        resize={{ scroll: false }}  // 🚩 Desactiva el recalculo en scroll
      >
        <Suspense fallback={null}>
          <Stage controls={controlsRef} preset="rembrandt" intensity={30} environment={null}>
            <Model RutaModelo={Modelo} />
          </Stage>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          autoRotate
          minDistance={40}
          maxDistance={100}
          enableDamping
          dampingFactor={0.1} // Mejora la suavidad del movimiento
        />
      </Canvas>
    </div>


  );
}
