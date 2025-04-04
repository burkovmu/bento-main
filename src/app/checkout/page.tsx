'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, CreditCard, Truck, Check, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Checkout() {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(step + 1)
  }

  const steps = [
    { number: 1, title: 'Контактные данные', icon: ShoppingCart },
    { number: 2, title: 'Доставка', icon: Truck },
    { number: 3, title: 'Оплата', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-[#FDF8F7]">
      <div className="container mx-auto px-4 pt-32 pb-12">
        <motion.div 
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Шаги оформления */}
          <div className="bg-gradient-to-r from-primary/5 via-cream/10 to-primary/5 p-8">
            <div className="flex justify-between items-center relative max-w-2xl mx-auto">
              {steps.map((s, i) => (
                <div key={s.number} className="flex-1 flex flex-col items-center relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 
                    ${step >= s.number ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {step > s.number ? <Check className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                  </div>
                  <div className="text-sm font-medium text-gray-600 text-center">{s.title}</div>
                  {i < steps.length - 1 && (
                    <div className={`absolute top-6 left-1/2 w-full h-[2px] -z-10
                      ${step > s.number ? 'bg-primary' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Форма */}
          <div className="p-8 md:p-12">
            {step === 1 && (
              <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Контактные данные</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Введите ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="+7 (___) ___-__-__"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="example@mail.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Дата доставки
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Комментарий к заказу
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Укажите особые пожелания к заказу"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn-primary px-8 py-3 rounded-lg flex items-center gap-2 group"
                    >
                      Далее
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Адрес доставки</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Адрес
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Введите адрес доставки"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Время доставки
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary px-8 py-3 rounded-lg"
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      className="btn-primary px-8 py-3 rounded-lg flex items-center gap-2 group"
                    >
                      Перейти к оплате
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Оплата заказа</h2>
                <p className="text-gray-600 mb-8">
                  Выберите удобный способ оплаты
                </p>
                <div className="max-w-sm mx-auto space-y-4">
                  <button
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-between hover:border-primary transition-colors"
                    onClick={() => router.push('/success')}
                  >
                    <span className="font-medium">Банковской картой онлайн</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-between hover:border-primary transition-colors"
                    onClick={() => router.push('/success')}
                  >
                    <span className="font-medium">Наличными при получении</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-8 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Вернуться назад
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 