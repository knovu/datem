import config from '@src/config';
import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RestLink } from 'apollo-link-rest';

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

// GQL link for the api
const httpLink = new HttpLink({
    uri: config.gqlUrl,
    credentials: 'include',
});

// REST link for the api
const restLink = new RestLink({ uri: config.apiUrl, credentials: 'include' });

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, restLink, httpLink]),
    devtools: {
        enabled: !config.isProduction,
    },
});

export default client;
