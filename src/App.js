import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { NewArrival } from './components/NewArrival';
import { Products } from './components/Products';
import Papa from 'papaparse';
import { CartPage } from './components/CartPage';
import { ContactUs } from './components/ContactUs'
export default function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'cart' or 'contactUs'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');


  useEffect(() => {
    // Replace this URL with your "Published to Web" CSV link from Step 1
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbXoYlsPTiWmNLSDDvL2eE4KwLYjN2oHOSneLYctTDtFk-u98CiRSpoN2htYf5mtmPwUAf5kkhes4V/pub?output=csv";

    Papa.parse(sheetUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  const categories = ['all', ...Array.from(new Set(data.map((item) => item.category?.trim()).filter(Boolean)))];

  const onAddToCart = (item) => {
    setCart((prevCart) => {
      // 1. Check if the item is already in the cart
      const isItemInCart = prevCart.find((cartItem) => cartItem.id === item.id);

      if (isItemInCart) {
        // 2. If it exists, increment the quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      // 3. If it's new, add it with quantity 1
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      // 1. Find the item in the cart
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem?.quantity > 1) {
        // 2. If quantity > 1, decrement it
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }

      // 3. If quantity is 1 (or zero somehow), remove it from the array
      return prevCart.filter((cartItem) => cartItem.id !== item.id);
    });
  };

  const onImageClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f2f0] flex">
      <Helmet>
        <title>
          {selectedProduct?.['meta-title'] || selectedProduct?.metaTitle || 'The Trade Junction - Elevate Your Lifestyle & Home'}
        </title>
        <meta
          name="description"
          content={selectedProduct?.['meta-description'] || selectedProduct?.metaDescription || 'Shop a curated collection of high-quality watches, unique art pieces, elegant home decor, and must-have electronic accessories at The Trade Junction. Discover everything you need for your lifestyle in one place. Fast shipping and quality guaranteed.'}
        />
      </Helmet>
      {/* Pass cart and sidebar state to Sidebar */}
      <Sidebar
        cart={cart}
        setCurrentView={setCurrentView}
        currentView={currentView}
      />

      <main className="flex-1 ml-20 p-12 pb-32">
        <Header
          onSearch={setSearchQuery}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setCurrentView('cart')}
          categories={categories}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        {currentView === 'home' && (
          <>
            <NewArrival onAddToCart={onAddToCart} />            
            <Products
              searchQuery={searchQuery}
              onAddToCart={onAddToCart}
              onRemoveFromCart={removeFromCart}
              data={data}
              cart={cart}
              selectedProduct={selectedProduct}
              onImageClick={onImageClick}
              categoryFilter={categoryFilter}
            />
          </>
        )}

        {currentView === 'cart' && (
          <CartPage cart={cart} onAdd={onAddToCart} onRemove={removeFromCart} setView={setCurrentView} />
        )}

        {currentView === 'contactUs' && (
          <ContactUs cart={cart} />
        )}
      </main>


      {/* Pass cart to Footer */}
      <Footer cartItems={cart} setView={setCurrentView} />

      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 md:p-6" onClick={closeModal}>
          <div onClick={(e)=>e.stopPropagation()} className="relative bg-white rounded-3xl p-4 sm:p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <button onClick={closeModal} className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full p-2 bg-gray-100 hover:bg-gray-200">✕</button>
            <div className="h-full w-full overflow-y-auto max-h-[82vh] pr-1">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full max-h-[45vh] md:max-h-[50vh] object-contain rounded-2xl" />
              <div className="mt-4">
                <h3 className="text-2xl font-black text-gray-900">{selectedProduct.name}</h3>
                <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                {selectedProduct.highlightText ? (
                  <p className="mt-3 text-sm text-gray-700 font-medium border-l-4 border-amber-400 pl-3">
                    {selectedProduct.highlightText}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}