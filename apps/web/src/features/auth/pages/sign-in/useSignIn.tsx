import { gql, useMutation } from '@apollo/client';

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
    mutation Login($input: SignInDto!) {
        login(input: $input) {
            accessToken
            expiresIn
            refreshToken
            tokenType
        }
    }
`;

const useSignIn = () => {
    const [mutation, { data, ...results }] = useMutation<SignInData, SignInVars>(SIGN_IN_GQL);

    const signIn = (username: string, password: string) =>
        mutation({
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
        data: data?.login ?? undefined,
    };
};

export default useSignIn;
