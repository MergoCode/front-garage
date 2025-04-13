import { useNavigate } from "react-router";
import "../css/Layout.css";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
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
            <ToastContainer />
            <nav className="container px-0 py-2 header-nav">

                <a className="col-2 header-link" href="#" onClick={() => navigate("/home")}>
                    <img src="/assets/home-icon.svg" alt='Головна сторінка'></img>Головна сторінка
                </a>

<<<<<<< HEAD
                <a className="col-2 header-link" href="#" onClick={() => navigate("/createDocx")}>
                    <img src="/assets/schedule-icon.svg" alt='Документи'></img>Документи
=======
                <a className="col-2 header-link" href="/createDocx">
                    <img src="/assets/docx.svg" height={22} alt='Згенерувати документ'></img>Згенерувати документ
>>>>>>> e5b23e3b860fb8f8cffcfc198332e8bddc6292b5
                </a>

                <a className="col-2 header-link" onClick={()=> navigate('/audience-picker')}>
                    <img src="/assets/kursova-icon.svg" alt='Вільні аудиторії'></img>Вільні аудиторії
                </a>

                <a className="col-2 header-link" href="/rating">
                    <img src="/assets/like-icon.svg" alt="Оцінити викладача"></img>Оцінити викладача
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
                                toast.success('Ви вийшли з системи успішно')
                                setIsDropdownOpen(false);
                                navigate('/login-register');
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
