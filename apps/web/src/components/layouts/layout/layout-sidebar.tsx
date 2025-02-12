import { Box, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { Logo } from '@src/components/logo';
import { cx, dt } from '@src/utils';

const LayoutSideBar = () => {
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
                w="100%"
                h="100%">
                <VStack
                    className={cx('layout-sidebar-menu')}
                    data-testid={dt('layout-sidebar-menu')}
                    w="100%"></VStack>

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

export default LayoutSideBar;
