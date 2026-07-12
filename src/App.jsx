import { TasksProvider } from "./context/TasksContext"
import { ThemeProvider } from "./context/ThemeContext"
import Board from "./components/Board"

export default function App() {

    return (
        <>
        <ThemeProvider>
            <TasksProvider>
                <Board />
            </TasksProvider>
        </ThemeProvider>
        </>
    )
}