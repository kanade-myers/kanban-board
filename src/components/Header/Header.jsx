import "./Header.scss"
import ThemeToggleButton from "./ThemeToggleButton"
import ProfileMenu from "./ProfileMenu"

export default function Header() {

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <h1>Awesome Kanban Board</h1>
                    <div className="header-container__right-container">
                        <ThemeToggleButton />
                        <ProfileMenu />
                    </div>
                </div>
            </header>
        </>
    )
}