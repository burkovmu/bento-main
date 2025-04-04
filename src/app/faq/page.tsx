'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, HelpCircle, Package, Truck, CreditCard, Clock, Cake } from 'lucide-react'
import React from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  icon: any
  title: string
  questions: FAQItem[]
}

const FAQAccordion = ({ question, answer, isOpen, onClick }: FAQItem & { isOpen: boolean; onClick: () => void }) => (
  <motion.div 
    className="border-b border-gray-100 last:border-none"
    initial={false}
  >
    <button
      className="w-full py-6 flex items-center justify-between text-left"
      onClick={onClick}
    >
      <span className="text-lg font-medium pr-8">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0"
      >
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pb-6 text-gray-600 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: number }>({})
  const [activeCategory, setActiveCategory] = useState(0)

  const faqCategories: FAQCategory[] = [
    {
      icon: Cake,
      title: "О тортах",
      questions: [
        {
          question: "Какие начинки доступны для тортов?",
          answer: "Мы предлагаем широкий выбор начинок: шоколадная, ванильная, ягодная, карамельная и многие другие. Все начинки можно комбинировать между собой для создания уникального вкуса."
        },
        {
          question: "Можно ли заказать торт без глютена?",
          answer: "Да, у нас есть специальная линейка тортов без глютена. Мы используем альтернативные виды муки и ингредиенты, безопасные для людей с непереносимостью глютена."
        },
        {
          question: "За сколько дней нужно делать заказ?",
          answer: "Рекомендуем делать заказ за 2-3 дня. Для срочных заказов свяжитесь с нами по телефону, мы постараемся помочь."
        }
      ]
    },
    {
      icon: Truck,
      title: "Доставка",
      questions: [
        {
          question: "Какие зоны доставки вы обслуживаете?",
          answer: "Мы доставляем по всей Москве и ближайшему Подмосковью. Стоимость доставки зависит от зоны."
        },
        {
          question: "Как происходит доставка тортов?",
          answer: "Доставка осуществляется в специальных термоконтейнерах, которые поддерживают оптимальную температуру и сохраняют внешний вид торта."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Оплата",
      questions: [
        {
          question: "Какие способы оплаты вы принимаете?",
          answer: "Мы принимаем оплату наличными при получении, банковскими картами онлайн, а также через Apple Pay, Google Pay и Samsung Pay."
        },
        {
          question: "Нужно ли вносить предоплату?",
          answer: "Для стандартных заказов предоплата не требуется. Для крупных или особых заказов может потребоваться предоплата в размере 50%."
        }
      ]
    },
    {
      icon: Package,
      title: "Хранение",
      questions: [
        {
          question: "Как правильно хранить торт?",
          answer: "Рекомендуем хранить торт в холодильнике при температуре +4°C. Перед подачей дайте торту постоять при комнатной температуре 30-40 минут."
        },
        {
          question: "Сколько хранится торт?",
          answer: "Срок хранения наших тортов составляет 72 часа при соблюдении условий хранения в холодильнике."
        }
      ]
    }
  ]

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    setOpenItems(prev => {
      const key = `${categoryIndex}-${questionIndex}`
      const newState = { ...prev }
      
      if (newState[key]) {
        delete newState[key]
      } else {
        newState[key] = 1
      }
      
      return newState
    })
  }

  return (
    <main className="min-h-screen bg-[#FDF8F7]">
      <div className="container mx-auto px-4 pt-32 pb-12">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Часто задаваемые вопросы</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Нашли ответы на самые популярные вопросы наших клиентов
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Категории */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-12 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {faqCategories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all
                  ${activeCategory === index 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <category.icon size={20} />
                {category.title}
              </button>
            ))}
          </motion.div>

          {/* Вопросы и ответы */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  {React.createElement(faqCategories[activeCategory].icon, { size: 20, className: "text-primary" })}
                </div>
                <h2 className="text-2xl font-bold">{faqCategories[activeCategory].title}</h2>
              </div>
              <div className="space-y-2">
                {faqCategories[activeCategory].questions.map((item, questionIndex) => (
                  <FAQAccordion
                    key={item.question}
                    {...item}
                    isOpen={!!openItems[`${activeCategory}-${questionIndex}`]}
                    onClick={() => toggleQuestion(activeCategory, questionIndex)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Дополнительная помощь */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-600">
              Не нашли ответ на свой вопрос?{' '}
              <a href="/contacts" className="text-primary font-medium hover:underline">
                Свяжитесь с нами
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 