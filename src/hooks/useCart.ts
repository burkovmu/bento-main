import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/data/products'

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          
          if (existingItem) {
            return {
              ...state,
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            }
          }

          return {
            ...state,
            items: [...state.items, { ...product, quantity: 1 }],
            isOpen: true,
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          ...state,
          items: state.items.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          ...state,
          items: quantity === 0
            ? state.items.filter((item) => item.id !== productId)
            : state.items.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              ),
        })),

      clearCart: () => set((state) => ({ ...state, items: [] })),
      
      openCart: () => set((state) => ({ ...state, isOpen: true })),
      closeCart: () => set((state) => ({ ...state, isOpen: false })),
    }),
    {
      name: 'cart-storage',
    }
  )
); 