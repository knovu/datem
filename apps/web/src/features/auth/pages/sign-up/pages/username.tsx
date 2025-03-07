import * as yup from 'yup';
import { Card, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@src/features/auth/context';
import { Button, Field } from '@src/components';
import { toLower } from 'lodash';
import useCheckUsername from './useCheckUsername';
import { PROGRESS_FIRST_NAME } from '@src/constants';

const schema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username is required')
        .email('Username must be a valid email')
        .required(),
});

type FormValues = yup.InferType<typeof schema>;

const Email = () => {
    const ctx = useSignUp();
    const nav = useNavigate();
    const { checkUsername } = useCheckUsername();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: ctx.username,
        },
    });

    const onFormSubmit = handleSubmit((data) => {
        const { username } = data;
        const lowerCaseUsername = toLower(username);

        // Check if email exists
        return checkUsername(lowerCaseUsername).then((res) => {
            if (res.data) {
                const { usernameExists } = res.data;

                if (usernameExists === false) {
                    nav('/auth/sign-up/first-name');
                    ctx.onUpdateState('username', lowerCaseUsername);
                    ctx.onUpdateState('progress', PROGRESS_FIRST_NAME);
                } else {
                    setError('username', {
                        message: 'Username already exists',
                    });
                }
            }
        });
    });

    return (
        <VStack
            className={cx('username')}
            data-testid={dt('username')}
            h="100%"
            w="100%"
            spaceY={5}>
            <Card.Root
                onSubmit={onFormSubmit}
                className={cx('username-form')}
                data-testid={dt('username-form')}
                variant={'elevated'}
                as="form"
                size={{ base: 'sm', sm: 'md' }}>
                <Card.Header>
                    <VStack>
                        <Card.Title fontSize={'2xl'} textAlign={'center'}>
                            Let's get you an account, start by typing in your email
                        </Card.Title>
                    </VStack>
                </Card.Header>
                <Card.Body>
                    <Field
                        required
                        disabled={isSubmitting}
                        invalid={!!errors.username}
                        errorText={errors.username?.message}>
                        <Input
                            id="username"
                            placeholder="Enter your email"
                            autoFocus
                            size="xl"
                            autoComplete="username"
                            {...register('username')}
                        />
                    </Field>
                </Card.Body>
                <Card.Footer>
                    <VStack w="100%">
                        <Button
                            disabled={!isValid}
                            loading={isSubmitting}
                            loadingText="Verifying email..."
                            type="submit"
                            w="100%"
                            variant="solid"
                            size="xl"
                            colorPalette={'pink'}>
                            Next
                        </Button>

                        <HStack fontSize="sm">
                            <Text>Already have an account?</Text>
                            <Button
                                variant="ghost"
                                px={2}
                                py={1}
                                colorPalette={'pink'}
                                onClick={() => {
                                    ctx.onResetState();
                                    nav('/auth/sign-in');
                                }}>
                                Sign in
                            </Button>
                        </HStack>
                    </VStack>
                </Card.Footer>
            </Card.Root>
        </VStack>
    );
};

export default Email;
