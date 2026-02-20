import { Category } from '@/types/product';
import React from 'react';
import { motion } from 'framer-motion';

interface FilterBarProps {
    categories: Category[];
    activeCategory: Category | 'All';
    onCategoryChange: (category: Category | 'All') => void;
}

const FilterBar = ({ categories, activeCategory, onCategoryChange }: FilterBarProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 py-8 px-4"
            id="catalogo"
        >
            <button
                onClick={() => onCategoryChange('All')}
                className={`px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === 'All'
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-400 border border-gray-100'
                    }`}
            >
                Todo
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-400 border border-gray-100'
                        }`}
                >
                    {cat === 'Jackets' ? 'Chaquetas' :
                        cat === 'Pants' ? 'Pantalones' :
                            cat === 'T-Shirts' ? 'Camisetas' :
                                cat === 'Accessories' ? 'Accesorios' :
                                    cat === 'Dresses' ? 'Vestidos' : cat}
                </button>
            ))}
        </motion.div>
    );
};

export default FilterBar;
