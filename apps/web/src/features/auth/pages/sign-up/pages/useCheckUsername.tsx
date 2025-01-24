import { gql } from '@apollo/client';
import { useLazyQuery } from '@src/hooks';

type CheckUsernameData = {
    usernameExists: boolean;
};

type CheckUsernameVars = {
    username: string;
};

const CHECK_USERNAME_GQL = gql`
    query Query($username: String!) {
        usernameExists(username: $username)
    }
`;

const useCheckUsername = () => {
    const [query, { data, ...results }] = useLazyQuery<CheckUsernameData, CheckUsernameVars>(
        CHECK_USERNAME_GQL,
    );

    const checkUsername = (username: string) =>
        query({
            variables: {
                username,
            },
        });

    return {
        ...results,
        checkUsername,
        isUsernameUsed: data?.usernameExists ?? undefined,
    };
};

export default useCheckUsername;
