import * as yup from "yup";

export const registerSchema = yup
    .object({
        username: yup.string().required("Username is required!").min(3, "Username should be at least 3 characters."),
        email: yup
            .string()
            .required("Email is required.")
            .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
        password: yup.string().required("Password is required.").min(6, "Password should be at least 6 characters."),
    })
    .required();

export const loginSchema = yup
    .object({
        identifier: yup
            .string()
            .required("Email is required.")
            .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
        password: yup.string().required("Password is required.").min(6, "Password should be at least 6 characters."),
    })
    .required();

export const todoValidation = (todo: { description: string; title: string }) => {
    const errors: { title: string; description: string } = {
        title: "",
        description: "",
    };

    if (!todo.title.trim() || todo.title.length < 5 || todo.title.length > 50) {
        errors.title = "Todo title must be between 5 and 50 characters!";
    }

    if (!todo.description.trim() || todo.description.length < 10 || todo.description.length > 200) {
        errors.description = "Todo description must be between 10 and 200 characters!";
    }

    return errors;
};
