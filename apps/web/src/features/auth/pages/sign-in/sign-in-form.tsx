import { Button, Card, Heading, IconButton, Input, VStack } from '@chakra-ui/react';
import { Field, InputGroup } from '@src/components';
import { cx, dt } from '@src/utils';
import { useCallback, useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleOnTogglePassword = useCallback((val: boolean) => {
        setShowPassword(val);
    }, []);

    return (
        <Card.Root
            className={cx('sign-in-form')}
            data-testid={dt('sign-in-form')}
            variant={'elevated'}
            w={'md'}>
            <Card.Header>
                <Card.Title fontSize={'4xl'}>
                    <Heading>Sign in</Heading>
                </Card.Title>
                <Card.Description fontSize={'lg'}>
                    Please enter your credential below to sign in.
                </Card.Description>
            </Card.Header>
            <Card.Body>
                <VStack>
                    <Field label="Username">
                        <Input autoFocus size="xl" />
                    </Field>
                    <Field label="Password">
                        <InputGroup
                            w={'100%'}
                            flex="1"
                            endElement={
                                <IconButton
                                    size="2xs"
                                    variant={'plain'}
                                    as={showPassword ? LuEye : LuEyeOff}
                                    onClick={() => handleOnTogglePassword(!showPassword)}
                                />
                            }>
                            <Input size="xl" type={showPassword ? 'text' : 'password'} />
                        </InputGroup>
                    </Field>
                </VStack>
            </Card.Body>
            <Card.Footer>
                <Button w="100%" variant="solid" size="xl">
                    Sign in
                </Button>
            </Card.Footer>
        </Card.Root>
    );
};

export default SignInForm;
