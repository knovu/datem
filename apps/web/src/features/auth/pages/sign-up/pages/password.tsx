import * as yup from 'yup';
import { Card, HStack, Icon, Separator, Text, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@src/features/auth/context';
import { Button, Field, PasswordInput } from '@src/components';
import { LuArrowLeft, LuX } from 'react-icons/lu';
import { PROGRESS_ORGANIZATION } from '@src/constants';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

const schema = yup.object().shape({
    password: yup.string().min(1, 'Password is required').required(),
    confirmPassword: yup.string().min(1, 'Password is required').required(),
});

type FormValues = yup.InferType<typeof schema>;

const Organization = () => {
    const ctx = useSignUp();
    const nav = useNavigate();

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

    // Password validation rules
    const meetsMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);

    const onFormSubmit = handleSubmit((data) => {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setError('password', {
                message: 'Passwords do not match',
            });

            setError('confirmPassword', {});

            return;
        }

        // Need to make formal create account here
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

                        {password && (
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
                            </VStack>
                        )}

                        <Field
                            required
                            disabled={isSubmitting}
                            invalid={!!errors.confirmPassword}
                            errorText={errors.confirmPassword?.message}>
                            <PasswordInput
                                id="confirmPassword"
                                placeholder="Enter password again for confirmation"
                                autoFocus
                                size="xl"
                                {...register('confirmPassword')}
                            />
                        </Field>
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
                                flex={1}
                                onClick={() => {
                                    ctx.onUpdateState('progress', PROGRESS_ORGANIZATION);
                                    nav('/auth/sign-up/organization');
                                }}>
                                <Icon as={LuArrowLeft} />
                                Back
                            </Button>
                            <Button
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

export default Organization;
