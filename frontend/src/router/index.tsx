import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/layout";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import NotFoundPage from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import TodoListPage from "../pages/TodoList";
import ErrorHandler from "../components/errors/ErrorHandler";

const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const routes = createRoutesFromElements(
    <>
        {/*  ROOT LAYOUT */}

        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
            <Route
                index
                element={
                    <ProtectedRoute isAllowed={userData} redirectPath="/login">
                        <HomePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="login"
                element={
                    <ProtectedRoute isAllowed={!userData} redirectPath="/">
                        <LoginPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="register"
                element={
                    <ProtectedRoute isAllowed={!userData} redirectPath="/">
                        <RegisterPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="todosList"
                element={
                    <ProtectedRoute isAllowed={userData} redirectPath="/">
                        <TodoListPage />
                    </ProtectedRoute>
                }
            />
        </Route>

        {/*  NOT FOUND PAGE */}

        <Route path="*" element={<NotFoundPage />} />
    </>
);

const router = createBrowserRouter(routes);

export default router;
