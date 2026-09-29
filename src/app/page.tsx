"use client";

import React, { useState } from "react";
import { ShoppingBag, Sparkles, Truck, ShieldCheck, Leaf, Star, Mail, Phone, MapPin, X, CheckCircle2, Zap, ArrowRight, Plus, Minus, Trash2 } from "lucide-react";

interface ProductItem {
  id: string;
  title: string;
  price: number;
  customFields?: {
    imageUrl?: string;
    description?: string;
    badge?: string;
    features?: string[];
  };
}

const INITIAL_PRODUCTS: ProductItem[] = [];

export default function SingleFileTenantStore() {
  const [products] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<{ id: string; title: string; price: number; imageUrl: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const addToCart = (product: ProductItem) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, {
        id: product.id,
        title: product.title,
        price: Number(product.price),
        imageUrl: product.customFields?.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.id === id) {
        const q = p.quantity + delta;
        return q > 0 ? { ...p, quantity: q } : null;
      }
      return p;
    }).filter(Boolean) as any);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Announcement Bar */}
      <div className="w-full py-2.5 px-4 text-center text-xs font-semibold text-indigo-200 bg-indigo-950/80 border-b border-indigo-500/20">
        ⚡ Free worldwide express delivery on all orders over $50 • 2-Year Warranty Included
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="font-extrabold text-xl text-white tracking-tight">Vanda Shop</div>
        <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white">
          <ShoppingBag className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
      </nav>

      {/* Hero */}
      <header className="py-20 px-6 max-w-6xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Premium Collection</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight">Vanda Shop</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Meticulously engineered products backed by full replacement warranty and 24/7 concierge support.
        </p>
      </header>

      {/* Products */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        <h2 className="text-2xl font-bold text-white mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(prod => (
            <div key={prod.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between p-4 space-y-4">
              <img src={prod.customFields?.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"} alt={prod.title} className="w-full aspect-[4/3] object-cover rounded-xl" />
              <div>
                <h3 className="font-bold text-lg text-white">{prod.title}</h3>
                <p className="text-sm text-slate-400 mt-1 line-clamp-2">{prod.customFields?.description || "High quality product."}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xl font-black text-white">${Number(prod.price).toFixed(2)}</span>
                <button onClick={() => addToCart(prod)} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white">Your Shopping Bag</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="glass-card p-3 rounded-xl flex items-center gap-3">
                  <img src={item.imageUrl} alt={item.title} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-indigo-400 font-semibold">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-slate-800"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-slate-800"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-800 pt-4 space-y-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => { setCheckoutDone(true); setCart([]); }} className="w-full py-3 rounded-xl bg-indigo-600 font-bold text-white">
                Checkout (${cartTotal.toFixed(2)})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-slate-500 border-t border-slate-800 mt-20">
        © 2026 Vanda Shop. Powered by WebBlock Engine (Next.js + Prisma).
      </footer>
    </div>
  );
}
