import { ThemeProvider } from "./context/ThemeContext"
import Board from "./components/Board"

export default function App() {

    return (
        <>
        <ThemeProvider>
            <Board />
        </ThemeProvider>
        </>
    )
}