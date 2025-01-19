import { useNavigate } from "react-router";
import "../css/Layout.css";
const Header = () => {

    const navigate = useNavigate();

    return(
        <div className="header">
            <nav className="container px-0 header-nav">
                <a className="col-2 header-link" href="#">
                    <img src="/assets/user-icon.svg" alt='Особистий кабінет'></img>Особистий кабінет</a>

                    <a className="col-2 header-link" href="#" onClick={() => navigate("/home")}>
                <img src="/assets/home-icon.svg" alt='Головна сторінка'></img>Головна сторінка</a>

                <a className="col-2 header-link" href="#">
                    <img src="/assets/schedule-icon.svg" alt='Розклад'></img>Розклад</a>

                <a className="col-2 header-link" href="#">
                    <img src="/assets/like-icon.svg" alt="Новини"></img>Новини</a>
                    
                <a className="col-2 header-link" href="#">
                    <img src="/assets/kursova-icon.svg" alt='Курсова робота'></img>Курсова робота</a>
            </nav>
        </div>
    )
}

export default Header;