import { createContext, ReactNode, useState } from "react";
type UserContextType = {
  userType: string,
  setUserType: React.Dispatch<React.SetStateAction<string>>,
  userId: string,
  setUserId: React.Dispatch<React.SetStateAction<string>>,
}

type Props = {
  children: ReactNode;
};

export const AppContext = createContext<UserContextType | null>(null);

export const AppProvider = ({ children}: Props ) => {
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");

  console.log("userType in app context:"+userType);
  console.log("userId in app context:"+userId);
  return (
    <AppContext.Provider value={{userType, setUserType, userId, setUserId}} >
        {children}
    </AppContext.Provider>
  );
};