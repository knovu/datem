import { IConfig } from '@src/@types';
import { toEnv } from '@src/utils';

const config: IConfig = {
    env: toEnv(import.meta.env.MODE),
    isProduction: import.meta.env.PROD,
    apiUrl: import.meta.env.VITE_API_URL,
    gqlUrl: import.meta.env.VITE_GRAPHQL_URL,
};

export default config;
