import React from "react";
import "../css/Layout.css";
const Header = () => {
    return(
        <header className="header">
            <nav className="container px-0 header__nav">
                <a className="col-2 header__link" href="#">
                    <img src="src/assets/user-icon.svg" alt='Особистий кабінет'></img>Особистий кабінет</a>

                <a className="col-2 header__link" href="/home">
                <img src="src/assets/home-icon.svg" alt='Головна сторінка'></img>Головна сторінка</a>

                <a className="col-2 header__link" href="#">
                    <img src="src/assets/schedule-icon.svg" alt='Розклад'></img>Розклад</a>

                <a className="col-2 header__link" href="#">
                    <img src="src/assets/like-icon.svg" alt="Оцінка якості викладання"></img>Оцінка якості викладання</a>
                    
                <a className="col-2 header__link" href="#">
                    <img src="src/assets/kursova-icon.svg" alt='Курсова робота'></img>Курсова робота</a>
            </nav>
        </header>
    )
}

export default Header;