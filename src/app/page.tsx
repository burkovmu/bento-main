'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, ChevronDown, Star, Heart, ArrowRight, Cake, Clock, Truck } from 'lucide-react'
import { CakeCard } from '@/components/CakeCard'
import Image from 'next/image'
import { ParallaxBackground } from '@/components/ParallaxBackground'
import { useRouter } from 'next/navigation'
import { useFavorites } from '@/context/FavoritesContext'
import { useRef } from 'react'

const cakes = [
  {
    id: 1,
    name: 'Шоколадный бенто',
    category: 'Бестселлер',
    description: 'Нежный шоколадный бисквит с кремом из бельгийского шоколада и свежими ягодами',
    price: 2500,
    image: '/images/hero-1.webp',
    rating: 4.9,
    reviews: 124
  },
  {
    id: 2,
    name: 'Клубничный бенто',
    category: 'Новинка',
    description: 'Воздушный ванильный бисквит со свежей клубникой и нежным кремом',
    price: 2700,
    image: '/images/hero-2.webp',
    rating: 4.8,
    reviews: 98
  },
  {
    id: 3,
    name: 'Матча бенто',
    category: 'Популярное',
    description: 'Бисквит с зеленым чаем матча, белым шоколадом и карамелью',
    price: 2900,
    image: '/images/hero-3.webp',
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    name: 'Карамельный бенто',
    category: 'Хит продаж',
    description: 'Карамельный бисквит с соленой карамелью и орехами пекан',
    price: 2800,
    image: '/images/hero-1.webp',
    rating: 5.0,
    reviews: 87
  }
] as const;

const features = [
  {
    icon: Cake,
    title: "Уникальный дизайн",
    description: "Каждый торт создается индивидуально под ваши пожелания"
  },
  {
    icon: Clock,
    title: "Быстрая доставка",
    description: "Доставляем в течение 2 часов по всему городу"
  },
  {
    icon: Truck,
    title: "Бережная упаковка",
    description: "Специальные боксы сохраняют форму и свежесть"
  }
];

const ZigzagPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.02]" width="100%" height="100%">
    <pattern id="zigzag" width="84" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d="M42 0L84 48H0z" fill="currentColor" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#zigzag)" />
  </svg>
)

const HeroImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className={`relative ${className}`}
  >
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  </motion.div>
)

const StarIcon = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.5,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 2
    }}
  >
    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
  </motion.div>
)

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}

export default function Home() {
  const router = useRouter()
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleFavoriteClick = (id: number) => {
    const cake = cakes.find(cake => cake.id === id)
    if (!cake) return

    if (isFavorite(id)) {
      removeFromFavorites(id)
    } else {
      addToFavorites(cake)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Декоративный фон */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-cream/5 to-background" />
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FF8BA7 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-cream/20 rounded-full blur-[100px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Основной контент */}
        <div className="container mx-auto px-4 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 py-20 relative z-10">
          {/* Левая колонка */}
          <div className="w-full lg:w-1/2 flex flex-col items-start space-y-8">
            <motion.div 
              className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 2
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="text-gray-600">Более 1000 довольных клиентов</span>
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Создаем
              <motion.span 
                className="block font-['NeueMetanaNextOutline'] text-6xl lg:text-8xl my-2 text-gradient"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% auto',
                }}
              >
                сладкие моменты
              </motion.span>
              вашей жизни
            </motion.h1>

            <motion.p 
              className="text-gray-600 text-lg max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Уникальные бенто-торты ручной работы, которые делают каждый ваш праздник 
              особенным и незабываемым. Создаем с любовью, украшаем с вдохновением.
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.button
                onClick={() => router.push('/checkout')}
                className="btn-primary text-lg px-12 py-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Заказать торт</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              </motion.button>

              <motion.button
                onClick={() => router.push('/catalog')}
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <span>Смотреть каталог</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="text-center">
                <motion.div 
                  className="font-['NeueMetanaNextOutline'] text-4xl text-primary mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  500+
                </motion.div>
                <div className="text-sm text-gray-600">Выполненных заказов</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="font-['NeueMetanaNextOutline'] text-4xl text-primary mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  4.9
                </motion.div>
                <div className="text-sm text-gray-600">Средняя оценка</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="font-['NeueMetanaNextOutline'] text-4xl text-primary mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  2ч
                </motion.div>
                <div className="text-sm text-gray-600">Время доставки</div>
              </div>
            </motion.div>
          </div>

          {/* Правая колонка с изображениями */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-square max-w-2xl mx-auto">
              <motion.div
                className="absolute inset-0 grid grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {cakes.slice(0, 3).map((cake, index) => (
                  <motion.div
                    key={cake.id}
                    className={`relative rounded-3xl overflow-hidden ${
                      index === 2 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'
                    } group cursor-pointer`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <motion.div
                      className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"
                      initial={false}
                      whileHover={{ backdropBlur: '2px', opacity: 1 }}
                    />
                    <Image
                      src={cake.image}
                      alt={cake.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30"
                      initial={false}
                      whileHover={{ y: 0 }}
                    >
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <motion.span 
                            className="text-xs font-medium px-3 py-1 bg-primary/10 rounded-full text-primary"
                            whileHover={{ scale: 1.05 }}
                          >
                            {cake.category}
                          </motion.span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{cake.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{cake.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cake.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{cake.price} ₽</span>
                          <motion.button
                            onClick={() => router.push(`/catalog/${cake.id}`)}
                            className="flex items-center gap-1.5 text-sm text-primary"
                            whileHover={{ x: 5 }}
                          >
                            <span>Подробнее</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Скролл индикатор */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-gray-400 text-sm">Прокрутите вниз</span>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </section>

      {/* Секция преимуществ */}
      <section className="py-32 relative overflow-hidden">
        {/* Декоративный фон */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-cream/5 to-background -z-20" />
        <motion.div 
          className="absolute inset-0 opacity-5 -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FF8BA7 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Мы создаем не просто торты, а настоящие произведения кондитерского искусства, которые делают ваши праздники особенными</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Секция популярных товаров */}
      <section className="py-32 relative overflow-hidden">
        {/* Декоративный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-cream/10 to-background -z-20" />
        <motion.div 
          className="absolute inset-0 opacity-5 -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FF8BA7 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Декоративные элементы */}
        <motion.div 
          className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] mix-blend-multiply"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-20 -right-20 w-96 h-96 bg-cream/20 rounded-full blur-[120px] mix-blend-multiply"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-block mb-4 px-6 py-2 bg-primary/10 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium">Наши бестселлеры</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Популярные торты
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Самые любимые и заказываемые торты нашими клиентами. Каждый из них уникален и создан с особой заботой
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {cakes.map((cake, index) => (
              <motion.div
                key={cake.id}
                className="group relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/10 shadow-lg hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={cake.image}
                    alt={cake.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <motion.span 
                      className="inline-block text-xs font-medium px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      {cake.category}
                    </motion.span>
                  </div>
                  <motion.button
                    onClick={() => handleFavoriteClick(cake.id)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        isFavorite(cake.id) 
                          ? 'fill-primary text-primary' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </motion.button>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{cake.rating}</span>
                      <span className="text-xs text-gray-500">({cake.reviews})</span>
                    </div>
                    <span className="text-xl font-bold text-primary">{cake.price} ₽</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {cake.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cake.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <motion.button
                      onClick={() => router.push(`/catalog/${cake.id}`)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-sm w-full justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Заказать</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => router.push('/catalog')}
              className="btn-primary text-lg px-12 py-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Смотреть все торты</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Секция как сделать заказ */}
      <section className="py-32 relative overflow-hidden">
        {/* Декоративный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-cream/10 to-background -z-20" />
        <motion.div 
          className="absolute inset-0 opacity-5 -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FF8BA7 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-block mb-4 px-6 py-2 bg-primary/10 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium">Простой процесс заказа</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Как сделать заказ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы сделали процесс заказа максимально простым и удобным для вас. Следуйте этим шагам, чтобы получить свой идеальный торт
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Соединительная линия */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-primary/10 hidden lg:block" />
            
            {[
              {
                step: 1,
                title: "Выберите торт",
                description: "Просмотрите наш каталог и выберите понравившийся торт или создайте свой дизайн",
                icon: Cake
              },
              {
                step: 2,
                title: "Оформите заказ",
                description: "Укажите дату доставки, адрес и предпочтительное время. Выберите способ оплаты",
                icon: Clock
              },
              {
                step: 3,
                title: "Дождитесь звонка",
                description: "Наш менеджер свяжется с вами для подтверждения заказа и уточнения деталей",
                icon: Sparkles
              },
              {
                step: 4,
                title: "Получите торт",
                description: "Мы бережно доставим ваш торт точно в срок. Оплата при получении",
                icon: Truck
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div 
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-lg relative z-10"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative mb-6">
                    <motion.div 
                      className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  />
                </motion.div>

                {index < 3 && (
                  <motion.div
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-primary hidden lg:block"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    <ArrowRight className="w-8 h-8" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => router.push('/catalog')}
              className="btn-primary text-lg px-12 py-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Заказать сейчас</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
