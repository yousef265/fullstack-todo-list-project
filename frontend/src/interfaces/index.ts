import { AxiosRequestConfig } from "axios";
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

export interface IRegisterFormInput {
    username: string;
    email: string;
    password: string;
}

export interface ILoginFormInput {
    identifier: string;
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

export interface ITodo {
    id: number;
    title: string;
    description: string;
}

export interface IAuthenticatedQuery {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig;
}
