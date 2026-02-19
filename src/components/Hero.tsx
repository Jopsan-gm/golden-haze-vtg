import React from 'react';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
            {/* Background Overlay Effect - Using a thrift store image with a dark gradient overlay */}
            <div
                className="absolute inset-0 bg-[url('/images/Tienda%20Vintage.jpg')] bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-transparent" />

            <div className="relative z-10 text-center px-4 max-w-4xl">
                <span className="text-white font-sans uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in drop-shadow-md">
                    cada prenda merece otra vuelta!!
                </span>
                <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl leading-tight">
                    Golden <span className="italic">haze Vtg</span>
                </h1>
                <p className="text-gray-200 text-lg md:text-xl font-sans max-w-xl mx-auto mb-8 leading-relaxed drop-shadow-lg">
                    Prendas con alma. Descubre nuestra colección exclusiva de moda y nuestras piezas únicas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#catalogo"
                        className="px-8 py-4 bg-white text-slate-950 font-bold font-sans uppercase tracking-widest text-sm hover:bg-vintage-gold hover:text-white transition-all duration-300 shadow-xl"
                    >
                        Ver Catálogo
                    </a>
                    <a
                        href="#nosotros"
                        className="px-8 py-4 border-2 border-white text-white font-bold font-sans uppercase tracking-widest text-sm hover:bg-white hover:text-slate-950 transition-all duration-300 backdrop-blur-sm"
                    >
                        Nuestra Historia
                    </a>
                </div>
            </div>

            {/* Scroll Down Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-px h-12 bg-white" />
            </div>
        </section>
    );
};

export default Hero;
