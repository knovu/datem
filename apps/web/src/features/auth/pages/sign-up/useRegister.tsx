import { gql } from '@apollo/client';
import { useMutation } from '@src/hooks';

type RegisterData = {
    register: {
        accessToken: string;
        expiresIn: number;
        refreshToken: string;
        tokenType: 'Bearer';
    };
};

type RegisterVars = {
    input: {
        username: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        organization: string;
        password: string;
    };
};

const REGISTER_GQL = gql`
    mutation Register($input: RegisterDto!) {
        register(input: $input) {
            accessToken
            expiresIn
            refreshToken
            tokenType
        }
    }
`;

const useRegister = (onCompleted?: (data?: RegisterData | null) => void) => {
    const [mutation, { data, ...results }] = useMutation<RegisterData, RegisterVars>(REGISTER_GQL, {
        onCompleted,
    });

    const register = (
        username: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        organization: string,
        password: string,
    ) =>
        mutation({
            variables: {
                input: {
                    username,
                    firstName,
                    lastName,
                    phoneNumber,
                    organization,
                    password,
                },
            },
        });

    return {
        ...results,
        register,
        data: data?.register ?? undefined,
    };
};

export default useRegister;
