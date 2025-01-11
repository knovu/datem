import { VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';

const SignIn = () => {
    return <VStack className={cx('sign-in')} data-testid={dt('sign-in')}></VStack>;
};

export default SignIn;
