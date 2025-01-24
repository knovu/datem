/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    useLazyQuery as useApolloLazyQuery,
    LazyQueryHookOptions,
    QueryResult,
    OperationVariables,
    DocumentNode,
    TypedDocumentNode,
    LazyQueryExecFunction,
} from '@apollo/client';
import { toaster } from '@src/components';

/**
 * Custom hook that wraps around Apollo's useLazyQuery and adds error handling with Chakra UI toasts.
 * @template TData - The type of the query result data.
 * @template TVariables - The type of the query variables.
 * @param query - The GraphQL query document.
 * @param options - Apollo useLazyQuery options.
 * @returns A tuple of the lazy query function and its result.
 */
export function useLazyQuery<
    TData = any,
    TVariables extends OperationVariables = OperationVariables,
>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: LazyQueryHookOptions<TData, TVariables>,
): [LazyQueryExecFunction<TData, TVariables>, QueryResult<TData, TVariables>] {
    const [lazyQueryFunction, result] = useApolloLazyQuery<TData, TVariables>(query, {
        ...options,
        onError: (error) => {
            // Show a toast notification for any error
            toaster.create({
                title: 'Error',
                type: 'error',
                description: error.message,
                duration: 2000,
                placement: 'bottom-end',
            });

            // Call the user-provided onError callback, if any
            if (options?.onError) {
                options.onError(error);
            }
        },
    });

    return [lazyQueryFunction, result];
}
