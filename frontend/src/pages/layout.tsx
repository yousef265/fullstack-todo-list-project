import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
    return (
        <>
            <div className="bg-gray-600">
                <div className="container space-y-5 py-5 min-h-screen">
                    <Navbar />
                    <div className="relative max-w-3xl mx-auto px-2">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default RootLayout;
