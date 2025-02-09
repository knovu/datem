import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import config from '@src/config';
import { RestLink } from 'apollo-link-rest';
import { setContext } from '@apollo/client/link/context';
import { AuthLocalStorage } from '@src/@types';

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            // eslint-disable-next-line no-console
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    // eslint-disable-next-line no-console
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

// We really should store this as a cookie
const authLink = setContext((_, { headers }) => {
    const auth = localStorage.getItem('auth');
    let accessToken: string | undefined = undefined;

    if (auth) {
        const parsedAuthStorage: AuthLocalStorage = JSON.parse(auth);
        accessToken = parsedAuthStorage.accessToken;
    }

    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});

const restLink = new RestLink({
    uri: config.apiUrl,
    credentials: 'include',
});

const httpLink = new HttpLink({
    uri: config.gqlUrl,
    credentials: 'include',
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, errorLink, restLink, httpLink]),
    devtools: {
        enabled: !config.isProduction,
    },
});

export default client;
