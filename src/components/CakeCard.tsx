'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, ShoppingBag } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { Product } from '@/data/products'

type CakeCardProps = Product

export function CakeCard({ id, name, description, price, image }: CakeCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const isProductFavorite = isFavorite(id)

  const handleFavoriteClick = () => {
    if (isProductFavorite) {
      removeFromFavorites(id)
    } else {
      addToFavorites({ id, name, description, price, image } as Product)
    }
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2 opacity-0 transition-all group-hover:opacity-100">
          <motion.button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition-colors hover:bg-primary hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag className="h-5 w-5" />
          </motion.button>
          <motion.button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition-colors hover:bg-primary hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-5 w-5 ${isProductFavorite ? 'fill-primary text-primary' : ''}`} />
          </motion.button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-lg font-bold text-gray-800">{name}</h3>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">{description}</p>
        <p className="text-lg font-bold text-primary">{price} ₽</p>
      </div>
    </motion.div>
  )
} 