import { gql } from '@apollo/client';
import { useMutation } from '@src/hooks';

type SignInData = {
    login: {
        accessToken: string;
        expiresIn: number;
        refreshToken: string;
        tokenType: 'Bearer';
    };
};

type SignInVars = {
    input: {
        username: string;
        password: string;
    };
};

const SIGN_IN_GQL = gql`
    mutation Login($input: LoginDto!) {
        login(input: $input) {
            accessToken
            expiresIn
            refreshToken
            tokenType
        }
    }
`;

export const useSignIn = (onCompleted?: (data: SignInData) => void) => {
    const [mutation, { ...results }] = useMutation<SignInData, SignInVars>(SIGN_IN_GQL);

    const signIn = (username: string, password: string) =>
        mutation({
            onCompleted,
            variables: {
                input: {
                    username,
                    password,
                },
            },
        });

    return {
        ...results,
        signIn,
    };
};
