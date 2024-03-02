import { Theme, YStack } from 'tamagui';

import { SkiaHelloWorld } from '../components';

const Page = () => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <SkiaHelloWorld />
      </YStack>
    </Theme>
  );
};

export default Page;
