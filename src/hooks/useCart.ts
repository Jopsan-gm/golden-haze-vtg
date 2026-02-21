import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export const useCart = () => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('gh_cart');
        if (stored) {
            setCart(JSON.parse(stored));
        }
    }, []);

    const addToCart = (product: Product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        localStorage.setItem('gh_cart', JSON.stringify(newCart));
    };

    const removeFromCart = (id: string) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
        localStorage.setItem('gh_cart', JSON.stringify(newCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('gh_cart');
    };

    const isInCart = (id: string) => cart.some(item => item.id === id);

    return { cart, addToCart, removeFromCart, clearCart, isInCart };
};
