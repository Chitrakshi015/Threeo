import { useAlert, useHandleCalculateGas, withoutCommas } from '@gear-js/react-hooks';
import { Button, Input } from '@gear-js/vara-ui';
import { useHamsterState, useStateMessage } from '@/app/hooks/use-read-state';
import { useProgramMetadata } from '@/app/hooks/api';

import { ADDRESS } from '@/consts';
import metaTxt from '@/assets/meta/hamster.meta.txt';
import { Canvas } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'


import { useGLTF } from '@react-three/drei'

useGLTF.preload('/raccoon.glb')

useGLTF.preload('/a_beautiful_calm_chicken_0714052117_refine.glb')
useGLTF.preload('/a_beautiful_calm_palm_0714051539_refine.glb')
useGLTF.preload('/a_beautiful_calm_sun_lounger_0714051525_refine.glb')
useGLTF.preload('/a_beautiful_calm_waterly_garden_fountain_0714051901_refine.glb')

export const Count = () => {
  const alert = useAlert();
  const { state } = useHamsterState();
  const handleMessage = useStateMessage();
  const meta = useProgramMetadata(metaTxt);
  const calculateGas = useHandleCalculateGas(ADDRESS.CONTRACT, meta);

  const onClick = () => {
    const payload = 'Click';

    calculateGas(payload)
      .then((res) => res.toHuman())
      .then(({ min_limit }) => {
        const minLimit = withoutCommas(min_limit as string);
        const gasLimit = Math.floor(Number(minLimit) + Number(minLimit) * 0.2);

        handleMessage({ payload, gasLimit });
      })
      .catch((error) => {
        console.log(error);
        alert.error('Gas calculation error');
      });
  };

  const { nodes: raccoon } = useGLTF('/raccoon.glb')

  const { nodes: chicken } = useGLTF('/a_beautiful_calm_chicken_0714052117_refine.glb')
  const { nodes: palm } = useGLTF('/a_beautiful_calm_palm_0714051539_refine.glb')
  const { nodes: sun_lounger } = useGLTF('/a_beautiful_calm_sun_lounger_0714051525_refine.glb')
  const { nodes: fountain } = useGLTF('/a_beautiful_calm_waterly_garden_fountain_0714051901_refine.glb')
  return (
    <div>
      <div style={{ fontSize: 50, color: '#000', display: 'flex', justifyContent: 'center' }}>{state}</div>
      <br />
      <Canvas style={{ height: '65vh', width: '80vw' }} camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 10] }} >
        <CameraControls />
        <ambientLight intensity={4} color="white" />
        <directionalLight color="white" position={[0, 0, 10]} />
        <group >
          <mesh
            castShadow
            receiveShadow
            scale={1}
            position={[0, 0, 5]} // Adjust position as needed
            geometry={chicken.mesh_0.geometry}
            material={chicken.mesh_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            scale={3.5}
            position={[-2, 1, 4]} // Adjust position as needed
            geometry={palm.mesh_0.geometry}
            material={palm.mesh_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            scale={3.5}
            position={[-2, 1, 2]} // Adjust position as needed
            geometry={palm.mesh_0.geometry}
            material={palm.mesh_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            scale={3.5}
            position={[-2, 1, 0]} // Adjust position as needed
            geometry={palm.mesh_0.geometry}
            material={palm.mesh_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            scale={3.5}
            position={[-2, 1, -2]} // Adjust position as needed
            geometry={palm.mesh_0.geometry}
            material={palm.mesh_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            scale={3.5}
            geometry={sun_lounger.mesh_0.geometry}
            material={sun_lounger.mesh_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            scale={3.5}
            position={[3, 1, -0]} // Adjust position as needed
            geometry={fountain.mesh_0.geometry}
            material={fountain.mesh_0.material}
          />
        </group>
      </Canvas>
      <Input placeholder='A wonderful beach umbrella' />
      <Button text="augment your world" style={{ width: '100%', marginTop: '18px' }} onClick={onClick} />
      <Button text="mint world" style={{ width: '100%', marginTop: '18px', backgroundColor: '#eee' }} onClick={onClick} />
    </div>
  );
};
