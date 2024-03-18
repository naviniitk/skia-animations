import { Theme, YStack } from 'tamagui';

import { BouncyBall } from '../components';

const Page = () => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <BouncyBall />
      </YStack>
    </Theme>
  );
};

export default Page;
