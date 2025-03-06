import * as yup from 'yup';
import { Card, HStack, Icon, Input, Separator, Text, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@src/features/auth/context';
import { Button, Field } from '@src/components';
import { LuArrowLeft, LuX } from 'react-icons/lu';
import { PROGRESS_PASSWORD, PROGRESS_PHONE_NUMBER } from '@src/constants';

const schema = yup.object().shape({
    organization: yup.string().min(1, 'Organization is required').required(),
});

type FormValues = yup.InferType<typeof schema>;

const Organization = () => {
    const ctx = useSignUp();
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            organization: ctx.organization,
        },
    });

    const onFormSubmit = handleSubmit((data) => {
        const { organization } = data;
        ctx.onUpdateState('organization', organization);
        ctx.onUpdateState('progress', PROGRESS_PASSWORD);
        nav('/auth/sign-up/password');
    });

    return (
        <VStack
            className={cx('organization')}
            data-testid={dt('organization')}
            h="100%"
            w="100%"
            spaceY={5}>
            <Card.Root
                w={{ sm: 400, md: 500, lg: 500 }}
                onSubmit={onFormSubmit}
                className={cx('organization-form')}
                data-testid={dt('organization-form')}
                variant={'elevated'}
                as="form"
                size={{ base: 'sm', sm: 'md' }}>
                <Card.Header>
                    <VStack>
                        <Card.Title fontSize={'2xl'}>Type in your organization</Card.Title>
                    </VStack>
                </Card.Header>
                <Card.Body>
                    <Field
                        required
                        disabled={isSubmitting}
                        invalid={!!errors.organization}
                        errorText={errors.organization?.message}>
                        <Input
                            id="organization"
                            placeholder="Enter your organization"
                            autoFocus
                            size="xl"
                            autoComplete="organization"
                            {...register('organization')}
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
                                    ctx.onUpdateState('progress', PROGRESS_PHONE_NUMBER);
                                    nav('/auth/sign-up/phone-number');
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
