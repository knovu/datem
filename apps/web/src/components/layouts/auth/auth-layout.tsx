import { HStack, Text, VStack } from '@chakra-ui/react';
import { Logo } from '@src/components';
import { CURRENT_YEAR } from '@src/constants';
import { cx, dt } from '@src/utils';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <VStack
            className={cx('auth-layout')}
            data-testid={dt('auth-layout')}
            h={'100vh'}
            overflowY={'auto'}
            overflowX={'hidden'}
            justifyContent={'center'}>
            <Outlet />

            {/* Footer */}
            <HStack w="100%" justify={'space-between'} px={50} pb={12}>
                <Text>&copy; {CURRENT_YEAR} Jess Graham.</Text>
                <Logo w={120} />
            </HStack>
        </VStack>
    );
};

export default AuthLayout;
