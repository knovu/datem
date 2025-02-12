import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { AbsoluteCenter, Button as ChakraButton, Span, Spinner } from '@chakra-ui/react';
import * as React from 'react';
import { Tooltip } from './tooltip';

interface ButtonLoadingProps {
    loading?: boolean;
    loadingText?: React.ReactNode;
    tooltip?: string;
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
    const { loading, disabled, loadingText, children, tooltip, ...rest } = props;
    const button = (
        <ChakraButton disabled={loading || disabled} ref={ref} {...rest}>
            {loading && !loadingText ? (
                <>
                    <AbsoluteCenter display="inline-flex">
                        <Spinner size="inherit" color="inherit" />
                    </AbsoluteCenter>
                    <Span opacity={0}>{children}</Span>
                </>
            ) : loading && loadingText ? (
                <>
                    <Spinner size="inherit" color="inherit" />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </ChakraButton>
    );

    if (tooltip) {
        return (
            <Tooltip
                content={tooltip}
                openDelay={200}
                closeDelay={0}
                positioning={{ placement: 'bottom' }}>
                {button}
            </Tooltip>
        );
    }

    return button;
});
