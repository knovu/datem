import * as yup from 'yup';
import { Card, HStack, Icon, VStack } from '@chakra-ui/react';
import { cx, dt } from '@src/utils';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@src/features/auth/context';
import { Button, Field, PhoneInput } from '@src/components';
import { LuArrowLeft, LuX } from 'react-icons/lu';
import { PROGRESS_LAST_NAME, PROGRESS_ORGANIZATION } from '@src/constants';

const schema = yup.object().shape({
    phoneNumber: yup.string().min(1, 'Phone number is required').required(),
});

type FormValues = yup.InferType<typeof schema>;

const PhoneNumber = () => {
    const ctx = useSignUp();
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            phoneNumber: ctx.phoneNumber,
        },
    });

    const onFormSubmit = handleSubmit((data) => {
        const { phoneNumber } = data;
        ctx.onUpdateState('phoneNumber', phoneNumber);
        ctx.onUpdateState('progress', PROGRESS_ORGANIZATION);
        nav('/auth/sign-up/organization');
    });

    return (
        <VStack
            className={cx('phone-number')}
            data-testid={dt('phone-number')}
            h="100%"
            w="100%"
            spaceY={5}>
            <VStack align="start" spaceY={5}>
                <HStack>
                    <Button
                        onClick={() => {
                            ctx.onUpdateState('progress', PROGRESS_LAST_NAME);
                            nav('/auth/sign-up/last-name');
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
                    className={cx('phone-number-form')}
                    data-testid={dt('phone-number-form')}
                    variant={'elevated'}
                    as="form">
                    <Card.Header>
                        <VStack>
                            <Card.Title fontSize={'2xl'}>Type in your phone number</Card.Title>
                        </VStack>
                    </Card.Header>
                    <Card.Body>
                        <Field
                            required
                            disabled={isSubmitting}
                            invalid={!!errors.phoneNumber}
                            errorText={errors.phoneNumber?.message}>
                            <PhoneInput
                                id="phoneNumber"
                                placeholder="777-777-7777"
                                autoFocus
                                size="xl"
                                autoComplete="phoneNumber"
                                {...register('phoneNumber')}
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

export default PhoneNumber;
