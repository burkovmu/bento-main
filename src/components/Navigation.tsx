'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, Phone, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { useFavorites } from '@/context/FavoritesContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { title: 'Главная', href: '/' },
  { title: 'Каталог', href: '/catalog' },
  { title: 'О нас', href: '/about' },
  { title: 'Доставка', href: '/delivery' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Контакты', href: '/contacts' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { items, openCart } = useCart()
  const { favoritesCount } = useFavorites()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="relative group">
          <motion.span 
            className="text-2xl font-display font-bold text-secondary group-hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BentoCakes
          </motion.span>
          <motion.div
            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
            whileHover={{ width: '100%' }}
          />
        </Link>

        {/* Десктопное меню */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
            >
              <motion.span
                className={`relative inline-block py-2 ${
                  pathname === item.href ? 'text-primary' : 'text-gray-600'
                } hover:text-primary transition-colors`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.title}
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    layoutId="underline"
                  />
                )}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Правая часть навигации */}
        <div className="flex items-center gap-6">
          {/* Телефон */}
          <motion.a
            href="tel:+79001234567"
            className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 0 }}
          >
            <Phone size={20} />
            <span>+7 900 123-45-67</span>
          </motion.a>

          {/* Избранное */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/favorites" 
              className="relative flex items-center justify-center w-11 h-11 rounded-full bg-primary hover:bg-primary/90 transition-colors"
            >
              <Heart className="w-6 h-6 text-white" />
              {favoritesCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-secondary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
                >
                  {favoritesCount}
                </motion.span>
              )}
            </Link>
          </motion.div>

          {/* Корзина */}
          <motion.button
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-primary hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCart}
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {items.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-secondary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
              >
                {items.length}
              </motion.span>
            )}
          </motion.button>

          {/* Кнопка мобильного меню */}
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t"
          >
            <motion.div 
              className="container mx-auto px-4 py-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.span
                      className={`block text-lg py-2 ${
                        pathname === item.href ? 'text-primary' : 'text-gray-600'
                      } hover:text-primary transition-colors`}
                      whileHover={{ x: 10 }}
                      whileTap={{ x: 0 }}
                    >
                      {item.title}
                    </motion.span>
                  </Link>
                ))}
                <motion.a
                  href="tel:+79001234567"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors py-2"
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 0 }}
                >
                  <Phone size={20} />
                  <span>+7 900 123-45-67</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 