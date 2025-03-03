import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model({ RutaModelo, ...props }) {
  // Usamos useGLTF directamente con la URL del archivo GLB
  useEffect(() => {
    console.log("ruta", RutaModelo);
  }, [RutaModelo]);

  // Carga el modelo GLB desde la URL proporcionada
  // const { nodes, materials } = useGLTF(`public\\porsche-transformed.glb`);
  const { nodes, materials } = useGLTF(`https://localhost:7161/${RutaModelo}`);
  
  // console.log(nodes, materials);

  // Si el modelo aún no está cargado, mostramos un "loading" o null
  if (!nodes) return <div>Loading...</div>;

  return (
    <group {...props} dispose={null}>
      {/* Renderiza todos los nodos del modelo */}
      {Object.keys(nodes).map((key) => {
        var node = nodes[key];
        if (node.isMesh) {
          // console.log(node)
          
          return (
            <mesh
              key={node.uuid}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={materials[node.material.name]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          );
        }
      
        return null;
      })}
    </group>
  );
}

export default Model;