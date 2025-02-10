import { Env, TokenStorage } from '../@types';

/**
 * Converts a given string value to a valid port number.
 * If the value is not a string, not a valid number, or not within
 * the acceptable port range (0 to 65535), it throws an error.
 *
 * @param value - The string value representing the port.
 * @returns The valid port number as a number type.
 * @throws Will throw an error if the input is not a string, not a valid number,
 *         or not within the port range.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toPort = (value?: any): number => {
    const MAX_PORT = 65535;
    const MIN_PORT = 0;

    // Check if the value is not a string
    if (typeof value !== 'string') {
        throw new Error('Port value must be a string');
    }

    // Attempt to convert the string to a number
    const port = Number(value);

    // Check if the converted port is a valid number
    if (isNaN(port)) {
        throw new Error('Port value must be a valid number');
    }

    // Check if the port is within the valid range
    if (port < MIN_PORT || port > MAX_PORT) {
        throw new Error(`Port value must be between ${MIN_PORT} and ${MAX_PORT}`);
    }

    // Return the valid port number
    return port;
};

/**
 * Converts a given value to an environment type.
 * If the value does not match the expected criteria,
 * it defaults to `development`.
 *
 * @param value - The input value to be converted to an environment.
 * @returns The corresponding Env type, defaults to Env.DEVELOPMENT if the value is unsupported.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toEnv = (value: any): Env => {
    // Use a switch-case for clarity in handling different environment values
    switch (value) {
        case 'PRODUCTION':
        case 'production':
            return Env.PRODUCTION;

        case 'DEVELOPMENT':
        case 'development':
            return Env.DEVELOPMENT;

        default:
            throw new Error(`Unsupported environment value: ${value}. Defaulting to development.`);
    }
};

export const cx = (...classNames: string[]) => classNames.map((str) => `datem-${str}`).join(' ');

export const dt = (testId: string) => `datem-testId-${testId}`;

export const getAccessToken = (): string => {
    const tokenStorage = localStorage.getItem('tokens');

    if (!tokenStorage) {
        throw new Error('`tokens` object was not found within the local storage.');
    }

    const parsedTokens = JSON.parse(tokenStorage) as Partial<TokenStorage>;
    const accessToken: string | undefined = parsedTokens.accessToken;

    if (!accessToken) {
        throw new Error('`accessToken` was not found in local storage. Was it set properly?');
    }

    return accessToken;
};

export const getRefreshToken = (): string => {
    const tokenStorage = localStorage.getItem('tokens');

    if (!tokenStorage) {
        throw new Error('`tokens` object was not found within the local storage.');
    }

    const parsedTokens = JSON.parse(tokenStorage) as Partial<TokenStorage>;
    const refreshToken: string | undefined = parsedTokens.refreshToken;

    if (!refreshToken) {
        throw new Error('`refreshToken` was not found in local storage. Was it set properly?');
    }

    return refreshToken;
};

export const clearTokenStorage = (): boolean => {
    let isCleared: boolean = false;
    const tokenStorage = localStorage.getItem('tokens');

    if (tokenStorage) {
        localStorage.removeItem('tokens');
        isCleared = true;
    }

    return isCleared;
};
