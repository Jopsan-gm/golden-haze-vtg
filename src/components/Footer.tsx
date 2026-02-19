import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                {/* Brand Section */}
                <div>
                    <h2 className="text-3xl font-serif mb-4 italic text-white">Golden haze Vtg</h2>
                    <p className="text-gray-400 font-sans leading-relaxed">
                        Redefiniendo el estilo con consciencia. Prendas vintage curadas para almas urbanas.
                    </p>
                </div>

                {/* Links Section */}
                <div className="flex flex-col items-center gap-4">
                    <h3 className="uppercase tracking-[0.2em] text-sm text-vintage-gold font-bold mb-2">Síguenos</h3>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-vintage-gold transition-colors"><Instagram /></a>
                        <a href="#" className="hover:text-vintage-gold transition-colors"><Twitter /></a>
                        <a href="#" className="hover:text-vintage-gold transition-colors"><Facebook /></a>
                    </div>
                </div>

                {/* Contact info */}
                <div className="md:text-right flex flex-col items-center md:items-end gap-2">
                    <h3 className="uppercase tracking-[0.2em] text-sm text-vintage-gold font-bold mb-2">Contacto</h3>
                    <p className="text-gray-400 font-medium">Cartago Turrialba, Costa Rica</p>
                    <p className="text-gray-400">+506 7279 5250</p>
                    <p className="mt-2 text-sm italic text-vintage-gold">goldenhazevtg@gmail.com</p>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-vintage-cream/10 text-center text-xs text-vintage-beige/40 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Golden haze Vtg. Hecho con amor y consciencia.
            </div>
        </footer>
    );
};

export default Footer;
