import "./Footer.scss"

export default function Footer() {

    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-container__task-info-container">
                        <span>Active tasks: N</span>
                        <span>Finished tasks: M</span>
                    </div>
                    <div className="footer-container__user-info-container">
                        <span>Kanban board by NAME, YEAR</span>
                    </div>
                </div>
            </footer>
        </>
    )
}