/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    useMutation as useApolloMutation,
    MutationHookOptions,
    MutationTuple,
    DocumentNode,
    TypedDocumentNode,
    OperationVariables,
} from '@apollo/client';
import { toaster } from '@src/components';

/**
 * Custom hook that wraps around Apollo's useMutation and adds error handling with Chakra UI toasts.
 * @template TData - The type of the mutation result data.
 * @template TVariables - The type of the mutation variables.
 * @param mutation - The GraphQL mutation document.
 * @param options - Apollo useMutation options.
 * @returns Apollo MutationTuple with all the same functionality.
 */
export function useMutation<
    TData = any,
    TVariables extends OperationVariables = OperationVariables,
>(
    mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: MutationHookOptions<TData, TVariables>,
): MutationTuple<TData, TVariables> {
    const [mutateFunction, result] = useApolloMutation<TData, TVariables>(mutation, {
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

    return [mutateFunction, result];
}
