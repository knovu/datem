import { useCallback } from 'react';
import {
    Avatar,
    Button,
    HStack,
    MenuSelectionDetails,
    Spacer,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { LogoIcon } from '@src/components/logo';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@src/components/ui';
import { useAuth, useSignOut } from '@src/providers';
import { useNavigate } from 'react-router';

const LayoutHeader = () => {
    const { user } = useAuth();
    const { signOut, loading } = useSignOut(() => {
        nav('/app/settings/account');
    });
    const nav = useNavigate();

    const onSelectMenuItem = useCallback(
        (details: MenuSelectionDetails) => {
            const { value } = details;

            switch (value) {
                case 'settings': {
                    nav('/app/settings');
                    break;
                }
                case 'logout': {
                    signOut();
                    break;
                }
                default: {
                    break;
                }
            }
        },
        [nav, signOut],
    );

    return (
        <>
            <HStack
                className={cx('layout-header')}
                data-testid={dt('layout-header')}
                w={'100%'}
                h={50}
                bgColor={'black'}
                pos={'relative'}
                px={4}>
                <HStack h="100%">
                    <LogoIcon w={45} />
                </HStack>

                <Spacer flex={1} h="100%" />

                <HStack h="100%">
                    <MenuRoot
                        onSelect={onSelectMenuItem}
                        size="md"
                        positioning={{
                            placement: 'bottom-end',
                        }}>
                        <MenuTrigger asChild>
                            <Button
                                variant="plain"
                                _hover={{ opacity: 0.7 }}
                                w={'fit-content'}
                                p={0}>
                                <Avatar.Root color="pink.500" bgColor="pink.200">
                                    <Avatar.Fallback name={user ? user.firstName : undefined} />
                                </Avatar.Root>
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            <MenuItem cursor={'pointer'} value="settings">
                                Settings
                            </MenuItem>
                            <MenuItem cursor={'pointer'} value="logout">
                                Log out
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                </HStack>
            </HStack>

            {/* Logout indicator */}
            {loading && (
                <VStack
                    bgColor={'rgb(0, 0, 0, 0.4)'}
                    h="100vh"
                    w="100%"
                    justify={'center'}
                    align={'center'}
                    position={'absolute'}>
                    <VStack>
                        <Spinner size="xl" />
                        <Text>Logging out...</Text>
                    </VStack>
                </VStack>
            )}
        </>
    );
};

export default LayoutHeader;
