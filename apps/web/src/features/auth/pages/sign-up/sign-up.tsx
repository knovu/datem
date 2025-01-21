import { VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';

const SignUp = () => {
    return (
        <VStack
            className={cx('sign-up')}
            data-testid={dt('sign-up')}
            h="100%"
            justify={'center'}
            spaceY={5}></VStack>
    );
};

export default SignUp;
