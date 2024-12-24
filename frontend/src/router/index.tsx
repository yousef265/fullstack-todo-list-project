import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/layout";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import NotFoundPage from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const userDataString = localStorage.getItem("loggedInUser");
const userData = userDataString ? JSON.parse(userDataString) : null;

const routes = createRoutesFromElements(
    <>
        {/*  ROOT LAYOUT */}

        <Route path="/" element={<RootLayout />}>
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
        </Route>

        {/*  NOT FOUND PAGE */}

        <Route path="*" element={<NotFoundPage />} />
    </>
);

const router = createBrowserRouter(routes);

export default router;
