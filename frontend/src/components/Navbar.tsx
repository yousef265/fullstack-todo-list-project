import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../public/logo.webp";
import { AuthLinks, UnAuthLinks } from "../data";
import Button from "./ui/Button";
import { memo } from "react";

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
    const { pathname } = useLocation();
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const logout = () => {
        localStorage.removeItem(storageKey);
        setTimeout(() => {
            window.location.replace(pathname);
        }, 1000);
    };

    return (
        <Disclosure as="nav" className="bg-[#343A40] rounded-lg max-w-4xl mx-auto">
            <div className="px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>

                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/">
                            <img alt="Todo Logo" src={logo} className="h-10" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex space-x-4">
                        {(userData ? AuthLinks : UnAuthLinks).map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.to}
                                className={({ isActive }) =>
                                    classNames(isActive ? "bg-indigo-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "rounded-md px-3 py-2 text-sm font-medium")
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        {userData && (
                            <Button size="sm" onClick={logout}>
                                Logout
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3">
                    {(userData ? AuthLinks : UnAuthLinks).map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) =>
                                classNames(isActive ? "bg-indigo-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-md px-3 py-2 text-sm font-medium")
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    {userData && (
                        <Button size="sm" onClick={logout}>
                            Logout
                        </Button>
                    )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
};

export default memo(Navbar);
