import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';
import client from './client';

type Props = PropsWithChildren;

const GraphQLProvider = (props: Props) => {
    const { children } = props;

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
