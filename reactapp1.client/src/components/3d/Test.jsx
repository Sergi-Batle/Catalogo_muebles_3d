import * as THREE from 'three'
import { useLayoutEffect, useRef, memo, useState } from 'react'
import { Canvas, applyProps, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls, PerformanceMonitor, AccumulativeShadows, RandomizedLight, Environment, Lightformer, Float, useGLTF } from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'

import Model from './Model'

const Test = memo(({ ruta }) => {
    const controlsRef = useRef();

    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 1, 12], fov: 30 }}>
            <OrbitControls
                ref={controlsRef}
                autoRotate
                enableDamping
                dampingFactor={0.1}
            />

            <pointLight position={[10, 10, 5]} intensity={100}/>
            <pointLight position={[-10, -10, -5]} intensity={100}/>
            <ambientLight intensity={2} />

            <group position={[0, -1.5, 0]}>
                <mesh castShadow receiveShadow>
                    <Model RutaModelo={ruta} />
                </mesh>

                <Float position={[0, 0, 0]} floatIntensity={2}>
                    <mesh castShadow receiveShadow>
                    </mesh>
                </Float>
                <ContactShadows scale={10} blur={3} opacity={0.25} far={10} />
            </group>

            <Environment background resolution={64}>
                <mesh scale={100}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <LayerMaterial side={THREE.BackSide}>
                        <Depth colorA="#00ffff" colorB="#ff8f00" alpha={0.9} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
                    </LayerMaterial>
                </mesh>
            </Environment>
        </Canvas>
    )
})

export default Test

// export default function Test({ ruta }) {
//     //   const [degraded, degrade] = useState(false)
//     const controlsRef = useRef();
//     //   return (
//     //     <Canvas shadows camera={{ position: [5, 0, 5], fov: 30 }}>
//     //       <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
//     //       <ambientLight intensity={0.5} />
//     //       <Porsche scale={1.6} position={[-0.5, -0.18, 0]} rotation={[0, Math.PI / 5, 0]} />
//     //       <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
//     //         <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
//     //       </AccumulativeShadows>
//     //       {/** PerfMon will detect performance issues */}
//     //       <PerformanceMonitor onDecline={() => degrade(true)} />
//     //       {/* Renders contents "live" into a HDRI environment (scene.environment). */}
//     //       <Environment frames={degraded ? 1 : Infinity} resolution={256} background blur={1}>
//     //         <Lightformers />
//     //       </Environment>
//     //       <CameraRig />

//     //               <OrbitControls
//     //                 ref={controlsRef}
//     //                 autoRotate
//     //                 enableDamping
//     //                 dampingFactor={0.1} // Mejora la suavidad del movimiento
//     //               />
//     //     </Canvas>
//     //   )

//     return (
//         <Canvas dpr={[1, 2]} camera={{ position: [0, 1, 12] ,fov : 30}}>
//             {/* <OrbitControls autoRotate minPolarAngle={Math.PI / 1.8} maxPolarAngle={Math.PI / 1.8} /> */}
//             <OrbitControls
//                 ref={controlsRef}
//                 autoRotate

//                 enableDamping
//                 dampingFactor={0.1} // Mejora la suavidad del movimiento
//             />

//             <pointLight position={[10, 10, 5]} intensity={100}/>
//             <pointLight position={[-10, -10, -5]} intensity={100}/>
//             <ambientLight intensity={2} />

//             <group position={[0, -1.5, 0]}>
//                 <mesh castShadow receiveShadow>
//                     {/* <torusKnotGeometry args={[1, 0.25, 256, 24, 1, 3]} /> */}
//                     <Model RutaModelo={ruta} />
//                     {/* <meshStandardMaterial color="white" roughness={0.1} metalness={0.925} /> */}
//                 </mesh>



//                 <Float position={[0, 0, 0]} floatIntensity={2}>
//                     <mesh castShadow receiveShadow>
//                         {/* <torusKnotGeometry args={[1, 0.25, 256, 24, 1, 3]} /> */}

//                         {/* <meshStandardMaterial color="white" roughness={0.1} metalness={0.925} /> */}
//                     </mesh>
//                 </Float>
//                 <ContactShadows scale={10} blur={3} opacity={0.25} far={10} />
//             </group>

//             {/* We're building a cube-mapped environment declaratively.
//           Anything you put in here will be filmed (once) by a cubemap-camera
//           and applied to the scenes environment, and optionally background. */}
//             <Environment background resolution={64}>

//                 {/* <Striplight position={[10, 2, 0]} scale={[1, 3, 10]} />
//                 <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} /> */}

//                 <mesh scale={100}>
//                     <sphereGeometry args={[1, 64, 64]} />

//                     <LayerMaterial side={THREE.BackSide}>
//                         {/* <Base color="blue" alpha={1} mode="normal" /> */}
//                         <Depth colorA="#00ffff" colorB="#ff8f00" alpha={0.9} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
//                     </LayerMaterial>
//                 </mesh>
//             </Environment>
//         </Canvas>
//     )
// }

function Striplight(props) {
    return (
        <mesh {...props}>
            <boxGeometry />
            <meshBasicMaterial color="white" />
        </mesh>
    )
}

/*
Author: Karol Miklas (https://sketchfab.com/karolmiklas)
License: CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
Source: https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf
Title: (FREE) Porsche 911 Carrera 4S
*/
function Porsche(props) {
    const { scene, nodes, materials } = useGLTF('/911-transformed.glb')
    useLayoutEffect(() => {
        Object.values(nodes).forEach((node) => node.isMesh && (node.receiveShadow = node.castShadow = true))
        applyProps(materials.rubber, { color: '#222', roughness: 0.6, roughnessMap: null, normalScale: [4, 4] })
        applyProps(materials.window, { color: 'black', roughness: 0, clearcoat: 0.1 })
        applyProps(materials.coat, { envMapIntensity: 4, roughness: 0.5, metalness: 1 })
        applyProps(materials.paint, { envMapIntensity: 2, roughness: 0.45, metalness: 0.8, color: '#555' })
    }, [nodes, materials])
    return <primitive object={scene} {...props} />
}

function CameraRig({ v = new THREE.Vector3() }) {
    return useFrame((state) => {
        const t = state.clock.elapsedTime
        state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2), 0.05)
        state.camera.lookAt(0, 0, 0)
    })
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
    const group = useRef()
    useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60))
    return (
        <>
            {/* Ceiling */}
            <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <group rotation={[0, 0.5, 0]}>
                <group ref={group}>
                    {positions.map((x, i) => (
                        <Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
                    ))}
                </group>
            </group>
            {/* Sides */}
            <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
            {/* Accent (red) */}
            <Float speed={5} floatIntensity={2} rotationIntensity={2}>
                <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
            </Float>
            {/* Background */}
            <mesh scale={100}>
                <sphereGeometry args={[1, 64, 64]} />
                <LayerMaterial side={THREE.BackSide}>
                    <Color color="#444" alpha={1} mode="normal" />
                    <Depth colorA="blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
                </LayerMaterial>
            </mesh>
        </>
    )
}
