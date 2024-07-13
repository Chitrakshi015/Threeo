import { useAlert, useHandleCalculateGas, withoutCommas } from '@gear-js/react-hooks';
import { Button } from '@gear-js/vara-ui';
import { useHamsterState, useStateMessage } from '@/app/hooks/use-read-state';
import { useProgramMetadata } from '@/app/hooks/api';

import { ADDRESS } from '@/consts';
import metaTxt from '@/assets/meta/hamster.meta.txt';
import { Canvas } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'


import { useGLTF } from '@react-three/drei'

useGLTF.preload('/raccoon.glb')

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

  const { nodes } = useGLTF('/raccoon.glb')
  console.log(nodes)
  return (
    <div>
      <div style={{ fontSize: 50, color: '#000' }}>{state}</div>
      <br />
      <Canvas style={{ height: 300, width: 300 }} camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 10] }} >
        <CameraControls />
        <ambientLight intensity={4} color="white" />
        <directionalLight color="white" position={[0, 0, 10]} />
        <group >
          <mesh
            castShadow
            receiveShadow
            scale={3.5}
            geometry={nodes.mesh_0.geometry}
            material={nodes.mesh_0.material}
          />
        </group>
      </Canvas>
      <Button text="Evolve" />
    </div>
  );
};
