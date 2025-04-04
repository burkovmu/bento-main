'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'

const ContactInfo = ({ icon: Icon, title, content, link = '' }: { 
  icon: any, 
  title: string, 
  content: string,
  link?: string 
}) => (
  <motion.a
    href={link}
    target={link ? "_blank" : undefined}
    className={`flex items-start gap-4 p-6 bg-white rounded-2xl shadow-soft transition-all duration-300
      ${link ? 'hover:scale-105 hover:shadow-lg cursor-pointer' : ''}`}
    whileHover={link ? { y: -5 } : undefined}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </motion.a>
)

const SocialButton = ({ icon: Icon, label, href }: { icon: any, label: string, href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-soft hover:shadow-lg transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </motion.a>
)

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F7]">
      <div className="container mx-auto px-4 pt-32 pb-12">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы всегда рады помочь вам с выбором десерта, ответить на вопросы или принять ваш заказ
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <ContactInfo
              icon={Phone}
              title="Телефон"
              content="+7 (999) 123-45-67"
              link="tel:+79991234567"
            />
            <ContactInfo
              icon={Mail}
              title="Email"
              content="hello@bentocakes.ru"
              link="mailto:hello@bentocakes.ru"
            />
            <ContactInfo
              icon={MapPin}
              title="Адрес"
              content="г. Москва, ул. Пушкина, д. 1"
              link="https://maps.google.com"
            />
            <ContactInfo
              icon={Clock}
              title="Режим работы"
              content="Ежедневно с 10:00 до 22:00"
            />
          </div>

          {/* Карта */}
          <motion.div
            className="mb-12 rounded-3xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5087554605095!2d37.61844231574937!3d55.75727998055754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1644234567890!5m2!1sru!2sru"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>

          {/* Социальные сети */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">Мы в социальных сетях</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <SocialButton
                icon={Instagram}
                label="Instagram"
                href="https://instagram.com"
              />
              <SocialButton
                icon={Facebook}
                label="Facebook"
                href="https://facebook.com"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 