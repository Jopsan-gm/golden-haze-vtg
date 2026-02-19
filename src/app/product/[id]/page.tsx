'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { Product } from '@/types/product';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { MessageCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ProductDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching product:', error);
            } else {
                setProduct(data);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-vintage-beige">
                <div className="text-center">
                    <h1 className="text-2xl font-serif text-vintage-brown mb-4">Producto no encontrado</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="text-vintage-gold underline uppercase tracking-widest text-sm"
                    >
                        Volver al catálogo
                    </button>
                </div>
            </div>
        );
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Top Nav */}
            <nav className="p-4 flex items-center gap-4 bg-white sticky top-0 z-50 border-b border-gray-100">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </button>
                <span className="font-bold text-sm uppercase tracking-widest text-gray-800 truncate">
                    {product.name}
                </span>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 md:gap-8 md:p-8">
                {/* Image Gallery */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img
                        src={product.images[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md backdrop-blur-sm"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md backdrop-blur-sm"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 focus:outline-none">
                        {product.images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentImageIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === i ? 'bg-black w-4' : 'bg-black/20'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Info Detail */}
                <div className="p-6 flex flex-col gap-6">
                    <div>
                        <span className="text-vintage-gold text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                            {product.category}
                        </span>
                        <h1 className="text-3xl font-serif text-gray-900 leading-tight mb-4">
                            {product.name}
                        </h1>
                        <div className="text-3xl font-bold text-gray-900">
                            ₡{product.price.toLocaleString()}
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 w-full" />

                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-gray-800 mb-3">Descripción</h3>
                        <p className="text-gray-600 leading-loose">
                            {product.description}
                        </p>
                    </div>

                    {/* WhatsApp Button Sticky on Mobile */}
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 md:static md:p-0 md:bg-transparent md:border-0 z-40">
                        <a
                            href={getWhatsAppLink(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 py-4 bg-black text-white hover:bg-vintage-brown transition-all duration-300 rounded-sm font-bold uppercase tracking-widest shadow-xl"
                        >
                            <MessageCircle className="w-6 h-6" />
                            Comprar por WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <div className="h-24 md:hidden" /> {/* Spacer for sticky button */}

            <Footer />
        </main>
    );
}
