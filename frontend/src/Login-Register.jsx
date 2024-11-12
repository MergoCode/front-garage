import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login_Register = () => {
    const [pageChoice, setPageChoice] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(0);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();


    const handleChangePage = () => {
        if (pageChoice == "login") {
            setPageChoice("register");
        }
        else {
            setPageChoice("login");
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!isValid) {
            console.error("You cannot login with that parameters!");
        } else if (isValid) { 
        try {
            const response = await axios.post("http://localhost:8000/api/login/", 
                {
                    "username": username,
                    "password": password
                },
                {
                    headers: {
                        'Content-Type': "application/json"
                    }
                }
            );
            console.log("Log in completed successfully!");
            console.log(response.data);
            if (response.data.access) {
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                navigate("/home");
            }
        
            
        } catch (err) {
            console.log("Error with login: ", err); 
        }
        
    }};

    const handleRegister = async (event) => {
        event.preventDefault(); 
        if (!isValid) {
            console.error("You cannot register with that parameters!");
        } else if (isValid){
        try {
            const response = await axios.post("http://localhost:8000/api/register/", {
                "username": username,
                "password": password,
                "email": email
            }, {headers: {
                'Content-Type': 'application/json'
            }
            
            });
            setPageChoice('login');
            console.log(response.data);
            console.log("Registered successfuly!");
        } catch (err) {
            console.log("Error with register:", err);
        }
    }
}

    function isLatinDigitOrSpecial(str) {
        return /^[a-zA-Z0-9!@#$%&*]+$/.test(str);
    }

    const countLowercase = (str) => (str.match(/[a-z]/g) || []).length;
    const countUppercase = (str) => (str.match(/[A-Z]/g) || []).length;
    const countDigits = (str) => (str.match(/[0-9]/g) || []).length;
    const countSpecial = (str) => (str.match(/[@!#$%^&*]/g) || []).length;
    
    
    

    useEffect(() => {
        const timer = setTimeout(() => {
            
            if (username === password && username != "") {
                console.error("Login cannot be same as password!");
                setIsValid(0);

            }
            else if (username.length > 30) {
                console.error("Username cannot be longer than 30 symbols");
                setIsValid(0);

            }
            else if (password.length < 8 || password.length > 30) {
                console.error("Password cannot be shorter than 8 symbols or longer than 30 symbols");
                setIsValid(0);

            }
            else if (password === password.toLowerCase() || password === password.toUpperCase()) {
                console.error("You need to have at least one lowercase and one uppercase symbol in your password!");
                setIsValid(0);

            }
            else if (countDigits(password) == 0) {
                console.error("Your password needs to contain at least one number");
                setIsValid(0);

            }
            else if (!isLatinDigitOrSpecial(password)) {
                console.error("Your password needs to be written in Latin!");
                setIsValid(0);

            }
            
            else {
                setIsValid(1);
                
            }
        }, 1000); 
    
        return () => clearTimeout(timer); 
    }, [username, password]);

    useEffect(() => {
        const timer = setTimeout(() => {
            let counter = 0;

            if (countLowercase(password) >= 2 && countUppercase(password) >= 2) {
                counter++;
            }
            if (countDigits(password) >= 2) {
                counter++;
            }
            if (countSpecial(password) >= 2) {
                counter++;
            }
            if (password.length > 15) {
                counter++;
            }

            setPasswordStrength(counter); // Оновлення стану після всіх перевірок
            console.log(`Password strength: ${counter}`);
        }, 2000); // Затримка 2 секунди

        return () => clearTimeout(timer); // Очистка таймера при зміні password
    }, [password]);


    

    


    return(
        <div className="container">
            {pageChoice && pageChoice == "login" && (
                <div className="row">
                <form className='' onSubmit={handleLogin}>
                    <div className="col-12">
                <input type="text" 
                placeholder="username"  
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login-register-input"/>
                <input type="password" 
                placeholder="password"  
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-register-input"/>
                </div>
                <button type="submit">Login</button>
            </form>

            </div>
                
            )}
            {pageChoice && pageChoice == 'register' && (
                <div className="row">
                <form className='' onSubmit={handleRegister}>
                <div className="col-12">
                <input type="text" 
                placeholder="username"  
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login-register-input"/>
                <input type="text" 
                placeholder="password"  
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-register-input"/>
                
                <input type="email"
                 placeholder="email"  
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-register-input"/>
                </div>
                <button type="submit">Register</button>
            </form>
            </div>
            )}
            <button onClick={handleChangePage}>Change</button>
        </div>
    );
};

export default Login_Register;