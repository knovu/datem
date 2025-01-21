import { PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';

export type GraphQLProviderProps = PropsWithChildren;

const GraphQLProvider = (props: GraphQLProviderProps) => {
    const { children } = props;

    return <ApolloProvider client={}></ApolloProvider>;
};

export default GraphQLProvider;
