import { ThemeProvider } from "./context/ThemeContext"
import { Toaster } from "./components/ui/sonner"
import './index.css'
import HomeScreen from './screens/HomeScreen'
import BoardScreen from './screens/BoardScreen'

export default function App() {

    return (
        <>
        <ThemeProvider>
            <BoardScreen />
        </ThemeProvider>
        {/* <HomeScreen /> */}
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