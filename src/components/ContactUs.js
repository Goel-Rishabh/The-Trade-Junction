import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

export const ContactUs = () => {
  const phoneNumber = "+91 73761 48354";
  const email = "goelrishabh99@gmail.com";

  return (
    <div className="max-w-4xl mx-auto mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Info */}
        <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-black mb-4 tracking-tighter">GET IN <span className="text-amber-400">TOUCH.</span></h1>
            <p className="text-gray-400 mb-10 font-medium">Have a question about your order or our products? We're here to help.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="p-3 bg-gray-800 rounded-2xl group-hover:bg-amber-400 group-hover:text-black transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Call Us</p>
                  <p className="text-lg font-mono font-bold">{phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="p-3 bg-gray-800 rounded-2xl group-hover:bg-amber-400 group-hover:text-black transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Email Us</p>
                  <p className="text-lg font-mono font-bold">{email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <a 
              href={`https://wa.me/${phoneNumber.replace(/\s+/g, '')}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black transition-all active:scale-95"
            >
              <MessageCircle size={20} /> WHATSAPP
            </a>
          </div>
        </div>

        {/* Right Side: Quick Message Form */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-black mb-6 text-gray-900">SEND A MESSAGE</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
              <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 focus:border-amber-400 outline-none transition-all font-medium" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Message</label>
              <textarea rows="4" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 focus:border-amber-400 outline-none transition-all font-medium" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95">
              SEND MESSAGE <Send size={18} className="text-amber-400" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};