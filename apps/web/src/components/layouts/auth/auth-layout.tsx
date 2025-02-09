import { HStack, Spacer, Text, VStack } from '@chakra-ui/react';
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
            justifyContent={'center'}
            pb={5}>
            <Outlet />

            <Spacer flex={1} />

            {/* Footer */}
            <HStack px={{ base: 4, sm: 12, md: 50 }} w="100%" justify={'space-between'}>
                <Text>&copy; {CURRENT_YEAR} Jess Graham.</Text>
                <Logo w={120} />
            </HStack>
        </VStack>
    );
};

export default AuthLayout;
