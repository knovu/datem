import { User } from '@src/@types';
import { createContext, PropsWithChildren, useContext } from 'react';
import useQueryUser from './useQueryUser';
import { Spinner, VStack } from '@chakra-ui/react';

type AuthProviderProps = PropsWithChildren;

interface AuthContextValue {
    user: User;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error(
            'useAuth can only be used within an AuthProvider. Did you forget to wrap your component?',
        );
    }

    return ctx;
};

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const { data, loading } = useQueryUser();

    return (
        <AuthContext.Provider value={{ user: data as User }}>
            {loading ? (
                <VStack h="100vh" w="100%" align="center" justify="center">
                    <Spinner />
                </VStack>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
