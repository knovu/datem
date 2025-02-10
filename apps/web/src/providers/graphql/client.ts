import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import config from '@src/config';
import { RestLink } from 'apollo-link-rest';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '@src/utils';
import { isError } from 'lodash';

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
    try {
        const accessToken = getAccessToken();

        return {
            headers: {
                ...headers,
                authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
        };
    } catch (err) {
        const errorMessage: string = isError(err)
            ? err.message
            : 'Unknown error occurred when setting authorization header.';

        // eslint-disable-next-line no-console
        console.error(errorMessage);

        return {
            headers,
        };
    }
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
