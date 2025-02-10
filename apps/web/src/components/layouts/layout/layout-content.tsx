import { Box } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { PropsWithChildren } from 'react';

interface LayoutContentProps extends PropsWithChildren {}

const LayoutContent = (props: LayoutContentProps) => {
    const { children } = props;

    return (
        <Box
            className={cx('layout-content')}
            data-testid={dt('layout-content')}
            w={'100%'}
            h={'100%'}>
            {children}
        </Box>
    );
};

export default LayoutContent;
