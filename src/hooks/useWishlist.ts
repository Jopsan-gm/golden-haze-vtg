import { useState, useEffect } from 'react';

export const useWishlist = () => {
    const [wishlist, setWishlist] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('gh_wishlist');
        if (stored) {
            setWishlist(JSON.parse(stored));
        }
    }, []);

    const toggleWishlist = (id: string) => {
        const newWishlist = wishlist.includes(id)
            ? wishlist.filter(item => item !== id)
            : [...wishlist, id];

        setWishlist(newWishlist);
        localStorage.setItem('gh_wishlist', JSON.stringify(newWishlist));
    };

    const isInWishlist = (id: string) => wishlist.includes(id);

    return { wishlist, toggleWishlist, isInWishlist };
};
