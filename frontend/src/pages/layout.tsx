import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
    return (
        <>
            <div className=" bg-black">
                <div className="container space-y-5 min-h-svh bg-yellow-400 py-4">
                    <Navbar />
                    <div className="bg-blue-600 mx-2 ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default RootLayout;
