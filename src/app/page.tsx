'use client';

import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { supabase } from '@/utils/supabase';
import { Product, Category } from '@/types/product';

export default function Home() {
    const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching products:', error);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    // Extract unique categories from products
    const categories: Category[] = Array.from(
        new Set(products.map((p) => p.category))
    );

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter((p) => p.category === activeCategory);

    return (
        <main className="min-h-screen">
            {/* Header/Nav would go here, omitting for simplicity or sticking to minimalist design */}
            <Navbar />
            <Hero />

            <section className="bg-white relative z-20 -mt-16 md:-mt-24 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <FilterBar
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    <ProductGrid products={filteredProducts} isLoading={loading} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
