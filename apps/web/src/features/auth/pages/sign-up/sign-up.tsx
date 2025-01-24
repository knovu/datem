import { HStack, Icon, IconButton, Spacer, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { Outlet, useNavigate } from 'react-router';
import { SignUpContext, SignUpProvider } from '../../context';
import { LogoIcon, ProgressBar, ProgressRoot } from '@src/components';

const SignUp = () => {
    const nav = useNavigate();

    return (
        <SignUpProvider>
            <VStack
                className={cx('sign-up')}
                data-testid={dt('sign-up')}
                h="100%"
                justify={'center'}
                spaceY={5}
                w="100%">
                <SignUpContext.Consumer>
                    {(val) => (
                        <>
                            <ProgressRoot
                                w="100%"
                                value={val.progress}
                                size="xs"
                                colorPalette={'pink'}>
                                <ProgressBar />
                            </ProgressRoot>
                            <HStack w="100%">
                                <IconButton
                                    onClick={() => {
                                        val.onResetState();
                                        nav('/auth/sign-in');
                                    }}
                                    variant="plain"
                                    _hover={{ opacity: 0.7 }}>
                                    <Icon as={LogoIcon} w={12} />
                                </IconButton>
                            </HStack>
                        </>
                    )}
                </SignUpContext.Consumer>

                <Spacer flex={1} />

                <HStack w="100%">
                    <Outlet />
                </HStack>

                <Spacer flex={1} />
            </VStack>
        </SignUpProvider>
    );
};

export default SignUp;
