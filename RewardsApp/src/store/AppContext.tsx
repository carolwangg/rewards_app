import { createContext, ReactNode, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
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
  const [userType, setUserType] = useState("business");
  const [userId, setUserId] = useState("user_0");
  const {isLoaded, isSignedIn} = useAuth();
  const {user} = useUser();
  useEffect(() => {
    if (isLoaded && isSignedIn){
      if (user) {
        console.log("yep")
        setUserId(user.id);
        setUserType((String)(user.publicMetadata.userType));
      }
    }
  }, [user]);
  return (
    <AppContext.Provider value={{userType, setUserType, userId, setUserId}} >
      {children}
    </AppContext.Provider>
  );
};