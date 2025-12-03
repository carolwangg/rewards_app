import { Reward } from "@/constants/interfaces";
import { createContext, ReactNode, useState } from "react";
// Create a Context

type UserContextType = {
  cart: string,
  setCart: React.Dispatch<React.SetStateAction<string>>,
  cardPoints: number,
  setCardPoints: React.Dispatch<React.SetStateAction<number>>
  cartReward: Reward|null,
  setCartReward: React.Dispatch<React.SetStateAction<Reward|null>>
}
export const CartContext = createContext<UserContextType | null>(null);
// Create a Provider Component

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children}: Props ) => {
  const [cart, setCart] = useState<string>("reward_0"); //the reward_id for currently selected reward
  const [cartReward, setCartReward] = useState<Reward|null>(null);
  const [cardPoints, setCardPoints] = useState<number>(0);
  return (
    <CartContext.Provider value={{cart, setCart, cardPoints, setCardPoints, cartReward, setCartReward}} >
      {children}
    </CartContext.Provider>
  );
};