import { BlurMask, Canvas, Fill, Group, mix, useCanvasRef, vec } from '@shopify/react-native-skia';
import { useMemo } from 'react';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';
import { Text } from 'tamagui';

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
  const ref = useCanvasRef();

  const handleTakeSnapshot = () => {
    const image = ref.current?.makeImageSnapshot();
    if (image) {
      // you can use image in an <Image> component
      // Or save to file using encodeToBytes -> Uint8Array
      const bytes = image.encodeToBytes();
      const blob = new Blob([bytes], { type: 'image/png' });

      // console.log(444444, bytes);
    }
  };

  return (
    <>
      <Canvas style={styles.container} ref={ref}>
        <Fill color="rgb(3,43,56)" />
        <Group origin={center} transform={transform} blendMode="screen">
          <BlurMask style="solid" blur={40} />
          {new Array(4).fill(0).map((_, index) => {
            return <Ring key={index} index={index} progress={progress} />;
          })}
        </Group>
      </Canvas>
      <Pressable
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          backgroundColor: '#fff',
          padding: 10,
        }}
        onPress={handleTakeSnapshot}>
        <Text>Save</Text>
      </Pressable>
    </>
  );
};

// Export Breathe as default, we can lazy-load this way easier.
export default Breathe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
