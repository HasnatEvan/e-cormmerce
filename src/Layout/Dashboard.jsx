import { useState } from "react";
import {
    FaBars,
    FaBell,
    FaThLarge,
    FaCog,
    FaHome,
    FaClipboardList,
    FaLaptopHouse,
    FaBoxOpen,
    FaShoppingCart,
    FaUserCircle,
    FaTimes,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../src/assets/logo/logo.png";

/* 🔹 BOXED LINK STYLE */
const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition border
   ${isActive
        ? "bg-white text-slate-900 font-semibold border-white"
        : "text-gray-200 border-slate-700 hover:bg-slate-800 hover:border-slate-500"
    }`;

const DashboardNavbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* ================= TOP NAVBAR ================= */}
            <header className="w-full bg-slate-900 text-white flex items-center justify-between px-4 py-2 fixed top-0 z-30 shadow-md">
                {/* LOGO */}
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-11 w-auto mx-auto sm:mx-0 sm:ml-20"
                    />
                </div>

                {/* SEARCH */}
                <div className="hidden md:flex mx-auto w-full max-w-md relative">
                    <IoSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-slate-800 text-white placeholder-gray-400 rounded-full text-sm w-full outline-none"
                    />
                </div>

                {/* RIGHT ICONS */}
                <div className="flex items-center gap-4">
                    <FaBell className="cursor-pointer text-gray-200" />
                    <FaThLarge className="cursor-pointer hidden sm:block text-gray-200" />
                    <FaCog className="cursor-pointer hidden sm:block text-gray-200" />

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="Profile"
                        className="h-8 w-8 rounded-full border border-white/40"
                    />

                    {/* MOBILE MENU ICON */}
                    <FaBars
                        className="text-xl cursor-pointer sm:hidden"
                        onClick={() => setSidebarOpen(true)}
                    />
                </div>
            </header>

            {/* ================= OVERLAY (MOBILE) ================= */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ================= SIDEBAR ================= */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-slate-900 shadow-lg z-50 transform transition-transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0 sm:top-14 sm:h-[calc(100%-56px)]`}
            >
                {/* ===== MOBILE SIDEBAR HEADER ===== */}
                <div className="relative p-4 border-b border-slate-700 sm:hidden">
                    <h2 className="text-white text-lg font-semibold text-center">
                        Dashboard
                    </h2>

                    <FaTimes
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xl cursor-pointer"
                        onClick={() => setSidebarOpen(false)}
                    />
                </div>


                {/* NAV LINKS */}
                <nav className="flex flex-col min-h-full px-4 py-6 gap-6">
                    {/* ADMIN */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                            Admin
                        </p>

                        <NavLink to="/dashboard/admin" className={linkClass}>
                            <FaHome /> Admin Hub
                        </NavLink>

                        <NavLink to="/dashboard/add-product" className={linkClass}>
                            <FaBoxOpen /> New Product
                        </NavLink>

                        <NavLink to="/dashboard/manage-products" className={linkClass}>
                            <FaLaptopHouse /> Inventory
                        </NavLink>

                        <NavLink to="/dashboard/all-orders" className={linkClass}>
                            <FaClipboardList /> Orders
                        </NavLink>
                    </div>

                    {/* CUSTOMER */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                            Customer
                        </p>

                        <NavLink to="/dashboard/customer" className={linkClass}>
                            <FaUserCircle /> User Dashboard
                        </NavLink>

                        <NavLink to="/dashboard/my-orders" className={linkClass}>
                            <FaShoppingCart /> My Purchases
                        </NavLink>
                    </div>

                    {/* BOTTOM */}
                    <div className="mt-auto space-y-2 pt-4 border-t border-gray-700">
                        <NavLink to="/" className={linkClass}>
                            <FaHome /> Home
                        </NavLink>
                    </div>
                </nav>
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <main className="pt-14 sm:ml-64 bg-gray-50 min-h-screen p-4">
                <Outlet />
            </main>
        </>
    );
};

export default DashboardNavbar;
