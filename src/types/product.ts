export type Category = 'Jackets' | 'Pants' | 'T-Shirts' | 'Accessories' | 'Dresses';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    isSoldOut?: boolean;
}
