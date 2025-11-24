import { createContext, ReactNode, useState } from "react";
// Create a Context

type UserContextType = {
    userType: string,
    setUserType: React.Dispatch<React.SetStateAction<string>>
}
export const AppContext = createContext<UserContextType | null>(null);
// Create a Provider Component

type Props = {
  children: ReactNode;
};
export const AppProvider = ({ children}: Props ) => {
  const [userType, setUserType] = useState("business");
  return (
    <AppContext.Provider value={{userType, setUserType}} >
      {children}
    </AppContext.Provider>
  );
};