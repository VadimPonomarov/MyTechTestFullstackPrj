export interface IInitialState {
    isAuth: boolean;
    loading: boolean;
    error: string | null;
}

export interface IToken {
    type: TokenTypeEnum;
    token: string
}

export enum TokenTypeEnum {
    'ACCESS' = 'ACCESS',
    'REFRESH' = 'REFRESH'
}

export interface ILoginInputs {
    email: string;
    password: string;
}

export interface IRegistrationInputs {
    email: string;
    password: string;
    confirmPassword?: string;
}