import { HStack, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { Outlet } from 'react-router';
import { SignUpProvider } from '../../context';

const SignUp = () => {
    return (
        <SignUpProvider>
            <VStack
                className={cx('sign-up')}
                data-testid={dt('sign-up')}
                h="100%"
                justify={'center'}
                spaceY={5}>
                <HStack>
                    <Outlet />
                </HStack>
            </VStack>
        </SignUpProvider>
    );
};

export default SignUp;
