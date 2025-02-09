import { gql } from '@apollo/client';
import { User } from '@src/@types';
import { useQuery } from '@src/hooks';

type QueryUserData = {
    user: User;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type QueryUserVars = {};

const QUERY_USER_GQL = gql`
    query User {
        user {
            id
            email
            firstName
            lastName
            phone
            createdAt
            updatedAt
            organization {
                id
                name
                createdAt
                updatedAt
            }
        }
    }
`;

const useQueryUser = (onCompleted?: (data: QueryUserData) => void) => {
    const { data, ...results } = useQuery<QueryUserData, QueryUserVars>(QUERY_USER_GQL, {
        fetchPolicy: 'no-cache',
        onCompleted,
    });

    return {
        ...results,
        data: data?.user ?? undefined,
    };
};

export default useQueryUser;
