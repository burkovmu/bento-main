'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Users, Coffee, Award, Cake } from 'lucide-react'
import Image from 'next/image'

const StatCard = ({ icon: Icon, value, label }: { icon: any, value: string, label: string }) => (
  <motion.div
    className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-soft"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-3xl font-bold mb-2">{value}</h3>
    <p className="text-gray-600 text-center">{label}</p>
  </motion.div>
)

const ValueCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-soft"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
)

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F7]">
      <div className="container mx-auto px-4 pt-32 pb-12">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">О нашей кондитерской</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы создаем не просто десерты – мы создаем моменты радости и счастья для наших клиентов
          </p>
        </motion.div>

        {/* История и фото */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Наша история</h2>
            <p className="text-gray-600 leading-relaxed">
              Наша история началась в 2018 году с маленькой домашней кондитерской и большой мечты – создавать особенные десерты, которые будут радовать людей и делать их жизнь слаще.
            </p>
            <p className="text-gray-600 leading-relaxed">
              За эти годы мы выросли в полноценную кондитерскую с собственным производством, но сохранили главное – любовь к своему делу и внимание к каждой детали. Мы по-прежнему вкладываем душу в каждый торт и пирожное.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Сегодня мы гордимся тем, что стали частью важных моментов в жизни наших клиентов – от дней рождения до свадеб, от маленьких семейных праздников до крупных корпоративных мероприятий.
            </p>
          </motion.div>
          <motion.div
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/about-hero.jpg"
              alt="Наша кондитерская"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <StatCard
            icon={Cake}
            value="1000+"
            label="Созданных тортов"
          />
          <StatCard
            icon={Heart}
            value="500+"
            label="Счастливых клиентов"
          />
          <StatCard
            icon={Star}
            value="4.9"
            label="Средняя оценка"
          />
          <StatCard
            icon={Coffee}
            value="5+"
            label="Лет опыта"
          />
        </div>

        {/* Наши ценности */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ValueCard
              icon={Heart}
              title="Качество без компромиссов"
              description="Мы используем только лучшие ингредиенты и постоянно совершенствуем наши рецепты, чтобы каждый десерт был особенным."
            />
            <ValueCard
              icon={Users}
              title="Индивидуальный подход"
              description="Мы внимательно слушаем пожелания каждого клиента и создаем десерты, которые превосходят ожидания."
            />
            <ValueCard
              icon={Award}
              title="Профессионализм"
              description="Наша команда состоит из опытных кондитеров, которые постоянно учатся и развиваются в своем деле."
            />
            <ValueCard
              icon={Star}
              title="Инновации в десертах"
              description="Мы следим за мировыми трендами и создаем уникальные вкусовые сочетания, сохраняя баланс между классикой и новаторством."
            />
          </div>
        </motion.div>

        {/* Команда */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Анна Петрова', role: 'Шеф-кондитер', image: '/images/team-1.jpg' },
              { name: 'Мария Иванова', role: 'Кондитер-декоратор', image: '/images/team-2.jpg' },
              { name: 'Дмитрий Сидоров', role: 'Кондитер', image: '/images/team-3.jpg' }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-2xl shadow-soft overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative h-[300px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
} 