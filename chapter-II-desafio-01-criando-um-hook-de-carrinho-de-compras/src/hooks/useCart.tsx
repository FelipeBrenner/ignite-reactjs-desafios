import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
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

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue != cart) {
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addProduct = async (productId: number) => {
    try {
      const newCart = [...cart];

      const [stockAmount, currentAmount] = ([
        await api.get(`stock/${productId}`).then(response => (response.data.amount)),
        newCart.find(product => product.id === productId)?.amount || 0,
      ]);

      if (stockAmount <= currentAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const productExists = newCart.find(product => product.id === productId);

      if (productExists) {
        productExists.amount = currentAmount + 1;
      } else {
        const product = await api.get(`products/${productId}`).then(response => (response.data));
        newCart.push({
          ...product,
          amount: 1
        });

      }
      setCart(newCart);
      return;

    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const newCart = [...cart];
      const productIndex = newCart.findIndex(product => product.id === productId);

      if (productIndex >= 0) {
        newCart.splice(productIndex, 1);
        setCart(newCart);
        return;
      } else {
        throw new Error();
      }

    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {

      if (amount <= 0) {
        return;
      }

      const stockAmount = await api.get(`stock/${productId}`).then(response => (response.data.amount));

      if (stockAmount < amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const newCart = [...cart];
      const productExists = newCart.find(product => product.id === productId);

      if (productExists) {
        productExists.amount = amount;
        setCart(newCart);
      } else {
        throw new Error();
      }

    } catch {
      toast.error('Erro na alteração de quantidade do produto');
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
