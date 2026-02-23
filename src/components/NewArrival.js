import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const NewArrival = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbXoYlsPTiWmNLSDDvL2eE4KwLYjN2oHOSneLYctTDtFk-u98CiRSpoN2htYf5mtmPwUAf5kkhes4V/pub?output=csv";

    Papa.parse(sheetUrl, {
      download: true,
      header: true,
      complete: (results) => {
        // Filter: checks if featured key is exactly "yes" (ignoring uppercase/lowercase)
        const filtered = results.data.filter(
          item => item.featured?.toLowerCase() === 'yes'
        );
        setFeaturedProducts(filtered);
      },
    });
  }, []);

  // Timer to automatically rotate the carousel every 5 seconds
  useEffect(() => {
    if (featuredProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredProducts]);

  // If data is still loading or no featured items exist
  if (featuredProducts.length === 0) return null;

  const currentItem = featuredProducts[currentIndex];

  return (
    <section className="bg-amber-400 rounded-[40px] p-16 flex justify-between items-center mb-12 relative overflow-hidden shadow-lg transition-all duration-700">
      {/* Text Content */}
      <div className="max-w-md z-10">
        <p className="font-bold text-sm mb-2 text-amber-900 uppercase tracking-widest">
          Featured Release ({currentIndex + 1}/{featuredProducts.length})
        </p>
        <h2 className="text-6xl font-black mb-8 leading-tight text-gray-900 uppercase">
          {currentItem.name.split(' ').map((word, i) => (
            <React.Fragment key={i}>{word} <br/></React.Fragment>
          ))}
        </h2>
        <button className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
          Buy for ${currentItem.price}
        </button>
      </div>

      {/* Dynamic Image/Icon Background */}
{/* Dynamic Image/Icon Background */}
<div className="absolute -right-5 -bottom-5 rotate-12 transition-all duration-1000 w-[400px] h-[400px] flex items-center justify-center">
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
      
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredProducts.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-black' : 'w-2 bg-black/20'}`}
          />
        ))}
      </div>
    </section>
  );
};