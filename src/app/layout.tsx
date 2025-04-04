import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Cart } from '@/components/Cart'
import { FavoritesProvider } from '@/context/FavoritesContext'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BentoCakes - Уникальные торты на заказ',
  description: 'Создаем особенные торты для ваших особенных моментов',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={spaceGrotesk.className}>
        <FavoritesProvider>
          <Navigation />
          {children}
          <Footer />
          <Cart />
        </FavoritesProvider>
      </body>
    </html>
  )
}
