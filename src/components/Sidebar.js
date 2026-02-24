import { useState } from 'react';

// 1. Fix props destructuring: use ({ cart })
export const Sidebar = ({ cart = [], setCurrentView, currentView }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // 2. Calculate the total quantity of all items in the cart
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);

    return (
        <aside
            className={`${isExpanded ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 flex flex-col py-10 transition-all duration-300 fixed h-full z-50`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="flex items-center px-6 mb-10 gap-4">
                <div className="text-2xl font-black text-amber-800 italic min-w-[32px]">TTJ</div>
                {isExpanded && <span className="font-bold text-gray-800">The Trade Junction</span>}
            </div>

            <div className="flex flex-col gap-4 px-4">


                {/* Home Button */}
                <button
                    onClick={() => setCurrentView('home')}
                    className={`flex items-center gap-4 p-3 rounded-2xl transition-all group ${currentView === 'home' ? 'bg-amber-100' : 'hover:bg-amber-50'}`}
                >
                    <span className="text-xl">🏠</span>
                    {isExpanded && <span className="font-semibold text-gray-700">Home</span>}
                </button>

                {/* Cart Button */}
                <button
                    onClick={() => setCurrentView('cart')}
                    className={`flex items-center gap-4 p-3 rounded-2xl transition-all group relative ${currentView === 'cart' ? 'bg-amber-100' : 'hover:bg-amber-50'}`}
                >
                    <div className="relative">
                        <span className="text-xl">🛒</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    {isExpanded && <span className="font-semibold text-gray-700">Cart</span>}
                </button>



                <button onClick={() => setCurrentView('contactUs')} className="flex items-center gap-4 p-3 hover:bg-amber-50 rounded-2xl transition-all group">
                    <span className="text-xl group-hover:scale-110 transition-transform">📞</span>
                    {isExpanded && <span className="font-semibold text-gray-700">Contact Us</span>}
                </button>

            </div>
        </aside>
    );
};