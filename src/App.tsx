import { ThemeProvider } from "./context/ThemeContext"
import Board from "./components/Board"
import { Toaster } from "./components/ui/sonner"

export default function App() {

    return (
        <>
        <ThemeProvider>
            <Board />
        </ThemeProvider>
        <Toaster 
            position="top-center"
            toastOptions={{
                style: {
                background: '#1a1a2e',
                color: '#fff',
                border: '1px solid #16213e',
                width: 'fit-content', // чтобы ширина подстраивалась под контент[citation:11]
                },
                className: 'my-custom-toast',
                descriptionClassName: 'my-description',
            }}
      />
        </>
    )
}