import { RouterProvider } from "react-router-dom";
import router from "./router";

interface IProps {}

function App({}: IProps) {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
