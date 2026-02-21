export type Category = 'Jackets' | 'Pants' | 'T-Shirts' | 'Accessories' | 'Dresses';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    is_sold_out?: boolean;
    discount_price?: number;
    condition_rating?: number; // 1-10
    condition_notes?: string;
}
