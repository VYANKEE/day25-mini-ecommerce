import { useEffect, useState } from 'react';
import API from './api';
import { motion } from 'framer-motion';
import { ShoppingBag, PlusCircle, Loader, Sparkles, Trash2 } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // 1. Backend se products laane ka function
  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // 2. PURANA DATA SAAF KARNE KA FUNCTION (Reset)
  const resetStore = async () => {
    if(!confirm("Are you sure you want to delete ALL products?")) return;
    try {
      setUploading(true);
      await API.delete('/products/clear'); // Backend route call to delete all
      setProducts([]); // Screen se bhi turant hata do
      alert("🧹 Store Cleared! Now click 'Initialize Demo Data'");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed! Check if backend code has the delete route.");
    } finally {
      setUploading(false);
    }
  };

  // 3. NAYA DATA DALNE KA FUNCTION (Public Folder Images)
  const addDummyData = async () => {
    setUploading(true);
    const dummyProducts = [
      {
        name: "Cyberpunk Hoodie",
        price: 299,
        description: "LED integrated collar with reflective strips.",
        category: "Fashion",
        image: "/photo1.webp"  // ✅ Public folder se direct uthayega
      },
      {
        name: "Smart Neural Visor",
        price: 599,
        description: "AR overlay display with night vision.",
        category: "Tech",
        image: "/photo2.webp"  // ✅ Public folder se direct uthayega
      },
      {
        name: "Neon Genesis Sneakers",
        price: 450,
        description: "Gravity-defying soles with RGB lighting.",
        category: "Footwear",
        image: "https://i.pinimg.com/736x/3f/14/2a/3f142aaf0c95921cb07a7ea93ddc5721.jpg"
      },
      {
        name: "Holographic Backpack",
        price: 120,
        description: "Iridescent material shifts color.",
        category: "Accessories",
        image: "https://i.pinimg.com/736x/db/29/3e/db293e12f04b6b17d7d40c9012629676.jpg"
      },
      {
        name: "Minimalist Void Tee",
        price: 45,
        description: "Vantablack inspired dyes.",
        category: "Fashion",
        image: "https://i.pinimg.com/736x/2c/c3/b5/2cc3b56d1630c97b96856d792625b090.jpg"
      },
       {
        name: "Desk Plasma Core",
        price: 89,
        description: "Reactive energy sphere for your setup.",
        category: "Home",
        image: "https://i.pinimg.com/736x/19/c9/69/19c96933001bc4ec740bd6dc9934dc32.jpg"
      }
    ];

    try {
      for (const product of dummyProducts) {
        await API.post('/products', product);
      }
      alert("✨ Local Images Added! Refreshing...");
      fetchProducts();
    } catch (error) {
      alert("Error adding products!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-10 font-sans selection:bg-purple-500 selection:text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text flex items-center gap-3">
            AURA <Sparkles className="text-pink-400" /> STORE
          </h1>
          <p className="text-gray-400 mt-2 tracking-widest">PREMIUM CYBERPUNK AESTHETICS</p>
        </motion.div>

        {/* Buttons Section */}
        <div className="flex gap-4">
            {/* 1. RESET BUTTON (Laal wala) */}
            <button 
                onClick={resetStore}
                className="flex items-center gap-2 bg-red-600/10 border border-red-500/30 text-red-400 px-5 py-3 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
                <Trash2 size={18} /> Reset
            </button>

            {/* 2. ADD DATA BUTTON (Sirf jab khali ho) */}
            {products.length === 0 && !loading && (
            <button 
                onClick={addDummyData} 
                disabled={uploading}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-600 hover:border-transparent transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
            >
                {uploading ? <Loader className="animate-spin" /> : <PlusCircle />} 
                {uploading ? "Injecting..." : "Initialize Data"}
            </button>
            )}
        </div>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-purple-400 text-xl animate-pulse mt-20">Establishing secure connection...</p>}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center text-gray-500 mt-20 italic">
          System ready. Awaiting product ingestion.
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product, index) => (
          <motion.div 
            key={product._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -15 }}
            className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/50 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.4)] transition-all duration-500 group"
          >
            {/* Image Area */}
            <div className="h-80 overflow-hidden relative bg-[#050505]">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                 onError={(e) => {
                     e.target.onerror = null; 
                     e.target.src = 'https://via.placeholder.com/500x500/333/fff?text=Image+Not+Found'
                 }}
               />
               <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-xs border border-white/10 font-mono tracking-wider uppercase">
                 {product.category}
               </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{product.name}</h2>
              <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed">{product.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-3xl font-extrabold text-white">
                  <span className="text-purple-500">$</span>{product.price}
                </span>
                <button className="bg-white text-black p-4 rounded-full hover:bg-purple-500 hover:text-white transition-all transform hover:rotate-45 hover:shadow-lg active:scale-95">
                  <ShoppingBag size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App;