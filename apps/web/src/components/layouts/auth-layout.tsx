import { Box, Button } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <Box
            className={cx('auth-layout')}
            data-testid={dt('auth-layout')}
            h={'100vh'}
            overflowY={'auto'}
            overflowX={'hidden'}
            justifyContent={'center'}>
            <Button asChild>
                <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
                <Link to="/register">Register</Link>
            </Button>
            <Outlet />
        </Box>
    );
};

export default AuthLayout;
