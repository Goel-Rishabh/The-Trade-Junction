import React from 'react';
import { ProductTile } from './ProductTile';
export const Products = ({ data, searchQuery, onAddToCart, onRemoveFromCart, cart, selectedProduct, onImageClick, categoryFilter }) => {

    const filteredProducts = data.filter((item) => {
        const matchesText =
          item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          categoryFilter === 'all' ||
          (item.category && item.category.toLowerCase() === categoryFilter.toLowerCase());

        return matchesText && matchesCategory;
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                    // Find if this specific product is in the cart to get its quantity
                    const cartItem = cart.find((c) => c.id === product.id);
                    const itemWithQuantity = { 
                        ...product, 
                        quantity: cartItem ? cartItem.quantity : 0 
                    };

                    return (
                        <ProductTile 
                            key={product.id || index} 
                            onAddToCart={onAddToCart} 
                            onRemoveFromCart={onRemoveFromCart} 
                            item={itemWithQuantity} 
                            isSelected={selectedProduct?.id === product.id}
                            onImageClick={() => onImageClick(product)}
                        />
                    );
                })
            ) : (
                <div className="col-span-full py-20 text-center">
                    <p className="text-gray-400 font-bold text-xl uppercase italic">
                        No products found matching "{searchQuery}"
                    </p>
                </div>
            )}
        </div>
    );
};
