import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null)

const STORAGE_THEME_KEY = 'awesome-kanban--theme'

function getInitialTheme() {
    const DEFAULT_THEME = 'light'

    try {
        const saved = localStorage.getItem(STORAGE_THEME_KEY)
        if (saved) {
            return JSON.parse(saved)
        }
    }
    catch (error) {
        throw new Error('Ошибка загрузки темы из localStorage', error)
    }

    return DEFAULT_THEME
}

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState(getInitialTheme)
    
    useEffect(() => {
        localStorage.setItem(STORAGE_THEME_KEY, JSON.stringify(theme))
    }, [theme])

    return(
        <>
            <ThemeContext.Provider value={{theme, setTheme}}>
                {children}
            </ThemeContext.Provider>
        </>
    )
}

export function useThemeContext() {
    const context = useContext(ThemeContext)
    if(!context) {
        throw new Error('useThemeContext необходимо использовать в пределах ThemeProvider')
    }
    return context
}