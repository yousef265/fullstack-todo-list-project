import { TLoginName, TRegisterName } from "./../types/index";
export interface INavLinks {
    name: string;
    to: string;
}

export interface ILogin {
    name: TLoginName;
    placeholder: string;
    type: string;
}

export interface IRegister {
    name: TRegisterName;
    type: string;
    placeholder: string;
}

export interface IFormInput {
    username: string;
    email: string;
    password: string;
}

export interface IErrorResponse {
    error: {
        // details?: {
        //   errors: {
        //     message: string;
        //   }[];
        // };
        message?: string;
    };
}
