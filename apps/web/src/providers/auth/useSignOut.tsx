import { gql } from '@apollo/client';
import { useMutation } from '@src/hooks';
import { clearTokenStorage, getRefreshToken } from '@src/utils';

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
        const refreshToken = getRefreshToken();

        mutation({
            onCompleted: (data) => {
                if (onCompleted) {
                    onCompleted(data);
                }

                // Clear the local storage tokens
                clearTokenStorage();

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
