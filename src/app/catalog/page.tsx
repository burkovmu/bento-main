'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { products, Product } from '@/data/products'
import { useCart } from '@/hooks/useCart'
import { Heart, ShoppingBag } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'

const categories = [
  'Все', 'Торты', 'Пирожные', 'Капкейки', 'Макаруны'
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  const handleFavoriteClick = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-32">
        {/* Заголовок и описание */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-gray-800 mb-6"
          >
            Каталог десертов
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Откройте для себя мир изысканных десертов, созданных с любовью и вниманием к каждой детали
          </motion.p>
        </div>

        {/* Категории */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-full transition-all text-lg font-medium ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Продукты */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300"
            >
              <div 
                className="relative h-[300px] group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {hoveredProduct === product.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product)}
                      className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ShoppingBag size={20} />
                      В корзину
                    </motion.button>
                  </motion.div>
                )}
                <button
                  onClick={() => handleFavoriteClick(product)}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    isFavorite(product.id) ? 'bg-primary text-white' : 'bg-white text-gray-600'
                  } shadow-md hover:scale-110 transition-transform`}
                >
                  <Heart size={20} />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
} 