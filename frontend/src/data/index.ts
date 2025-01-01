import { ILogin, ILinks, IRegister } from "./../interfaces/index";

export const AuthLinks: ILinks[] = [
    {
        name: "Home",
        to: "/",
    },
    {
        name: "Todos",
        to: "todosList",
    },
];

export const UnAuthLinks: ILinks[] = [
    {
        name: "Login",
        to: "login",
    },
    {
        name: "Register",
        to: "register",
    },
];

export const LoginInputs: ILogin[] = [
    {
        name: "identifier",
        placeholder: "Email",
        type: "email",
    },

    {
        name: "password",
        placeholder: "Password",
        type: "password",
    },
];

export const RegisterInputs: IRegister[] = [
    {
        name: "username",
        placeholder: "userName",
        type: "text",
    },
    {
        name: "email",
        placeholder: "Email",
        type: "email",
    },
    {
        name: "password",
        placeholder: "Password",
        type: "password",
    },
];
