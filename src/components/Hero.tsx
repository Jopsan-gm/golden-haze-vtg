import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
            {/* Background Overlay Effect */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 bg-[url('/images/Tienda%20Vintage.jpg')] bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-transparent" />

            <div className="relative z-10 text-center px-4 max-w-4xl">
                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-white font-sans uppercase tracking-[0.3em] text-sm mb-4 block drop-shadow-md"
                >
                    cada prenda merece otra vuelta!!
                </motion.span>

                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-5xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl leading-tight"
                >
                    Golden <span className="italic">haze Vtg</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-gray-200 text-lg md:text-xl font-sans max-w-xl mx-auto mb-8 leading-relaxed drop-shadow-lg"
                >
                    Prendas con alma. Descubre nuestra colección exclusiva de moda y nuestras piezas únicas.
                </motion.p>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
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
                </motion.div>
            </div>

            {/* Scroll Down Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <div className="w-px h-12 bg-white" />
            </motion.div>
        </section>
    );
};

export default Hero;
