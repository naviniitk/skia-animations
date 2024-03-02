import { Theme, View, YStack, useWindowDimensions } from 'tamagui';

import { Breathe } from '../components';

const Page = () => {
  const { width } = useWindowDimensions();
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <View flex={1} width={width}>
          <Breathe />
        </View>
      </YStack>
    </Theme>
  );
};

export default Page;
