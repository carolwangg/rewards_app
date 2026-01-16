import { useContext } from "react";
import ThemePage from '@/screens/about/Theme';
import { ThemeContext } from "@/store/ThemeContext";

export default function Language() {
    const {theme, setTheme} = useContext(ThemeContext)!;
    console.log("theme in theme page:"+theme);
    return (<ThemePage theme={theme} setTheme={setTheme}/>);
}