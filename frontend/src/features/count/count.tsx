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

  return (
    <div className={styles.count}>
      <div className={styles.coin}>
        <img src={CoinImage} alt="" />
        <span>{state}</span>
      </div>
      <br />
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh scale={3.5}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <CameraControls />
      </Canvas>
      <Button text="Evolve" />
      {/* <div className={styles.ninja} onClick={onClick}> */}
      {/*   <img src={NinjaImage} alt="" /> */}
      {/*   <Button text="Ping" /> */}
      {/* </div> */}
    </div>
  );
};
