import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login_Register = () => {
    const [pageChoice, setPageChoice] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
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
            console.log("Mudak ebaniy", err); 
        }
        
    }

    const handleRegister = async (event) => {
        event.preventDefault(); 
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
                <input type="password" 
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