export const Footer = ({ cartItems, setView }) => {
    // 1. Calculate Total Price
    const totalPrice = cartItems.reduce((acc, item) => {
        const price = typeof item.price === 'string' 
            ? parseFloat(item.price.replace(/,/g, '')) 
            : item.price;
        return acc + (price * item.quantity);
    }, 0);

    // 2. Calculate Total Items
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // 3. Get preview logic
    const previewItems = cartItems.slice(0, 2);
    const remainingCount = totalQuantity > 2 ? totalQuantity - 2 : 0;

    const handleBuyNow = () => {
        if (cartItems.length > 0) {
            setView('cart'); // This changes the view in App.js
            window.scrollTo(0, 0); // Optional: scrolls to top when switching
        }
    };

    return (
        <footer className="fixed bottom-0 left-20 right-0 bg-gray-900 text-white p-4 flex justify-between items-center px-10 shadow-2xl z-50">
            <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Shopping Cart:</span>
                <div className="flex -space-x-2">
                    {previewItems.map((item, index) => (
                        <div 
                            key={item.id || index}
                            className={`w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center text-[10px] font-bold overflow-hidden bg-gray-700`}
                        >
                            {item.image ? (
                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white">{item.name?.charAt(0)}</span>
                            )}
                        </div>
                    ))}
                    
                    {remainingCount > 0 && (
                        <div className="w-8 h-8 bg-amber-500 text-black rounded-full border-2 border-gray-900 flex items-center justify-center text-[10px] font-bold">
                            +{remainingCount}
                        </div>
                    )}

                    {totalQuantity === 0 && (
                        <span className="text-gray-600 text-xs ml-4 font-medium italic">Your cart is empty</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="text-right">
                    <span className="text-gray-400 text-xs block uppercase tracking-wider">Total Price</span>
                    <span className="text-xl font-black font-mono text-amber-400">
                        ₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                </div>
                <button 
                    onClick={handleBuyNow} 
                    disabled={cartItems.length === 0}
                    className={`px-10 py-3 rounded-xl font-black transition-all transform active:scale-95 ${
                        cartItems.length === 0 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50' 
                        : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
                    }`}
                >
                    BUY NOW
                </button>
            </div>
        </footer>
    );
};