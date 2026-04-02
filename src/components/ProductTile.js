
export const ProductTile = ({ onAddToCart, onRemoveFromCart, item, isSelected, onImageClick }) => {
    const { image, name, category, description, price, quantity } = item;
    const isInCart = quantity > 0;

    return (
        <div className={`bg-white p-6 rounded-[32px] shadow-sm border ${isSelected ? 'border-amber-500 shadow-lg scale-[1.01]' : 'border-gray-100 hover:shadow-md'} transition-all relative`}>
            {/* Optional: Quantity Badge */}
            {isInCart && (
                <div className="absolute top-4 right-4 bg-amber-400 text-black text-[10px] font-black px-2 py-1 rounded-lg z-10 shadow-sm">
                    {quantity} IN CART
                </div>
            )}

            <div onClick={onImageClick} className="h-48 rounded-2xl mb-4 overflow-hidden relative cursor-pointer border-2 border-transparent hover:border-amber-400 transition-all duration-300">
                {image ? (
                    <>
                        <div
                            className="absolute inset-0 bg-center bg-cover filter blur-xl scale-110"
                            style={{ backgroundImage: `url(${image})` }}
                        />
                        <img
                            src={image}
                            alt={name}
                            className="relative w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                        />
                    </>
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-5xl">💻</span>
                    </div>
                )}
            </div>

            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">{category}</p>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

            <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-gray-900">₹{price}</span>
                
                <div className="flex items-center gap-2">
                    {/* Only show minus button if item is in cart */}
                    {isInCart && (
                        <button 
                            onClick={() => onRemoveFromCart(item)} 
                            className="bg-gray-100 text-gray-800 w-10 h-10 rounded-xl font-bold hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center"
                        >
                            -
                        </button>
                    )}

                    <button 
                        onClick={() => onAddToCart(item)} 
                        className={`${
                            isInCart ? 'bg-amber-400 text-black shadow-md' : 'bg-gray-100 text-gray-800'
                        } w-10 h-10 rounded-xl font-bold hover:opacity-80 transition-all flex items-center justify-center`}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};