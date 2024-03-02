import { Canvas, Circle, Group, Rect } from '@shopify/react-native-skia';
import React from 'react';
import { Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

export default function SkiaHelloWorld() {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  const scale = useSharedValue(1);

  const tap = Gesture.Tap()
    .onStart(() => {
      scale.value = 1.2;
      console.log(scale.value);
    })
    .onEnd(() => {
      // scale.value = 1;
      console.log(scale.value);
    });

  const animatedScale = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value),
        },
      ],
    };
  });

  return (
    <Pressable
      onPressIn={() => {
        scale.value = 1.2;
      }}
      onPressOut={() => {
        scale.value = 1;
      }}>
      <AnimatedCanvas style={[{ width, height }, animatedScale]}>
        <Group blendMode="color">
          <Circle cx={r} cy={r} r={r} color="magenta" />
          <Circle cx={width - r} cy={r} r={r} color="magenta" />
          <Circle cx={width / 2} cy={width - r} r={r} color="magenta" />
        </Group>
      </AnimatedCanvas>
    </Pressable>
  );
}
