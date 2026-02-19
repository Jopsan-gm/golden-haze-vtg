import { Product } from "@/types/product";

const PHONE_NUMBER = "50672795250";

export const getWhatsAppLink = (product: Product) => {
    const message = `Hola Golden haze Vtg! Me interesa este producto:
  
*${product.name}*
Precio: ₡${product.price}
${typeof window !== 'undefined' ? `Catálogo: ${window.location.href}` : ''}

¿Sigue disponible?`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
};
