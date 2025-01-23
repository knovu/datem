import { Card, HStack, Input, Link, Separator, Text, VStack } from '@chakra-ui/react';
import { Button, Field, PasswordInput } from '@src/components';
import { cx, dt } from '@src/utils';
import useSignIn from './useSignIn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router';

const schema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username is required')
        .email('Username must be a valid email')
        .required(),
    password: yup.string().min(1, 'Password is required').required(),
});

type FormValues = yup.InferType<typeof schema>;

const SignInForm = () => {
    const { signIn, error } = useSignIn();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onFormSubmit = handleSubmit((data) => {
        const { username, password } = data;

        return signIn(username, password).then(() => {
            // Do something with the tokens here
            navigate('/app/dashboard');
        });
    });

    return (
        <Card.Root
            onSubmit={onFormSubmit}
            className={cx('sign-in-form')}
            data-testid={dt('sign-in-form')}
            variant={'elevated'}
            as="form">
            <Card.Header>
                <Card.Title fontSize={'2xl'}>Sign in</Card.Title>
                <Card.Description fontSize={'lg'}>
                    Please enter your credential below to sign in.
                </Card.Description>
            </Card.Header>
            <Card.Body>
                <VStack align="start">
                    {error && (
                        <Text alignSelf={'center'} color="red.500" fontWeight={'bold'}>
                            {error.message}
                        </Text>
                    )}
                    <Field
                        label="Username"
                        required
                        disabled={isSubmitting}
                        invalid={!!errors.username}
                        errorText={errors.username?.message}>
                        <Input
                            id="username"
                            autoFocus
                            size="xl"
                            autoComplete="username"
                            {...register('username')}
                        />
                    </Field>
                    <Field
                        label="Password"
                        required
                        invalid={!!errors.password}
                        errorText={errors.password?.message}>
                        <PasswordInput id="password" size="xl" {...register('password')} />
                    </Field>
                    <Link>Forgot password?</Link>
                </VStack>
            </Card.Body>
            <Card.Footer>
                <VStack w="100%" align="start">
                    <Button
                        disabled={!isValid}
                        loading={isSubmitting}
                        loadingText="Signing you in..."
                        type="submit"
                        w="100%"
                        variant="solid"
                        size="xl"
                        colorPalette={'pink'}>
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
