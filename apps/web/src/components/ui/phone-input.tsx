import * as React from 'react';
import { Icon, Input, InputProps } from '@chakra-ui/react';
import { InputGroup } from './input-group';
import { LuPhone } from 'react-icons/lu';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PhoneInputProps extends InputProps {}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    function PhoneInput(props, ref) {
        const { children, onChange, ...rest } = props;

        const formatPhoneNumber = (value: string) => {
            return value
                .replace(/[^\d]/g, '') // Remove non-numeric characters
                .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Format to xxx-xxx-xxxx
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const formattedValue = formatPhoneNumber(e.target.value);
            e.target.value = formattedValue;
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <InputGroup w={'100%'} flex="1" startElement={<Icon as={LuPhone} />}>
                <Input
                    {...rest}
                    ref={ref}
                    type="tel"
                    maxLength={12} // To prevent input beyond xxx-xxx-xxxx
                    onChange={handleChange}>
                    {children}
                </Input>
            </InputGroup>
        );
    },
);
