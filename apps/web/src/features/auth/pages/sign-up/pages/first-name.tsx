import * as yup from 'yup';
import { Card, HStack, Icon, Input, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@src/features/auth/context';
import { Button, Field } from '@src/components';
import { LuArrowLeft, LuX } from 'react-icons/lu';
import { PROGRESS_LAST_NAME, PROGRESS_USERNAME } from '@src/constants';

const schema = yup.object().shape({
    firstName: yup.string().min(1, 'First name is required').required(),
});

type FormValues = yup.InferType<typeof schema>;

const FirstName = () => {
    const ctx = useSignUp();
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: ctx.firstName,
        },
    });

    const onFormSubmit = handleSubmit((data) => {
        const { firstName } = data;
        ctx.onUpdateState('firstName', firstName);
        ctx.onUpdateState('progress', PROGRESS_LAST_NAME);
        nav('/auth/sign-up/last-name');
    });

    return (
        <VStack
            className={cx('first-name')}
            data-testid={dt('first-name')}
            h="100%"
            w="100%"
            spaceY={5}>
            <VStack align="start" spaceY={5}>
                <HStack>
                    <Button
                        onClick={() => {
                            ctx.onUpdateState('progress', PROGRESS_USERNAME);
                            nav('/auth/sign-up/username');
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
                    className={cx('first-name-form')}
                    data-testid={dt('first-name-form')}
                    variant={'elevated'}
                    as="form">
                    <Card.Header>
                        <VStack>
                            <Card.Title fontSize={'2xl'}>Type in your first name</Card.Title>
                        </VStack>
                    </Card.Header>
                    <Card.Body>
                        <Field
                            required
                            disabled={isSubmitting}
                            invalid={!!errors.firstName}
                            errorText={errors.firstName?.message}>
                            <Input
                                id="firstName"
                                placeholder="Enter your first name"
                                autoFocus
                                size="xl"
                                autoComplete="firstName"
                                {...register('firstName')}
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

export default FirstName;
