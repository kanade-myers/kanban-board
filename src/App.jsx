import { ThemeProvider } from "./context/ThemeContext"
import { Toaster } from "./components/ui/sonner"
import './index.css'
import HomeScreen from './screens/HomeScreen'
import BoardScreen from './screens/BoardScreen'
import { auth } from './api/firebase/config.js'

export default function App() {
    return (
        <>
            {'auth.currentUser' ? <ThemeProvider><BoardScreen /></ThemeProvider> : <HomeScreen />}
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