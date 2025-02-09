import * as yup from 'yup';
import { Card, HStack, Icon, Separator, Text, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@src/features/auth/context';
import { Button, Field, PasswordInput, toaster } from '@src/components';
import { LuArrowLeft, LuX } from 'react-icons/lu';
import { PROGRESS_ORGANIZATION } from '@src/constants';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import useRegister from '../useRegister';

const schema = yup.object().shape({
    password: yup.string().min(1, 'Password is required').required(),
    confirmPassword: yup.string().min(1, 'Password is required').required(),
});

type FormValues = yup.InferType<typeof schema>;

const Password = () => {
    const ctx = useSignUp();
    const nav = useNavigate();
    const signUp = useRegister(() => {
        // Clear all state and local storage
        ctx.onResetState();
        toaster.success({
            title: 'Success',
            description: 'Account has been created!',
        });
        nav('/app/dashboard');
    });

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    // 👀 Watching password field
    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');

    // Password validation rules
    const meetsMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const passwordsMatch = password.length >= 8 && password === confirmPassword;

    const onFormSubmit = handleSubmit((data) => {
        const { password, confirmPassword } = data;
        const { username, firstName, lastName, phoneNumber, organization } = ctx;

        if (password !== confirmPassword) {
            setError('password', {
                message: 'Passwords do not match',
            });

            setError('confirmPassword', {});

            return;
        }

        // Need to make formal create account here
        signUp.register(username, firstName, lastName, phoneNumber, organization, password);
    });

    return (
        <VStack
            className={cx('password')}
            data-testid={dt('password')}
            h="100%"
            w="100%"
            spaceY={5}>
            <Card.Root
                w={{ sm: 400, md: 500, lg: 500 }}
                onSubmit={onFormSubmit}
                className={cx('password-form')}
                data-testid={dt('password-form')}
                variant={'elevated'}
                as="form">
                <Card.Header>
                    <VStack>
                        <Card.Title fontSize={'2xl'}>Type in your password</Card.Title>

                        {signUp.error && (
                            <Card.Description color={'red'} fontSize={'md'}>
                                {signUp.error.message}
                            </Card.Description>
                        )}
                    </VStack>
                </Card.Header>
                <Card.Body>
                    <VStack w="100%">
                        <Field
                            required
                            disabled={isSubmitting}
                            invalid={!!errors.password}
                            errorText={errors.password?.message}>
                            <PasswordInput
                                id="password"
                                placeholder="Enter your password"
                                autoFocus
                                size="xl"
                                {...register('password')}
                            />
                        </Field>

                        <Field
                            required
                            disabled={isSubmitting}
                            invalid={!!errors.confirmPassword}
                            errorText={errors.confirmPassword?.message}>
                            <PasswordInput
                                id="confirmPassword"
                                placeholder="Enter password again for confirmation"
                                size="xl"
                                {...register('confirmPassword')}
                            />
                        </Field>

                        <VStack align="start" gap={1} mt={2} w="100%">
                            <HStack>
                                <Icon
                                    color={meetsMinLength ? 'green.500' : 'red.500'}
                                    as={meetsMinLength ? BiCheckCircle : BiXCircle}
                                />
                                <Text>At least 8 characters</Text>
                            </HStack>
                            <HStack>
                                <Icon
                                    color={hasNumber ? 'green.500' : 'red.500'}
                                    as={hasNumber ? BiCheckCircle : BiXCircle}
                                />
                                <Text>Contains at least 1 number</Text>
                            </HStack>
                            <HStack>
                                <Icon
                                    color={passwordsMatch ? 'green.500' : 'red.500'}
                                    as={hasNumber ? BiCheckCircle : BiXCircle}
                                />
                                <Text>Passwords match</Text>
                            </HStack>
                        </VStack>
                    </VStack>
                </Card.Body>
                <Card.Footer>
                    <VStack w="100%">
                        <Button
                            disabled={!isValid}
                            loading={isSubmitting}
                            type="submit"
                            w="100%"
                            variant="solid"
                            size="xl"
                            colorPalette={'pink'}>
                            Create account
                        </Button>

                        <HStack w="100%">
                            <Separator flex="1" />
                            <Text flexShrink="0">or</Text>
                            <Separator flex="1" />
                        </HStack>

                        <HStack w="100%">
                            <Button
                                disabled={isSubmitting}
                                flex={1}
                                onClick={() => {
                                    ctx.onUpdateState('progress', PROGRESS_ORGANIZATION);
                                    nav('/auth/sign-up/organization');
                                }}>
                                <Icon as={LuArrowLeft} />
                                Back
                            </Button>
                            <Button
                                disabled={isSubmitting}
                                flex={1}
                                colorPalette={'pink'}
                                bgColor={'gray.400'}
                                _hover={{
                                    opacity: 0.7,
                                }}
                                onClick={() => {
                                    ctx.onResetState();
                                    nav('/auth/sign-in');
                                }}>
                                <Icon as={LuX} />
                                Cancel
                            </Button>
                        </HStack>
                    </VStack>
                </Card.Footer>
            </Card.Root>
        </VStack>
    );
};

export default Password;
