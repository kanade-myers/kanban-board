import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
import Footer from "../components/Footer/Footer";
import './BoardScreen.scss'

export default function BoardScreen() {

    return(
         <div className="screen-container">
            <Header />
            <main className="main-content">
                <Board />
            </main>
            <Footer />
        </div>
    )
}