import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { NavLinks } from "../data";
import { useState } from "react";
import logo from "../../public/logo.webp";

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

    return (
        <Disclosure as="nav" className="bg-[#343A40] rounded-lg ">
            <div className="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button*/}

                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>

                    {/* Center Mode Section */}
                    <button type="button" className="absolute left-1/2 -translate-x-1/2" onClick={() => setIsDark((prev) => !prev)}>
                        {isDark ? <MoonIcon width={24} className="text-[#F8F9FA]" /> : <SunIcon width={24} className="text-[#F8F9FA]" />}
                    </button>

                    {/* Logo Section */}

                    <div className="flex absolute left-0 items-center bg-red-900">
                        <Link to={"/"}>
                            <img alt="Your Company" src={logo} className="h-10" />
                        </Link>
                    </div>

                    {/* Right Navigation Section */}

                    <div className=" flex absolute right-0 sm:items-stretch sm:justify-start rounded-lg">
                        <div className="hidden sm:block right-0 ">
                            <div className="flex space-x-4 ">
                                {NavLinks.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            classNames(isActive ? "bg-indigo-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-lg px-3 py-2 text-sm font-medium")
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Section */}

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {NavLinks.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) =>
                                classNames(isActive ? "bg-indigo-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block   rounded-md px-3 py-2 text-sm font-medium")
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
};

export default Navbar;
