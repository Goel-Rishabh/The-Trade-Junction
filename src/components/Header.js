export const Header = ({ onSearch, cartCount, onCartClick }) => (
  <header className="flex justify-between items-center mb-10">
    <div>
      <h1 className="text-3xl font-black tracking-tighter uppercase text-gray-800">ElectroHub</h1>
      <p className="text-xs uppercase text-gray-500 tracking-widest">Your trusted electronic marketplace</p>
    </div>
    
    <div className="flex gap-4 items-center flex-1 justify-end">
      {/* Search Bar */}
      <div className="relative w-full max-w-xs group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors">🔍</span>
        <input 
          type="text"
          placeholder="Search products..."
          className="w-full bg-white border border-gray-100 py-2 pl-12 pr-4 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all text-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <button onClick={onCartClick} className="relative bg-gray-100 px-4 py-2 rounded-full border border-gray-200 hover:bg-amber-100 transition-all text-sm font-semibold">
        🛒 Cart
        {cartCount > 0 && (
          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-black text-white bg-amber-500 rounded-full">{cartCount}</span>
        )}
      </button>
    </div>
  </header>
);