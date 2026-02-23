import React, { useState, useEffect } from 'react';

import { ProductTile } from './ProductTile';

export const Products = ({data, searchQuery, onAddToCart, onRemoveFromCart }) => {


    const filteredProducts = data.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {
                filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <ProductTile onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} item={item} index={index} />
                    ))
                )
                    :
                    (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-gray-400 font-bold text-xl uppercase italic">No products found matching "{searchQuery}"</p>
                        </div>
                    )

            }
        </div>
    );
};
