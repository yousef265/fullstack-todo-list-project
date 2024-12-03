import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
    return (
        <>
            <div className="bg-gray-600">
                <div className="container space-y-5 py-5  min-h-screen">
                    <Navbar />

                    <div className="mx-2 relative">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default RootLayout;
