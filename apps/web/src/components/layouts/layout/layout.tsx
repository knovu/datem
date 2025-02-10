import { Box, HStack, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { Outlet } from 'react-router';
import LayoutHeader from './layout-header';
import LayoutContent from './layout-content';

const Layout = () => {
    return (
        <Box
            className={cx('layout')}
            data-testid={dt('layout')}
            h={'100vh'}
            overflowY={'auto'}
            overflowX={'hidden'}>
            <VStack gap={0} w="100%" h="100%">
                <LayoutHeader />
                <HStack w="100%" h="100%">
                    <LayoutContent>
                        <Outlet />
                    </LayoutContent>
                </HStack>
            </VStack>
        </Box>
    );
};

export default Layout;
