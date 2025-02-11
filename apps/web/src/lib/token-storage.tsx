import { merge } from 'lodash';

export interface TokenStorageState {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    tokenType: string;
}

export interface TokenStorageOptions {
    /**
     * Sets the key to be used for tokens within the local storage
     *
     * @default `tokens`
     */
    tokenStorageKey?: string;
}

export interface ITokenStorage {}

export class TokenStorage {
    // Internalizes the default token storage state
    private readonly DEFAULT_TOKEN_STORAGE_STATE: TokenStorageState = {
        accessToken: '',
        expiresIn: -1,
        refreshToken: '',
        tokenType: 'Bearer',
    };

    // Initializes the default token state
    private tokenStorageKey: string = 'tokens';

    constructor(options?: TokenStorageOptions) {
        if (options) {
            const { tokenStorageKey } = options;

            if (tokenStorageKey) this.tokenStorageKey = tokenStorageKey;
        }
    }

    public init() {
        try {
            // Get the default state
            const state = this.getState();
            this.setState(state);
        } catch {
            this.setState(this.DEFAULT_TOKEN_STORAGE_STATE);
        }
    }

    public get accessToken(): string {
        const state = this.getState();
        return state.accessToken;
    }

    public get expiresIn(): number {
        const state = this.getState();
        return state.expiresIn;
    }

    public get refreshToken(): string {
        const state = this.getState();
        return state.refreshToken;
    }

    public get tokenType(): string {
        const state = this.getState();
        return state.tokenType;
    }

    public setState(value: TokenStorageState) {
        const state: TokenStorageState = merge(value);

        const stringifiedTokenStorage = JSON.stringify(state);
        localStorage.setItem(this.tokenStorageKey, stringifiedTokenStorage);
    }

    private getState(): TokenStorageState {
        const tokenStorage = localStorage.getItem(this.tokenStorageKey);

        if (!tokenStorage) {
            throw new Error(
                `Token storage not found within the local storage by key '${this.tokenStorageKey}'.`,
            );
        }

        const tokenState: TokenStorageState = JSON.parse(tokenStorage);

        return tokenState;
    }

    public clear() {
        this.setState(this.DEFAULT_TOKEN_STORAGE_STATE);
    }
}
