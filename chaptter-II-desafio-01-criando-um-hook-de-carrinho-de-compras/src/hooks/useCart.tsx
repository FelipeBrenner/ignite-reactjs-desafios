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
      const [stockAmount, currentAmount] = ([
        await api.get(`stock/${productId}`).then(response => (response.data.amount)),
        cart.find(product => product.id === productId)?.amount || 0,
      ]);

      // Se não existe no estoque a quantidade desejada do produto dispara mensagem de erro
      if (stockAmount <= currentAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      // Se produto não está no carrinho, adiciona
      if (currentAmount === 0) {
        const product = await api.get(`products/${productId}`).then(response => (response.data));
        const newProduct = {
          ...product,
          amount: 1
        };
        setCart([...cart, newProduct]);
      } else {
        // Se produto está no carrinho, incrementa em 1 unidade a quantidade
        const newCart = cart.map(item => item.id === productId ? ({
          ...item,
          amount: currentAmount + 1,
        }) : item);
        console.log(cart);
        setCart(newCart);
      }

      //localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
      return;

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
