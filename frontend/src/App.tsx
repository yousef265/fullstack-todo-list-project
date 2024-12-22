import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";

interface IProps {}

function App({}: IProps) {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    );
}

export default App;
