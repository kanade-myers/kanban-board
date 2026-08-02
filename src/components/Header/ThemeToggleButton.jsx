import { HandPlatter } from "lucide-react"
import { useThemeContext } from "../../context/ThemeContext"

export default function ThemeToggleButton() {
    const {theme, setTheme} = useThemeContext()

    function handleToggleThemeClick() {
        if (theme === 'light') {
            setTheme(prev => 'dark')
        }
        else {
            setTheme(prev => 'light')
        }
    }
    return (
        <div>
            <img src="images/Moon.svg" alt="Сменить тему" onClick={handleToggleThemeClick}/>
        </div>
    )
}