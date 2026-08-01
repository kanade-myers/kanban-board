import { ThemeProvider } from "./context/ThemeContext"
import Board from "./components/Board/Board"
import { Toaster } from "./components/ui/sonner"
import './index.css'

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
                width: 'fit-content',
                },
                className: 'my-custom-toast',
                descriptionClassName: 'my-description',
            }}
      />
        </>
    )
}