import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

// Destructure onAddToCart from props
export const NewArrival = ({ onAddToCart }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbXoYlsPTiWmNLSDDvL2eE4KwLYjN2oHOSneLYctTDtFk-u98CiRSpoN2htYf5mtmPwUAf5kkhes4V/pub?output=csv";

    Papa.parse(sheetUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const filtered = results.data.filter(
          item => item.featured?.toLowerCase() === 'yes'
        );
        setFeaturedProducts(filtered);
      },
    });
  }, []);

  useEffect(() => {
    if (featuredProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredProducts]);

  if (featuredProducts.length === 0) return null;

  const currentItem = featuredProducts[currentIndex];

  return (
    <section className="bg-amber-400 rounded-[40px] p-16 flex justify-between items-center mb-12 relative overflow-hidden shadow-lg transition-all duration-700">
      <div className="max-w-md z-10">
        <p className="font-bold text-sm mb-2 text-amber-900 uppercase tracking-widest">
          Featured Release ({currentIndex + 1}/{featuredProducts.length})
        </p>
        <h2 className="text-6xl font-black mb-8 leading-tight text-gray-900 uppercase">
          {currentItem.name.split(' ').map((word, i) => (
            <React.Fragment key={i}>{word} <br/></React.Fragment>
          ))}
        </h2>
        {/* Updated Button with onClick */}
        <button 
          onClick={() => onAddToCart(currentItem)}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95 shadow-xl"
        >
          Add to Cart • ₹{currentItem.price}
        </button>
      </div>

      <div className="absolute -right-5 -bottom-5 rotate-12 transition-all duration-1000 w-[400px] h-[400px] flex items-center justify-center pointer-events-none">
        {currentItem.image ? (
          <img 
            src={currentItem.image} 
            alt="featured product" 
            className="w-full h-full object-contain opacity-40 mix-blend-multiply" 
          />
        ) : (
          <span className="text-[200px] opacity-20">🎧</span>
        )}
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredProducts.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-black' : 'w-2 bg-black/20'}`}
          />
        ))}
      </div>
    </section>
  );
};