import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load the .env variables, ensuring they are prefixed with VITE_ for security
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react(), tsconfigPaths()],
        server: {
            port: toPort(env.PORT), // Use env instead of process.env
            open: true,
        },
    };
});
