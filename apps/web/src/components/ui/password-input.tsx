import * as React from 'react';
import { IconButton, Input, type InputProps } from '@chakra-ui/react';
import { InputGroup } from './input-group';
import { LuEye, LuEyeOff } from 'react-icons/lu';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasswordInputProps extends InputProps {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    function PasswordInput(props, ref) {
        const { children, ...rest } = props;
        const [showPassword, setShowPassword] = React.useState<boolean>(false);

        const handleOnTogglePassword = React.useCallback((val: boolean) => {
            setShowPassword(val);
        }, []);

        return (
            <InputGroup
                w={'100%'}
                flex="1"
                endElement={
                    <IconButton
                        h="100%"
                        size="2xs"
                        variant={'plain'}
                        as={showPassword ? LuEye : LuEyeOff}
                        onClick={() => handleOnTogglePassword(!showPassword)}
                    />
                }>
                <Input
                    ref={ref}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...rest}>
                    {children}
                </Input>
            </InputGroup>
        );
    },
);
