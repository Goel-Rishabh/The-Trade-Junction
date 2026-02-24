import React from 'react';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';

export const ContactUs = ({ cart = [] }) => {
  const phoneNumber = "+91 99351 49346";
  const email = "goelrishabh99@gmail.com";

  // Shared function to format cart items for WhatsApp
  const getCartString = () => {
    return cart.length > 0 
      ? cart.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('%0A') 
      : "No items in cart";
  };

  const whatsappBaseUrl = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userName = formData.get('name');
    const userMsg = formData.get('message');
    const cartDetails = getCartString();

    // Construct the full message for the form button
    const fullMessage = `*New Inquiry from ${userName}*%0A%0A` +
                        `*Message:* ${userMsg}%0A%0A` +
                        `*Cart Items:*%0A${cartDetails}`;

    // Open WhatsApp
    window.open(`${whatsappBaseUrl}?text=${fullMessage}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Info */}
        <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-black mb-4 tracking-tighter">GET IN <span className="text-amber-400">TOUCH.</span></h1>
            <p className="text-gray-400 mb-6 font-medium">Have a question? We're here to help.</p>
            
            {/* Cart Preview Box */}
            <div className="bg-gray-800/50 p-4 rounded-2xl mb-8 border border-gray-700">
                <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest">Items in Inquiry</p>
                {cart.length > 0 ? (
                    <ul className="text-xs space-y-1 text-gray-300">
                        {cart.slice(0, 3).map((item, i) => (
                            <li key={i} className="truncate">{item.quantity}x {item.name}</li>
                        ))}
                        {cart.length > 3 && <li>+ {cart.length - 3} more items</li>}
                    </ul>
                ) : (
                    <p className="text-xs text-gray-500 italic">Your cart is empty</p>
                )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="p-3 bg-gray-800 rounded-2xl group-hover:bg-amber-400 group-hover:text-black transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Call Us</p>
                  <p className="text-md font-mono font-bold">{phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="p-3 bg-gray-800 rounded-2xl group-hover:bg-amber-400 group-hover:text-black transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Email Us</p>
                  <p className="text-md font-mono font-bold truncate">{email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <a 
              href={`${whatsappBaseUrl}?text=Hello! I have a general inquiry about the products in my cart.`} 
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black transition-all active:scale-95 shadow-lg shadow-green-900/20"
            >
              <MessageCircle size={20} /> WHATSAPP CHAT
            </a>
          </div>
        </div>

        {/* Right Side: Quick Message Form */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-black mb-6 text-gray-900">SEND A MESSAGE</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
              <input name="name" required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 focus:border-amber-400 outline-none transition-all font-medium" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Message</label>
              <textarea name="message" required rows="4" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 focus:border-amber-400 outline-none transition-all font-medium" placeholder="How can we help you today?"></textarea>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mb-4">
                <p className="text-[10px] text-amber-800 font-bold uppercase tracking-tight">Cart Attachment:</p>
                <p className="text-[11px] text-amber-700 font-medium">This will automatically list your {cart.length} items on WhatsApp.</p>
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-xl">
              SEND VIA WHATSAPP <Send size={18} className="text-amber-400" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};