export const ProductTile = ({onAddToCart, onRemoveFromCart, item, index}) => {


    const { image, name, category, description, price, quantity } = item
    console.log(quantity)
    return (
        <div key={index} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Image/Emoji from Excel */}
            <div className="h-48 bg-gray-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <span className="text-5xl">💻</span> // Fallback if no URL is found
                )}
            </div>

            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">{category}</p>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <p className="text-gray-400 text-sm mb-4">{description}</p>

            <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-gray-900">₹{price}</span>
                <button onClick={()=>{onAddToCart(item)}} className="bg-gray-100 text-gray-800 p-3 rounded-xl font-bold hover:bg-amber-100 transition-colors">+</button>
            </div>
        </div>
    )
}
