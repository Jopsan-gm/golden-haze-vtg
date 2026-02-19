import React from 'react';
import { Product } from '@/types/product';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link
            href={`/product/${product.id}`}
            className="group bg-white overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 rounded-sm"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070';
                    }}
                />

                {/* Promo Badge */}
                <div className="absolute top-2 left-0 bg-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-r-sm shadow-sm z-10">
                    PROMO XTRA
                </div>

                {product.is_sold_out && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                        <span className="text-white uppercase text-xs font-bold border-2 border-white px-2 py-1 transform -rotate-12">
                            Agotado
                        </span>
                    </div>
                )}
            </div>

            {/* Info Container */}
            <div className="p-3">
                <h3 className="text-sm text-gray-800 line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
                    {product.name}
                </h3>

                <div className="flex flex-col gap-1">
                    <div className="text-vintage-gold font-bold text-lg">
                        ₡{product.price.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                        {product.category}
                    </span>
                </div>

                <div className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-black text-white hover:bg-vintage-brown transition-colors text-xs font-bold uppercase tracking-wider rounded-sm">
                    <MessageCircle className="w-4 h-4" />
                    Lo quiero
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
