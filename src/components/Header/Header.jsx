import "./Header.scss"
import ThemeToggleButton from "./ThemeToggleButton"

export default function Header() {

    return (
        <>
            <header>
                <div className="header-container">
                    <h1>Awesome Kanban Board</h1>
                    <div className="header-container__right-container">
                        <ThemeToggleButton />
                    </div>
                </div>
            </header>
        </>
    )
}