import { Card, HStack, Input, Link, Separator, Text, VStack } from '@chakra-ui/react';
import { Button, Field, PasswordInput } from '@src/components';
import { cx, dt } from '@src/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { useSignIn } from '@src/providers';

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
    const nav = useNavigate();
    const { signIn, loading, error } = useSignIn((data) => {
        const { login: payload } = data;
        localStorage.setItem(
            'tokens',
            JSON.stringify({
                accessToken: payload.accessToken,
                expiresIn: payload.expiresIn,
                refreshToken: payload.refreshToken,
                tokenType: payload.tokenType,
            }),
        );
        nav('/app/dashboard');
    });

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

    const isLoading = isSubmitting || loading;

    const onFormSubmit = handleSubmit((data) => {
        const { username, password } = data;

        return signIn(username, password);
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        loading={isLoading}
                        loadingText="Verifying email..."
                        type="submit"
                        w="100%"
                        variant="solid"
                        size="xl"
                        colorPalette={'pink'}>
                        Sign in
                    </Button>

                    <Button
                        disabled={isLoading}
                        w="100%"
                        variant="outline"
                        size="xl"
                        colorPalette={'pink'}
                        onClick={(e) => {
                            e.preventDefault();
                            return signIn('a+test@knovu.com', 'Testing1234');
                        }}>
                        Test Account
                    </Button>

                    <HStack w="100%">
                        <Separator flex="1" />
                        <Text flexShrink="0">or</Text>
                        <Separator flex="1" />
                    </HStack>

                    <HStack fontSize="sm">
                        <Text>Don't have an account?</Text>
                        <Button
                            disabled={isLoading}
                            variant="ghost"
                            px={2}
                            py={1}
                            colorPalette={'pink'}
                            onClick={() => nav('/auth/sign-up/username')}>
                            Sign up
                        </Button>
                    </HStack>
                </VStack>
            </Card.Footer>
        </Card.Root>
    );
};

export default SignInForm;
