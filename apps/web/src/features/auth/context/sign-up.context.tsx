import React, { createContext, useCallback, useContext, useState } from 'react';

export interface SignUpContextState {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    organization: string;
}

export interface SignUpContextReducers {
    onUpdateState: (key: keyof SignUpContextState, value: string) => void;
    onResetState: () => void;
}

const DEFAULT_CONTEXT: SignUpContextState = {
    email: localStorage.getItem('email') || '',
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    phoneNumber: localStorage.getItem('phoneNumber') || '',
    organization: localStorage.getItem('organization') || '',
};

export const SignUpContext = createContext<SignUpContextState | SignUpContextReducers>({
    ...DEFAULT_CONTEXT,
    onUpdateState: () => null,
    onResetState: () => null,
});

export const useSignUp = () => {
    const ctx = useContext(SignUpContext);

    if (!ctx) {
        throw new Error(
            'useSignUp must be used within SignUpProvider. Did you forget to wrap your component?',
        );
    }

    return ctx;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignUpProviderProps extends React.PropsWithChildren {}

export const SignUpProvider = (props: SignUpProviderProps) => {
    const { children } = props;
    const [state, setState] = useState<SignUpContextState>(DEFAULT_CONTEXT);

    const onUpdateState = useCallback(
        (key: keyof SignUpContextState, value: string) => {
            localStorage.localStorage.setItem(key, value);
            setState({ ...state, email: value });
        },
        [state],
    );

    const onResetState = useCallback(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('organization');
    }, []);

    return (
        <SignUpContext.Provider
            value={{
                ...state,
                onUpdateState,
                onResetState,
            }}>
            {children}
        </SignUpContext.Provider>
    );
};
