import { Box, HStack, Icon, List, Spacer, Text, VStack } from '@chakra-ui/react';
import { Logo } from '@src/components/logo';
import { Button } from '@src/components/ui';
import { cx, dt } from '@src/utils';
import { forwardRef, useCallback } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { Link, To, useLocation, useNavigate } from 'react-router';

interface LayoutSideBarMenuItemProps {
    label?: string;
    active?: boolean;
    path?: To;
}

const LayoutSideBarMenuItem = forwardRef<HTMLLIElement, LayoutSideBarMenuItemProps>(
    (props, ref) => {
        const { label = 'Unknown', path } = props;
        const location = useLocation();
        const nav = useNavigate();
        const isActive = location.pathname === path;

        const handleOnNavigate = useCallback(() => {
            if (!path) {
                throw new Error(
                    'Expected path to route to link, but got undefined. Did you forget to set it?',
                );
            }

            nav(path);
        }, []);

        return (
            <List.Item ref={ref} w="100%">
                <Button w="100%" asChild onClick={handleOnNavigate}>
                    <Link to={String(path)}>
                        <Icon fontSize={'5px'}>
                            <BsCircleFill />
                        </Icon>
                        <Text>{label}</Text>
                    </Link>
                </Button>
            </List.Item>
        );
    },
);

export const LayoutSideBar = () => {
    return (
        <Box
            className={cx('layout-sidebar')}
            data-testid={dt('layout-sidebar')}
            w={300}
            h="100%"
            borderRightWidth={1}
            borderRightColor={'gray.300'}
            bgColor={'gray.100'}>
            <VStack
                className={cx('layout-sidebar-wrapper')}
                data-testid={dt('layout-sidebar-wrapper')}
                pt={5}
                w="100%"
                h="100%">
                <List.Root
                    className={cx('layout-sidebar-menu')}
                    data-testid={dt('layout-sidebar-menu')}
                    w="100%"
                    display="flex"
                    align="center"
                    flexDir={'column'}
                    gapY={2}>
                    <LayoutSideBarMenuItem label="Dashboard" path="/app/dashboard" />
                    <LayoutSideBarMenuItem label="Settings" path="/app/settings" />
                </List.Root>

                <Spacer flex={1} />

                <HStack
                    className={cx('layout-sidebar-footer')}
                    data-testid={dt('layout-sidebar-footer')}
                    w="100%"
                    h={50}
                    borderTopWidth={1}
                    borderTopColor={'gray.300'}
                    justify={'space-between'}
                    px={4}>
                    <Logo w={100} />
                    <Text color={'gray.500'}>Version: v0.0.1</Text>
                </HStack>
            </VStack>
        </Box>
    );
};
