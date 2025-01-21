import {
    Button,
    Card,
    Heading,
    HStack,
    IconButton,
    Input,
    Link,
    Separator,
    Text,
    VStack,
} from '@chakra-ui/react';
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
            w={'md'}
            as="form">
            <Card.Header>
                <Card.Title fontSize={'6xl'}>
                    <Heading>Sign in</Heading>
                </Card.Title>
                <Card.Description fontSize={'lg'}>
                    Please enter your credential below to sign in.
                </Card.Description>
            </Card.Header>
            <Card.Body>
                <VStack align="start">
                    <Field label="Username">
                        <Input autoFocus size="xl" />
                    </Field>
                    <Field label="Password">
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
                            <Input type={showPassword ? 'text' : 'password'} size="xl" />
                        </InputGroup>
                    </Field>
                    <Link>Forgot password?</Link>
                </VStack>
            </Card.Body>
            <Card.Footer>
                <VStack w="100%" align="start">
                    <Button w="100%" variant="solid" size="xl" colorPalette={'pink'}>
                        Sign in
                    </Button>

                    <HStack w="100%">
                        <Separator flex="1" />
                        <Text flexShrink="0">or</Text>
                        <Separator flex="1" />
                    </HStack>

                    <HStack fontSize="sm">
                        <Text>Don't have an account?</Text>
                        <Button variant="ghost" px={2} py={1} colorPalette={'pink'}>
                            Sign up
                        </Button>
                    </HStack>
                </VStack>
            </Card.Footer>
        </Card.Root>
    );
};

export default SignInForm;
