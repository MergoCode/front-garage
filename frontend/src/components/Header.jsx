import { useNavigate } from "react-router";
import "../css/Layout.css";
import { useState, useRef, useEffect } from "react";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <div className="header">
            <nav className="container px-0 header-nav">
                <a className="col-2 header-link" href="#">
                    <img src="/assets/kursova-icon.svg" alt='Курсова робота'></img>Курсова робота
                </a>

                <a className="col-2 header-link" href="#" onClick={() => navigate("/home")}>
                    <img src="/assets/home-icon.svg" alt='Головна сторінка'></img>Головна сторінка
                </a>

                <a className="col-2 header-link" onClick={()=> navigate('/audience-picker')}>
                    <img src="/assets/schedule-icon.svg" alt='Розклад'></img>Розклад
                </a>

                <a className="col-2 header-link" href="#">
                    <img src="/assets/like-icon.svg" alt="Новини"></img>Новини
                </a>
                    
                <div className="col-2" ref={dropdownRef}>
                    <a 
                        className="header-link" 
                        href="#" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img src="/assets/user-icon.svg" alt='Особистий кабінет'></img>
                        Особистий кабінет
                        
                    </a>
                    {isDropdownOpen && (
                        <div className="dropdown-menu show">
                            <a 
                                className="dropdown-item" 
                                href="#" 
                                onClick={() => {
                                  navigate('/account');
                                  setIsDropdownOpen(false);
                                }}
                                style={{zIndex: "1000"}}
                            >
                            Акаунт
                            </a>
                            <a 
                              className="dropdown-item" 
                              href="#" 
                              onClick={() => {
                                sessionStorage.removeItem("accessToken");
                                alert('Log out succesfully')
                                navigate('/login-register');
                                setIsDropdownOpen(false);
                              }}
                            >
                              Log out
                            </a>
                        </div>
                    )}
                    </div>
            </nav>
        </div>
    )
}

export default Header;
