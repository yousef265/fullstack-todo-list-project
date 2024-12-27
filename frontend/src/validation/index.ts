import * as yup from "yup";
import { ITodo } from "../interfaces";

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

/**
 * Validates a todo object to ensure its title and description meet specified criteria.
 *
 * This function checks the length and content of the `title` and `description` fields
 * in a todo object and returns an object containing validation error messages for
 * any invalid fields.
 *
 * @param {ITodo} todo - The todo object to validate.
 * @param {string} todo.title - The title of the todo, which must be between 5 and 50 characters.
 * @param {string} todo.description - The description of the todo, which must be between 10 and 200 characters.
 * @param {number | string} todo.id - The unique identifier of the todo.
 */

export const todoValidation = (todo: ITodo) => {
    const { description, title, id } = todo;
    const errors = {
        id,
        title: "",
        description: "",
    };

    if (!title.trim() || title.length < 5 || title.length > 50) {
        errors.title = "Todo title must be between 5 and 50 characters!";
    }

    if (!description.trim() || description.length < 10 || description.length > 200) {
        errors.description = "Todo description must be between 10 and 200 characters!";
    }

    return errors;
};
