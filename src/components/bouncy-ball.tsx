import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const BouncyBall = () => {
  const bounce = useSharedValue(0);
  const decay = useSharedValue(-200);

  const bounceAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: bounce.value,
        },
      ],
      width: interpolate(bounce.value, [-200, -10, 0], [100, 100, 130]),
      height: interpolate(bounce.value, [-200, -10, 0], [100, 100, 70]),
    };
  }, [decay.value]);

  useEffect(() => {
    decay.value = withDecay({
      velocity: 200,
      clamp: [0, 200],
    });
    bounce.value = withRepeat(
      withSequence(withTiming(decay.value, { duration: 700 }), withTiming(0, { duration: 200 })),
      -1,
      true
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            backgroundColor: 'red',
            borderRadius: 100,
            position: 'absolute',
            bottom: 200,
          },
          bounceAnimatedStyle,
        ]}
      />
      <View
        style={{
          width: 200,
          height: 10,
          backgroundColor: 'red',
          position: 'absolute',
          bottom: 200,
        }}
      />
    </View>
  );
};

export default BouncyBall;
