import { gql } from '@apollo/client';
import { useMutation } from '@src/hooks';
import { tokenStorage } from './token-storage';

type SignOutData = {
    logout: {
        success: boolean;
    };
};

type SignOutVars = {
    input: {
        refreshToken: string;
    };
};

const SIGN_OUT_GQL = gql`
    mutation Mutation($input: LogoutDto!) {
        logout(input: $input) {
            success
        }
    }
`;

export const useSignOut = (onCompleted?: (data: SignOutData) => void) => {
    const [mutation, { data, ...results }] = useMutation<SignOutData, SignOutVars>(SIGN_OUT_GQL);

    const signOut = () => {
        const refreshToken = tokenStorage.refreshToken;

        mutation({
            onCompleted: (data) => {
                if (onCompleted) {
                    onCompleted(data);
                }

                // Clear the local storage tokens
                tokenStorage.clear();

                return;
            },
            variables: {
                input: {
                    refreshToken,
                },
            },
        });
    };

    return {
        ...results,
        signOut,
        data: data?.logout ?? undefined,
    };
};
