import * as yup from 'yup';
import { Card, HStack, Icon, Input, Separator, Text, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@src/features/auth/context';
import { Button, Field } from '@src/components';
import { LuArrowLeft, LuX } from 'react-icons/lu';
import { PROGRESS_FIRST_NAME, PROGRESS_PHONE_NUMBER } from '@src/constants';

const schema = yup.object().shape({
    lastName: yup.string().min(1, 'Last name is required').required(),
});

type FormValues = yup.InferType<typeof schema>;

const LastName = () => {
    const ctx = useSignUp();
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            lastName: ctx.lastName,
        },
    });

    const onFormSubmit = handleSubmit((data) => {
        const { lastName } = data;
        ctx.onUpdateState('lastName', lastName);
        ctx.onUpdateState('progress', PROGRESS_PHONE_NUMBER);
        nav('/auth/sign-up/phone-number');
    });

    return (
        <VStack
            className={cx('last-name')}
            data-testid={dt('last-name')}
            h="100%"
            w="100%"
            spaceY={5}>
            <Card.Root
                w={{ sm: 400, md: 500, lg: 500 }}
                onSubmit={onFormSubmit}
                className={cx('last-name-form')}
                data-testid={dt('last-name-form')}
                variant={'elevated'}
                as="form">
                <Card.Header>
                    <VStack>
                        <Card.Title fontSize={'2xl'}>Type in your last name</Card.Title>
                    </VStack>
                </Card.Header>
                <Card.Body>
                    <Field
                        required
                        disabled={isSubmitting}
                        invalid={!!errors.lastName}
                        errorText={errors.lastName?.message}>
                        <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            autoFocus
                            size="xl"
                            autoComplete="lastName"
                            {...register('lastName')}
                        />
                    </Field>
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
                            Next
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
                                    ctx.onUpdateState('progress', PROGRESS_FIRST_NAME);
                                    nav('/auth/sign-up/first-name');
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

export default LastName;
