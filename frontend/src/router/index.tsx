import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/layout";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import NotFoundPage from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const isAllowed: boolean = true;

const routes = createRoutesFromElements(
    <>
        {/*  ROOT LAYOUT */}

        <Route path="/" element={<RootLayout />}>
            <Route
                index
                element={
                    <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
                        <HomePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="login"
                element={
                    <ProtectedRoute isAllowed={!isAllowed} redirectPath="/">
                        <LoginPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="register"
                element={
                    <ProtectedRoute isAllowed={!isAllowed} redirectPath="/">
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
