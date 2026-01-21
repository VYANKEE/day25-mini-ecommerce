import { useEffect, useState, useRef } from 'react';
import API from './api';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShoppingBag, PlusCircle, Loader, Sparkles, Trash2, ShoppingCart, X, Minus, Plus, ArrowLeft, CheckCircle, ArrowRight, Zap, Globe, ShieldCheck, Star, Users, Cpu } from 'lucide-react';

// ==============================================
// 1. LANDING PAGE (CINEMATIC EXPERIENCE V2)
// ==============================================
const LandingPage = ({ onEnter }) => {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yCards = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scaleText = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.3),_rgba(0,0,0,1))] animate-pulse -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>
        
        <motion.div style={{ y: yHero }} className="text-center z-10 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
               <span className="px-3 py-1 border border-purple-500/50 rounded-full text-xs uppercase tracking-widest text-purple-400 bg-purple-900/10 backdrop-blur-md">
                 v2.0 System Online
               </span>
            </motion.div>

            <motion.h1 
              style={{ scale: scaleText }}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "circOut" }}
              className="text-8xl md:text-[12rem] font-black tracking-tighter leading-[0.8] bg-gradient-to-b from-white via-gray-400 to-gray-900 text-transparent bg-clip-text"
            >
              AURA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="text-xl md:text-2xl text-gray-400 mt-6 tracking-[0.3em] uppercase"
            >
              Redefining Digital Commerce
            </motion.p>
        </motion.div>

        {/* Floating Abstract Elements */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></motion.div>
      </div>

      {/* --- MARQUEE STRIP --- */}
      <div className="bg-white py-6 overflow-hidden rotate-[-1deg] border-y-4 border-purple-500 relative z-20 shadow-[0_0_50px_rgba(168,85,247,0.5)]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
          className="whitespace-nowrap flex gap-10 text-5xl font-black text-black uppercase"
        >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="flex items-center gap-4">
                    FUTURE <Zap fill="black" /> AESTHETIC <Star fill="black" /> PREMIUM <Cpu fill="black" />
                </span>
            ))}
        </motion.div>
      </div>

      {/* --- TRENDING SHOWCASE (NEW) --- */}
      <div className="py-32 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center"><span className="text-purple-500">TRENDING</span> ARTIFACTS</h2>
              
              <motion.div style={{ y: yCards }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { img: "/photo1.webp", title: "Cyber Hoodie", price: "$299" },
                      { img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80", title: "Neon Kicks", price: "$450" },
                      { img: "/photo2.webp", title: "Neural Visor", price: "$599" },
                  ].map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -20, scale: 1.05 }}
                        className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                      >
                          <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                          <div className="absolute bottom-6 left-6">
                              <h3 className="text-3xl font-bold">{item.title}</h3>
                              <p className="text-purple-400 font-mono text-xl">{item.price}</p>
                          </div>
                      </motion.div>
                  ))}
              </motion.div>
          </div>
      </div>

      {/* --- STATS SECTION (NEW) --- */}
      <div className="py-20 border-y border-white/10 bg-[#050505]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                  { num: "10K+", label: "Active Users", icon: <Users className="mx-auto mb-4 text-purple-500"/> },
                  { num: "99%", label: "Satisfaction", icon: <Star className="mx-auto mb-4 text-yellow-500"/> },
                  { num: "24/7", label: "Neural Support", icon: <Cpu className="mx-auto mb-4 text-blue-500"/> },
                  { num: "Global", label: "Shipping", icon: <Globe className="mx-auto mb-4 text-green-500"/> },
              ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                      {stat.icon}
                      <h4 className="text-4xl md:text-5xl font-black mb-2">{stat.num}</h4>
                      <p className="text-gray-500 uppercase tracking-wider text-sm">{stat.label}</p>
                  </motion.div>
              ))}
          </div>
      </div>

      {/* --- FINAL CTA & FOOTER --- */}
      <div className="h-screen flex flex-col justify-between pt-40 pb-10 px-6 relative">
            <div className="text-center z-10">
                <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-tight">Ready to Initialize <br/> Your Upgrade?</h2>
                <button 
                    onClick={onEnter}
                    className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full font-black text-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]"
                >
                    <span className="relative z-10">ENTER STORE</span>
                    <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
                    <div className="absolute inset-0 bg-purple-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
            </div>

            {/* Mega Footer */}
            <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-end text-gray-500">
                <div>
                    <h1 className="text-[5rem] md:text-[10rem] font-black text-white/5 leading-none -ml-2">AURA</h1>
                    <p>© 2026 Aura Systems Inc. All rights reserved.</p>
                </div>
                <div className="flex gap-6 mt-6 md:mt-0">
                    <span className="hover:text-white cursor-pointer">Instagram</span>
                    <span className="hover:text-white cursor-pointer">Twitter</span>
                    <span className="hover:text-white cursor-pointer">Discord</span>
                </div>
            </div>
      </div>
    </div>
  );
};


// ==============================================
// 2. SHOP COMPONENT (LOGIC SAME, UI TWEAKED)
// ==============================================
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState('home'); 
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  useEffect(() => {
    if (!userId) {
      const newId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("userId", newId);
      setUserId(newId);
    }
    fetchProducts();
    if(userId) fetchCart(userId);
  }, [userId]);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (error) { setLoading(false); }
  };

  const fetchCart = async (uid) => {
    try {
      const { data } = await API.get(`/cart/${uid || userId}`);
      setCartItems(data.products || []);
    } catch (error) { console.error(error); }
  };

  const updateQuantity = async (productId, amount) => {
    try {
      setCartItems(prevCart => {
        return prevCart.map(item => {
            if (item.productId._id === productId) {
              return { ...item, quantity: item.quantity + amount };
            }
            return item;
          })
          .filter(item => item.quantity > 0);
      });
      await API.post('/cart', { userId, productId, quantity: amount });
      fetchCart(userId); 
    } catch (error) { fetchCart(userId); }
  };

  const placeOrder = async () => {
    try {
      await API.post('/orders', { userId });
      setCartItems([]); 
      setView('success'); 
      setCartOpen(false); 
    } catch (error) { alert("Order failed!"); }
  };

  const resetStore = async () => {
    if(!confirm("Delete ALL products?")) return;
    try { await API.delete('/products/clear'); setProducts([]); } catch (e) {}
  };
  
  const addDummyData = async () => {
    setUploading(true);
    const dummyProducts = [
        { name: "Cyberpunk Hoodie", price: 299, description: "LED integrated collar.", category: "Fashion", image: "/photo1.webp" },
        { name: "Smart Neural Visor", price: 599, description: "AR overlay display.", category: "Tech", image: "/photo2.webp" },
        { name: "Neon Genesis Sneakers", price: 450, description: "Gravity-defying soles.", category: "Footwear", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80" },
        { name: "Holographic Backpack", price: 120, description: "Iridescent material.", category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
        { name: "Minimalist Void Tee", price: 45, description: "Vantablack inspired.", category: "Fashion", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80" },
        { name: "Desk Plasma Core", price: 89, description: "Reactive energy sphere.", category: "Home", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" }
    ];
    try { for (const p of dummyProducts) await API.post('/products', p); fetchProducts(); } 
    finally { setUploading(false); }
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.productId?.price * item.quantity), 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0a0a0a] text-white p-10 font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md p-4 rounded-b-2xl border-b border-white/5 shadow-2xl">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="cursor-pointer" onClick={() => setView('home')}>
          <h1 className="text-3xl font-black italic tracking-tighter flex items-center gap-2">
            AURA <span className="bg-white text-black px-2 text-sm not-italic rounded-sm">STORE</span>
          </h1>
        </motion.div>

        <div className="flex gap-4 items-center">
            <button onClick={() => setCartOpen(true)} className="relative bg-white/10 p-3 rounded-full hover:bg-white hover:text-black transition-all group">
                <ShoppingCart size={20} />
                {cartItems.length > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cartItems.length}</span>}
            </button>
            {products.length === 0 && !loading && (
                <>
                <button onClick={resetStore} className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white"><Trash2 size={18}/></button>
                <button onClick={addDummyData} disabled={uploading} className="bg-white/10 text-white px-6 py-2 rounded-full hover:bg-purple-600 text-sm font-bold">{uploading ? "LOADING..." : "INIT DATA"}</button>
                </>
            )}
        </div>
      </div>

      {/* SHOP VIEWS */}
      {view === 'home' && (
        <>
          {loading ? <div className="h-[50vh] flex items-center justify-center"><Loader className="animate-spin text-purple-500" size={40}/></div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product, index) => (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                  className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] transition-all group relative"
                >
                  <div className="h-80 overflow-hidden relative bg-[#050505]">
                     <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/10 uppercase tracking-widest">{product.category}</div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 leading-tight">{product.name}</h2>
                    <p className="text-gray-500 text-xs mb-6 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-2xl font-bold font-mono">${product.price}</span>
                      <button onClick={() => updateQuantity(product._id, 1)} className="bg-white text-black p-3 rounded-full hover:bg-purple-500 hover:text-white transition-all shadow-lg active:scale-90"><Plus size={20} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* CHECKOUT VIEW */}
      {view === 'checkout' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 hover:-translate-x-2 transition-transform"><ArrowLeft size={20} /> Back to Shopping</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-4xl font-bold mb-8">Checkout</h2>
                    <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
                         <div className="flex justify-between mb-6 text-gray-400 border-b border-white/10 pb-4"><span>Product</span><span>Subtotal</span></div>
                         <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar mb-6">
                            {cartItems.map(item => (
                                <div key={item._id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded bg-gray-800 overflow-hidden"><img src={item.productId?.image} className="w-full h-full object-cover"/></div>
                                        <div><p className="font-bold text-sm">{item.productId?.name}</p><p className="text-xs text-gray-500">x{item.quantity}</p></div>
                                    </div>
                                    <span className="font-mono">${item.productId?.price * item.quantity}</span>
                                </div>
                            ))}
                         </div>
                         <div className="flex justify-between text-2xl font-bold border-t border-white/10 pt-6"><span>Total</span><span className="text-purple-500">${cartTotal}</span></div>
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-bold mb-8">Details</h2>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); placeOrder(); }}>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" required className="bg-transparent border-b border-white/20 p-4 focus:border-purple-500 outline-none w-full transition-colors" />
                            <input type="text" placeholder="Last Name" required className="bg-transparent border-b border-white/20 p-4 focus:border-purple-500 outline-none w-full transition-colors" />
                        </div>
                        <input type="email" placeholder="Email Address" required className="bg-transparent border-b border-white/20 p-4 focus:border-purple-500 outline-none w-full transition-colors" />
                        <input type="text" placeholder="Shipping Address" required className="bg-transparent border-b border-white/20 p-4 focus:border-purple-500 outline-none w-full transition-colors" />
                        <button type="submit" className="w-full bg-white text-black py-5 rounded-full font-black text-xl hover:bg-purple-500 hover:text-white transition-all mt-8">CONFIRM PAYMENT</button>
                    </form>
                </div>
            </div>
        </motion.div>
      )}

      {/* SUCCESS VIEW */}
      {view === 'success' && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center mt-32 text-center">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500"><CheckCircle size={50} /></div>
            <h1 className="text-6xl font-bold mb-4">Payment Verified</h1>
            <p className="text-gray-400 text-xl mb-10 max-w-md">Your order ID #8X-992 has been queued for immediate dispatch.</p>
            <button onClick={() => setView('home')} className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all">Return to Store</button>
        </motion.div>
      )}

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"/>
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 flex flex-col">
                <div className="p-8 flex justify-between items-center border-b border-white/10">
                    <h2 className="text-3xl font-bold">Cart ({cartItems.length})</h2>
                    <button onClick={() => setCartOpen(false)} className="hover:rotate-90 transition-transform"><X /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                    {cartItems.length === 0 ? <div className="text-center text-gray-500 mt-20">Your cart is empty.</div> : (
                        cartItems.map((item) => (
                            <div key={item._id} className="flex gap-6 items-center">
                                <img src={item.productId?.image} className="w-24 h-32 object-cover rounded-xl bg-gray-900" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-xl mb-1">{item.productId?.name}</h3>
                                    <p className="text-purple-500 font-mono mb-4">${item.productId?.price}</p>
                                    <div className="flex items-center gap-4 bg-[#111] w-max px-3 py-2 rounded-lg border border-white/10">
                                        <button onClick={() => updateQuantity(item.productId._id, -1)} className="hover:text-white text-gray-500"><Minus size={16} /></button>
                                        <span className="w-6 text-center font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.productId._id, 1)} className="hover:text-white text-gray-500"><Plus size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="p-8 border-t border-white/10 bg-[#0f0f0f]">
                        <div className="flex justify-between items-center mb-6 text-xl font-bold"><span>Total</span><span>${cartTotal}</span></div>
                        <button onClick={() => { setCartOpen(false); setView('checkout'); }} className="w-full bg-white text-black py-5 rounded-xl font-black text-xl hover:bg-purple-600 hover:text-white transition-all">PROCEED TO CHECKOUT</button>
                    </div>
                )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ==============================================
// 3. MAIN WRAPPER
// ==============================================
function App() {
  const [entered, setEntered] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {!entered ? <motion.div key="landing" exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }}><LandingPage onEnter={() => setEntered(true)} /></motion.div> : <Shop />}
    </AnimatePresence>
  );
}

export default App;