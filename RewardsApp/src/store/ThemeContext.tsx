import { createContext, ReactNode, useState } from "react";
type UserContextType = {
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>,
}

type Props = {
  children: ReactNode;
};

export const ThemeContext = createContext<UserContextType | null>(null);

export const ThemeProvider = ({ children}: Props ) => {
  const [theme, setTheme] = useState("light");

  console.log("theme in app context:"+theme);
  return (
    <ThemeContext.Provider value={{theme, setTheme}} >
        {children}
    </ThemeContext.Provider>
  );
};