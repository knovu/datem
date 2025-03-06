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

export interface Organization {
    id: id;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: id;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    organization: Organization;
    createdAt: Date;
    updatedAt: Date;
}
