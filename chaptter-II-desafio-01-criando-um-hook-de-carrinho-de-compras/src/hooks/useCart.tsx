import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const [amountStock, amountProduct, product] = [
        await api.get(`stock/?id=${productId}`).then(response => (response.data.amount)),
        cart.find(product => product.id === productId)?.amount || 0,
        await api.get(`products/?id=${productId}`).then(response => (response.data.amount))
      ];

      if (amountStock <= amountProduct) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      if (amountProduct === 0) {
        const addNewProduct = {
          ...product,
          amount: 1
        };
        setCart([...cart, addNewProduct]);
      } else {
        const newCart = cart.map(item => item.id === productId ? ({
          ...item,
          amount: amountProduct + 1,
        }) : item);
        setCart(newCart);
      }

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));

    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
