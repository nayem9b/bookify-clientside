import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../Common/Breadcrumbs';
import { motion } from 'framer-motion';

const seed = [
  { id: 1, name: 'Technology', count: 125, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, name: 'History', count: 89, image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, name: 'Business', count: 76, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, name: 'Fiction', count: 112, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, name: 'Philosophy', count: 143, image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, name: 'Self-help', count: 67, image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, name: 'Science', count: 54, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, name: 'Fantasy', count: 98, image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070e94?auto=format&fit=crop&w=1200&q=80' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const CategoriesPage = () => {
  const [categories] = useState(seed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" mb-6">
          <Breadcrumbs items={[{ to: '/', label: 'Home' }, { to: '/categories', label: 'Categories' }]} />
        </div>

        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 mt-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">Discover categories</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Browse curated categories with hand-picked collections, editor picks and trending books.</p>
        </motion.div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <input type="search" placeholder="Search categories" className="px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">Showing <span className="font-semibold text-gray-900">{categories.length}</span> categories</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm text-sm">Filter</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm text-sm">Create category</button>
          </div>
        </div>

        <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((c) => (
            <motion.article key={c.id} variants={item} whileHover={{ translateY: -6 }} className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow">
              <Link to={`/category/${c.name}`} className="block">
                <div className="relative h-64 sm:h-56 md:h-64 overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-4 bottom-6">
                    <h3 className="text-white text-2xl font-semibold tracking-tight">{c.name}</h3>
                    <p className="text-indigo-200 text-sm mt-1">{c.count} books</p>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-100">
                  <p className="text-sm text-gray-600">Curated collections, staff picks and trending books for {c.name}.</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-full text-sm shadow">Explore</span>
                    <span className="text-xs text-gray-400">Updated weekly</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoriesPage;
