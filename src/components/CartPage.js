export const CartPage = ({ cart, onAdd, onRemove, setView }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-8xl mb-6">🛒</span>
        <h2 className="text-3xl font-black uppercase text-gray-800">Your cart is empty</h2>
        <button 
          onClick={() => setView('home')}
          className="mt-6 bg-black text-white px-8 py-3 rounded-2xl font-bold hover:bg-amber-600 transition-colors"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-5xl font-black uppercase tracking-tighter text-gray-900">Your Selection</h2>
        <p className="text-amber-600 font-bold uppercase tracking-widest">{cart.length} Unique Items</p>
      </div>

      <div className="grid gap-6">
        {cart.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
            </div>
            
            <div className="flex-1">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">{item.category}</p>
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100">
                <button onClick={() => onRemove(item)} className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 hover:text-red-500">—</button>
                <span className="w-8 text-center font-black text-gray-900">{item.quantity}</span>
                <button onClick={() => onAdd(item)} className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 hover:text-amber-600">+</button>
              </div>
              <div className="text-right min-w-[100px]">
                <p className="text-2xl font-black text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer Section */}
      <div className="mt-12 bg-amber-400 p-10 rounded-[40px] flex justify-between items-center">
        <div>
          <p className="text-amber-900 font-bold uppercase tracking-widest opacity-70">Total Amount</p>
          <p className="text-6xl font-black text-gray-900">${total.toLocaleString()}</p>
        </div>
        <button className="bg-black text-white px-12 py-5 rounded-3xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">
          CHECKOUT NOW
        </button>
      </div>
    </div>
  );
};