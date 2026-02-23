export const Header = ({ onSearch }) => (
  <header className="flex justify-between items-center mb-10">
    <h1 className="text-3xl font-black tracking-tighter uppercase text-gray-800">Electronic Store</h1>
    
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

      <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
        {/* You can add a profile image here later */}
      </div>
    </div>
  </header>
);