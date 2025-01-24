import * as yup from 'yup';
import { Card, HStack, Icon, Input, VStack } from '@chakra-ui/react';
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
            data-testid={dt('last-organization')}
            h="100%"
            w="100%"
            spaceY={5}>
            <VStack align="start" spaceY={5}>
                <HStack>
                    <Button
                        onClick={() => {
                            ctx.onUpdateState('progress', PROGRESS_PHONE_NUMBER);
                            nav('/auth/sign-up/phone-number');
                        }}>
                        <Icon as={LuArrowLeft} />
                        Back
                    </Button>
                    <Button
                        colorPalette={'pink'}
                        onClick={() => {
                            ctx.onResetState();
                            nav('/auth/sign-in');
                        }}>
                        <Icon as={LuX} />
                        Cancel
                    </Button>
                </HStack>
                <Card.Root
                    onSubmit={onFormSubmit}
                    className={cx('organization-form')}
                    data-testid={dt('organization-form')}
                    variant={'elevated'}
                    as="form">
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
                    </Card.Footer>
                </Card.Root>
            </VStack>
        </VStack>
    );
};

export default Organization;
