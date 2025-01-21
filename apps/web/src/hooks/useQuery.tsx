/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    useQuery as useApolloQuery,
    QueryHookOptions,
    QueryResult,
    OperationVariables,
    DocumentNode,
    TypedDocumentNode,
} from '@apollo/client';
import { toaster } from '@src/components';

/**
 * Custom hook that wraps around Apollo's useQuery and adds error handling with Chakra UI toasts.
 * @template TData - The type of the query data.
 * @template TVariables - The type of the query variables.
 * @param query - The GraphQL query document.
 * @param options - Apollo useQuery options.
 * @returns Apollo QueryResult with all the same functionality.
 */
export function useQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> {
    const result = useApolloQuery<TData, TVariables>(query, {
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

    return result;
}
