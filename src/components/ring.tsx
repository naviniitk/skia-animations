import { Circle, Group, mix, polar2Canvas, vec } from '@shopify/react-native-skia';
import { useMemo } from 'react';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import { useWindowDimensions } from 'tamagui';

const c1 = '#61bea2';
const c2 = '#529ca0';

type RingProps = {
  index: number;
  progress: SharedValue<number>;
};

const Ring = ({ index, progress }: RingProps) => {
  const { width, height } = useWindowDimensions();
  const R = width / 4;
  const center = useMemo(() => vec(width / 2, height / 2), [height, width]);

  const theta = (index * (2 * Math.PI)) / 6;
  const transform = useDerivedValue(() => {
    const { x, y } = polar2Canvas({ theta, radius: progress.value * R }, { x: 0, y: 0 });
    const scale = mix(progress.value, 0.3, 1);
    return [{ translateX: x }, { translateY: y }, { scale }];
  }, [progress]);

  return (
    <Group origin={center} transform={transform}>
      <Circle c={center} r={R} color={index % 2 ? c1 : c2} />
    </Group>
  );
};

export default Ring;
