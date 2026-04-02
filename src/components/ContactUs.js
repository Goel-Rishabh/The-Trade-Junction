import React from 'react';
import { Phone, Mail, Send } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-[#111827] p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_55%)] pointer-events-none" />
        <h1 className="text-4xl font-black mb-2 tracking-tighter text-white">GET IN TOUCH</h1>
        <p className="text-gray-300 mb-8">Send a message with your details and cart summary in one place. WhatsApp will open automatically when you submit.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">Name</label>
            <input name="name" required type="text" className="w-full mt-1 bg-gray-900/80 border border-gray-700 text-white rounded-xl p-3 focus:border-amber-400 outline-none transition-all" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">Your Message</label>
            <textarea name="message" required rows="4" className="w-full mt-1 bg-gray-900/80 border border-gray-700 text-white rounded-xl p-3 focus:border-amber-400 outline-none transition-all" placeholder="How can we help you today?"></textarea>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm text-gray-700">
            Cart status: {cart.length > 0 ? `${cart.length} item(s) included` : 'No items yet. Add products to your cart before checkout.'}
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all active:scale-95">
            SEND MESSAGE VIA WHATSAPP <Send size={18} />
          </button>
        </form>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
          <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2">
            <Phone size={16} /> <span>{phoneNumber}</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2">
            <Mail size={16} /> <span>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};