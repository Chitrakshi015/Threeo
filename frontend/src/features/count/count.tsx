import { useAlert, useHandleCalculateGas, withoutCommas } from '@gear-js/react-hooks';
import { Button } from '@gear-js/vara-ui';
import { useHamsterState, useStateMessage } from '@/app/hooks/use-read-state';
import { useProgramMetadata } from '@/app/hooks/api';

import { ADDRESS } from '@/consts';
import metaTxt from '@/assets/meta/hamster.meta.txt';

import NinjaImage from './assets/ninja.png';
import CoinImage from './assets/coin.png';
import { Canvas } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'

import styles from './style.module.scss';

import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

useGLTF.preload('/monkey.glb')

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

  const { nodes, materials } = useGLTF('/monkey.glb')

  console.log(nodes)
  return (
    <div className={styles.count}>
      <div className={styles.coin}>
        {/* <img src={CoinImage} alt="" /> */}
        <span style={{ fontSize: 50, color: '#000' }}>{state}</span>
      </div>
      <br />
      <Canvas style={{ height: 300, width: 300 }} >
        <ambientLight intensity={100} color="white" />
        <directionalLight color="white" position={[0, 0, 10]} />
        <group >
          <CameraControls />
          <mesh
            castShadow
            receiveShadow
            scale={3.5}
            geometry={nodes.Suzanne.geometry}
            material={nodes.Suzanne.material}
          />
        </group>
      </Canvas>
      <Button text="Evolve" />
    </div>
  );
};
