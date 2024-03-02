import { BlurMask, Canvas, Fill, Group, mix, vec } from '@shopify/react-native-skia';
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

import Ring from './ring';
import { useLoop } from '../hooks';

export const Breathe = () => {
  const { width, height } = useWindowDimensions();
  const center = useMemo(() => vec(width / 2, height / 2), [height, width]);

  const progress = useLoop({ duration: 3000 });
  const transform = useDerivedValue(
    () => [{ rotate: mix(progress.value, -Math.PI, 0) }],
    [progress]
  );

  return (
    <Canvas style={styles.container}>
      <Fill color="rgb(36,43,56)" />
      <Group origin={center} transform={transform} blendMode="screen">
        <BlurMask style="solid" blur={40} />
        {new Array(6).fill(0).map((_, index) => {
          return <Ring key={index} index={index} progress={progress} />;
        })}
      </Group>
    </Canvas>
  );
};

// Export Breathe as default, we can lazy-load this way easier.
export default Breathe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
