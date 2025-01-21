import { VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import SignInForm from './sign-in-form';
import { Logo } from '@src/components';

const SignIn = () => {
    return (
        <VStack
            className={cx('sign-in')}
            data-testid={dt('sign-in')}
            h="100%"
            justify={'center'}
            spaceY={5}>
            <Logo w={300} />
            <SignInForm />
        </VStack>
    );
};

export default SignIn;
