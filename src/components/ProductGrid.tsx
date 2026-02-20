import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const ProductGrid = ({ products }: ProductGridProps) => {
    if (products.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
            >
                <p className="text-vintage-brown/60 font-serif text-2xl italic">
                    No se encontraron tesoros en esta categoría...
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 px-2 md:px-8 pb-20"
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </motion.div>
    );
};

export default ProductGrid;
