import { Box } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <Box
            className={cx('layout')}
            data-testid={dt('layout')}
            h={'100vh'}
            overflowY={'auto'}
            overflowX={'hidden'}
            justifyContent={'center'}>
            <Outlet />
        </Box>
    );
};

export default Layout;
