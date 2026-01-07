import { createContext, ReactNode, useCallback, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { getUserType } from "@/services/apiCalls";
import Error from "@/components/Error";
// Create a Context

type UserContextType = {
    userType: string,
    setUserType: React.Dispatch<React.SetStateAction<string>>
    userId: string,
    setUserId: React.Dispatch<React.SetStateAction<string>>
}
export const AppContext = createContext<UserContextType | null>(null);
// Create a Provider Component

type Props = {
  children: ReactNode;
};
export const AppProvider = ({ children}: Props ) => {
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");

  // if (userId == "" && userType == ""){
  //   return <Error error={"Error loading user data."} code={503}/>;
  // }
  console.log("userType in app context:"+userType);
  console.log("userId in app context:"+userId);
  return (
    <AppContext.Provider value={{userType, setUserType, userId, setUserId}} >
      {children}
    </AppContext.Provider>
  );
};