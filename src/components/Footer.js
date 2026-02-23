export const Footer = (cartItems) => (
    <footer className="fixed bottom-0 left-20 right-0 bg-gray-900 text-white p-4 flex justify-between items-center px-10 shadow-2xl">
        <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Shopping Cart:</span>
            <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-amber-400 rounded-full border-2 border-gray-900"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-gray-900"></div>
                <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-gray-900 flex items-center justify-center text-[10px] font-bold">+2</div>
            </div>
        </div>
        <div className="flex items-center gap-8">
            <div>
                <span className="text-gray-400 text-xs block uppercase">Total Price</span>
                <span className="text-xl font-black font-mono text-amber-400">$2,447.00</span>
            </div>
            <button onClick={()=>{console.log(cartItems)}} className="bg-amber-500 hover:bg-amber-400 text-black px-10 py-3 rounded-xl font-black transition-all transform active:scale-95">
                BUY NOW
            </button>
        </div>
    </footer>
);

