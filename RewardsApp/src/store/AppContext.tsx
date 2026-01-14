import { FALLBACK_LANGUAGE_CODE } from "@/constants/constants";
import { createContext, ReactNode, useState } from "react";
import { I18nProvider } from "./i18nProvider";
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
      <I18nProvider>
        {children}
      </I18nProvider>
    </AppContext.Provider>
  );
};