export enum Env {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
}

export interface IConfig {
    env: Env;
    isProduction: boolean;
    apiUrl: string;
    gqlUrl: string;
}

export type id = string | number;
