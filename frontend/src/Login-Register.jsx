import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login_Register = () => {
    const [pageChoice, setPageChoice] = useState('login');
    const [fetchError, setFetchError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState("Weak");
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,30}$/; // Мінімум одна велика буква, маленька буква, цифра і спецсимвол

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({
        mode: "onChange", 
        defaultValues: {
            username: '',
            password: '',
            email: '',
        }
    });

    const password = watch("password");
    const username = watch("username");
    

    const handleChangePage = () => {
        setPageChoice((prev) => (prev === "login" ? "register" : "login"));
    };

    const handleLogin = async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/login/", 
                {
                    username: data.username,
                    password: data.password
                },
                {
                    headers: { 'Content-Type': "application/json" }
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
            const errorMessage = err.response?.data?.detail || err.message || "An error occurred during login";
        setFetchError(errorMessage);
        console.log("Error with login: ", errorMessage);
        }
    };

    const handleRegister = async (data) => {
        try {
            console.log(data);
            const response = await axios.post("http://localhost:8000/api/register/", 
                {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("Registered successfully!");
            setPageChoice('login');
        } catch (err) {

            console.log("Error with register:", err);
        }
    };

    useEffect(() => {
        if (username === password && username !== "") {
            console.error("Username cannot be the same as password!");
        }
    }, [username, password]);

        // складність пароля
        useEffect(() => {
            if (pageChoice === "register") { 
                if (password.length > 10 && /(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)) {
                    setPasswordStrength("Strong");
                } else if (password.length > 6) {
                    setPasswordStrength("Middle");
                } else if(password.length == 0){
                    setPasswordStrength("");
                } else {
                    setPasswordStrength("Weak");
                }
            }
        }, [password, pageChoice]);

    return (
        <div className="login-register-page">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <div class="circle circle-4"></div>
        <div className="container">
            <div class="welcome-section">
                <h2>WELCOME</h2>
                <h3>SIGN UP</h3>
            </div>
            {pageChoice === "login" ? (
                <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                        className="login-register-input"
                    />
                    {errors.username && <p>{errors.username.message}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                            maxLength: { value: 30, message: "Password cannot exceed 30 characters" },
                            pattern: {
                                value: passwordRegex,
                                message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
                            }
                        })}
                        className="login-register-input"
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <button className="login-btn" type="submit" disabled={!isValid}>Login</button>
                </form>
            ) : (
                <form className="register-form" onSubmit={handleSubmit(handleRegister)}>

                    {/* складність пароля */}
                    {passwordStrength && <p>Safety of password: {passwordStrength}</p>}    

                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                        className="login-register-input"
                    />
                    {errors.username && <p>{errors.username.message}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                            maxLength: { value: 30, message: "Password cannot exceed 30 characters" },
                            pattern: {
                                value: passwordRegex,
                                message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
                            }
                        })}
                        className="login-register-input"
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        className="login-register-input"
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <button className="register-btn" type="submit" disabled={!isValid}>Register</button>
                </form>
            )}
            
            <button onClick={handleChangePage} className="change-btn"><img src='./public/switch-btn.svg'></img></button>
            {fetchError && fetchError !== '' && <p>{fetchError}</p>}

        </div>
        </div>
    );
};

export default Login_Register;
