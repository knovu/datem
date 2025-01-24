import { VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';

const Email = () => {
    return (
        <VStack
            className={cx('email')}
            data-testid={dt('email')}
            h="100%"
            justify={'center'}
            spaceY={5}></VStack>
    );
};

export default Email;
