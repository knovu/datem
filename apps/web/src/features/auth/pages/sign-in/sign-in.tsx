import { VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import SignInForm from './sign-in-form';

const SignIn = () => {
    return (
        <VStack className={cx('sign-in')} data-testid={dt('sign-in')}>
            <SignInForm />
        </VStack>
    );
};

export default SignIn;
