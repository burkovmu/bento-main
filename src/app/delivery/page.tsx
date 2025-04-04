'use client'

import { motion } from 'framer-motion'
import { Truck, CreditCard, Clock, MapPin, Phone, AlertCircle, CheckCircle2 } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const DeliveryCard = ({ icon: Icon, title, description }: { 
  icon: any, 
  title: string, 
  description: string 
}) => (
  <motion.div 
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    whileHover={{ y: -5 }}
  >
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

export default function DeliveryPage() {
  const deliveryInfo = [
    {
      icon: Truck,
      title: "Быстрая доставка",
      description: "Доставляем ваш заказ в течение 2-3 часов по Москве"
    },
    {
      icon: MapPin,
      title: "Зона доставки",
      description: "Доставка осуществляется по всей Москве и ближайшему Подмосковью"
    },
    {
      icon: Clock,
      title: "Время работы",
      description: "Принимаем заказы ежедневно с 9:00 до 21:00"
    }
  ]

  const paymentMethods = [
    {
      icon: CreditCard,
      title: "Банковской картой",
      description: "Оплата картой онлайн или при получении"
    },
    {
      icon: Phone,
      title: "Через приложение",
      description: "Apple Pay, Google Pay, Samsung Pay"
    },
    {
      icon: CheckCircle2,
      title: "Наличными",
      description: "Оплата наличными при получении заказа"
    }
  ]

  return (
    <main className="min-h-screen bg-[#FDF8F7]">
      <div className="container mx-auto px-4 pt-32 pb-12">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Доставка и оплата</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы стремимся сделать процесс заказа максимально удобным для вас
          </p>
        </motion.div>

        {/* Секция доставки */}
        <motion.section 
          className="mb-16"
          {...fadeInUp}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Truck className="w-6 h-6 text-primary" />
                Информация о доставке
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deliveryInfo.map((item, index) => (
                  <DeliveryCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Важная информация */}
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Важная информация</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Доставка осуществляется в день заказа при оформлении до 19:00
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Минимальная сумма заказа для доставки - 2000 ₽
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Стоимость доставки зависит от зоны (уточняйте у менеджера)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Секция оплаты */}
        <motion.section 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary" />
                Способы оплаты
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paymentMethods.map((method, index) => (
                  <DeliveryCard key={index} {...method} />
                ))}
              </div>

              {/* Гарантии */}
              <div className="mt-12 p-6 bg-primary/5 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Гарантия безопасности</h3>
                    <p className="text-gray-600">
                      Мы используем современные технологии шифрования для защиты ваших платежных данных.
                      Все транзакции проходят через защищенные каналы связи.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 