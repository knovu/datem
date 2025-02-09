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

export interface AuthLocalStorage {
    accessToken: string;
    expiresIn: string;
    refreshToken: string;
    tokenType: 'Bearer';
}
