import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/layout";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import NotFoundPage from "../pages/NotFound";

const routes = createRoutesFromElements(
    <>
        {/*  ROOT LAYOUT */}

        <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
        </Route>

        {/*  NOT FOUND PAGE */}

        <Route path="*" element={<NotFoundPage />} />
    </>
);

const router = createBrowserRouter(routes);

export default router;
