import { VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { Logo } from '@src/components';
import SignInForm from './sign-in-form';

const SignIn = () => {
    return (
        <VStack
            className={cx('sign-in')}
            data-testid={dt('sign-in')}
            h="100%"
            justify={'center'}
            spaceY={5}
            px={{ base: 4, sm: 12, md: 50 }}>
            <Logo w={{ base: 200, sm: 200, md: 250 }} />
            <SignInForm />
        </VStack>
    );
};

export default SignIn;
