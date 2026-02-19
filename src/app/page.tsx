'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { Category } from '@/types/product';

export default function Home() {
    const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

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

            <Hero />

            <section className="bg-white relative z-20 rounded-t-3xl shadow-xl min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <FilterBar
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    <ProductGrid products={filteredProducts} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
