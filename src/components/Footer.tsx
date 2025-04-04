'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Контакты */}
          <div>
            <h4 className="text-xl font-display font-bold text-gradient mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-600">
              <li>+7 (999) 123-45-67</li>
              <li>hello@bentocakes.ru</li>
              <li>г. Москва, ул. Пушкина, д. 1</li>
            </ul>
          </div>

          {/* Меню */}
          <div>
            <h4 className="text-xl font-display font-bold text-gradient mb-4">Меню</h4>
            <ul className="space-y-2">
              {['О нас', 'Каталог', 'Доставка', 'FAQ'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Социальные сети */}
          <div>
            <h4 className="text-xl font-display font-bold text-gradient mb-4">Мы в соцсетях</h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>© 2024 BentoCakes. Все права защищены.</p>
        </div>
      </div>

      {/* Декоративный элемент */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -right-32 -bottom-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
      />
    </footer>
  )
} 