'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Main Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-transparent pointer-events-none">
                {/* Logo Area */}
                <div className="pointer-events-auto">
                    <Link href="/" className="text-xl font-serif font-bold text-white drop-shadow-lg">
                        GH <span className="italic text-vintage-gold">Vtg</span>
                    </Link>
                </div>

                {/* Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    className="pointer-events-auto w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group bg-black/20 backdrop-blur-md rounded-full border border-white/10"
                    aria-label="Menu"
                >
                    <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </nav>

            {/* Backdrop / Overlay */}
            <div
                className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            />

            {/* Sidebar Menu */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-8 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-10">
                        <span className="font-serif font-bold text-xl uppercase tracking-widest text-gray-400">Menu</span>
                        <button onClick={toggleMenu} className="p-2 text-gray-400 hover:text-black transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6">
                        <Link
                            href="/"
                            onClick={toggleMenu}
                            className="text-xl font-serif font-bold hover:text-vintage-gold transition-colors"
                        >
                            Catálogo
                        </Link>
                        <Link
                            href="#nosotros"
                            onClick={toggleMenu}
                            className="text-xl font-serif font-bold hover:text-vintage-gold transition-colors"
                        >
                            Nuestra Historia
                        </Link>

                        <div className="h-px bg-gray-100 my-2" />

                        <Link
                            href="/admin"
                            onClick={toggleMenu}
                            className="flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                        >
                            <span className="text-xl text-vintage-gold">✦</span> Acceso Admin
                        </Link>
                    </nav>

                    <div className="mt-auto">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Golden Haze Vintage</p>
                        <p className="text-xs text-gray-400 mt-1">Costa Rica, 2024</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
