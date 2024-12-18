import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./AdditionalLogin.css";

const Login_Register = () => {
    const [pageChoice, setPageChoice] = useState('login');
    const [fetchError, setFetchError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState("Weak");
    const [signText, setSignText] = useState('SIGN IN');
    const [fadeSignState, setFadeSignState] = useState(false);
    const [fadeState, setFadeState] = useState("fade-in"); // fade-in, fade-out
    const navigate = useNavigate();
    const movingRef = useRef(null);
    const containerRef = useRef(null);
    const changeButtonRef = useRef(null);
    const circle1Ref = useRef(null);
    const circle2Ref = useRef(null);
    const circle3Ref = useRef(null);
    const circle4Ref = useRef(null);
    const formContainerRef = useRef(null);
    const [scalePass, setScalePassword] = useState(1);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,30}$/; // Мінімум одна велика буква, маленька буква, цифра і спецсимвол

    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors, isValid }
    } = useForm({
        mode: "onChange", 
        defaultValues: {
            username: '',
            password: '',
            email: '',
        }
    });

    useEffect(() => {
        trigger();
    }, [trigger])
    

    const password = watch("password");
    const username = watch("username");

    
    const block = movingRef.current;
    const container = containerRef.current;
    const buttonChange = changeButtonRef.current;
    

    const formContainer = formContainerRef.current;
    const moveBlock = () => {
                if (block && container) {
                    const containerWidth = container.offsetWidth;
                    const blockWidth = block.offsetWidth;
                    const maxPosition = containerWidth - blockWidth;
                    const buttonWidth = buttonChange.offsetWidth;
                    
                    const buttonPosition = containerWidth - 2 * blockWidth - 0.5 * buttonWidth;
                    const newButtonPosition = buttonWidth / 2;

                    block.style.transform = `translateX(${maxPosition}px)`;
                    buttonChange.style.transform = `translateX(${buttonPosition}px) rotate(180deg)`;
                    if (circle1Ref.current) circle1Ref.current.style.transform = "translateX(50px)";
                    if (circle2Ref.current) circle2Ref.current.style.transform = "translateX(-100px)";
                    if (circle3Ref.current) circle3Ref.current.style.transform = "translateX(50px)";
                    if (circle4Ref.current) circle4Ref.current.style.transform = "translateX(100px)";

                    formContainer.style.tranform = `translateX(-${newButtonPosition}px)`;


                }
            }
    const resetBlock = () => {
                if (block) {
                    const buttonWidth = buttonChange.offsetWidth;
                    const newButtonPosition = buttonWidth / 2;
                    block.style.transform = `translateX(0)`;
                    buttonChange.style.transform = `translateX(-${newButtonPosition}px)`;
                    console.log(buttonWidth, newButtonPosition);
                    if (circle1Ref.current) circle1Ref.current.style.transform = "translateX(0)";
                    if (circle2Ref.current) circle2Ref.current.style.transform = "translateX(0)";
                    if (circle3Ref.current) circle3Ref.current.style.transform = "translateX(0)";
                    if (circle4Ref.current) circle4Ref.current.style.transform = "translateX(0)";
                    

                    
                }
            }

            const handleFade = (newText) => {
                setFadeSignState(true); // Активуємо фейд-аут
                setTimeout(() => {
                  setSignText(newText); // Змінюємо текст після завершення фейд-ауту
                  setFadeSignState(false); 
                }, 500); 
              };

            const handleFormContainerMove = (ifLogin) => {
                const blockWidth = block.offsetWidth;
                const newFormContainerPosition = blockWidth;
                if (ifLogin) {
                    formContainer.style.transform = `translateX(-${newFormContainerPosition}px)`;
                }
                else {
                    formContainer.style.transform = `translateX(0px)`;
    
                }
            }
        
        const handleFadeForm = () => {
            setTimeout(() => {
                setFadeState("fade-in")
            }, 500)
        }


    
    const handleChangePage = () => {
        setFadeState("fade-out");

        if (pageChoice == 'login') {
            setTimeout(() => {
                setPageChoice('register');
                handleFormContainerMove(1);}, 500)
            
            handleFade('SIGN UP');
            handleFadeForm();
            moveBlock();
            reset();

        }
        else {
            setTimeout(() => {
                setPageChoice('login');
                handleFormContainerMove(0);

            }, 500)

            handleFade('SIGN IN');  
            handleFadeForm();
            resetBlock();
            reset();

        }
        
    };

    const handleLogin = async (data) => {
        console.log("button clicked");
        try {
            const response = await axios.post("http://localhost:8000/api/login/", 
                {
                    username: data.username,
                    password: data.password
                },
                /*{
                    headers: { 'Content-Type': "application/json" }
                }*/
            );
            console.log("Log in completed successfully!");
            console.log(response.data);
            if (response.data.access) {
                sessionStorage.setItem("accessToken", response.data.access);
                sessionStorage.setItem("refreshToken", response.data.refresh);
                
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
            await axios.post("http://localhost:8000/api/register/", 
                {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("Registered successfully!");
            handleChangePage();
        } catch (err) {

            console.log("Error with register:", err);
        }
    };

    useEffect(() => {
        if (username === password && username !== "") {
            console.error("Username cannot be the same as password!");
        }
    }, [username, password]);

        useEffect(() => {
            if (pageChoice === "register") { 
                if (password.length > 10 && /(?=.*[A-Z])/.test(password)) {
                    setPasswordStrength("Strong");
                    setScalePassword(3);
                } else if (password.length > 6) {
                    setPasswordStrength("Middle");
                    setScalePassword(2);
                } else if(password.length == 0){
                    setPasswordStrength("");
                    setScalePassword(0);
                } else {
                    setPasswordStrength("Weak");
                    setScalePassword(1);
                }
            }
        }, [password, pageChoice]);

    
        
    
    return (
        <div className="login-register-page">
                <div className="circle circle-1" ref={circle1Ref} ></div>
                
                <div className="circle circle-2" ref={circle2Ref} ></div>
                <div className="circle circle-3" ref={circle3Ref}></div>
                <div className="circle circle-4" ref={circle4Ref}></div>
                
        <div className="container ps-0 d-flex justify-content-center col-8" ref={containerRef}>
            <div className="welcome-section text-center col-4 align-items-center" id="welcome-id" ref={movingRef}>
                <h2></h2>
                <h3 className={`fade-sign ${fadeSignState ? "fade-out" : "fade-in"}`}>{signText}</h3>
                

            </div>
            <button onClick={handleChangePage} className="change-btn" ref={changeButtonRef}><img src='./public/switch-btn.svg' className="col-9"></img></button>
        <div className={`form-container ${fadeState} d-flex align-items-center col-8`} ref={formContainerRef}>

            {pageChoice === "login" ? (
                <form className="login-form d-flex justify-content-center align-items-center" onSubmit={handleSubmit(handleLogin)}>
                    {fetchError && fetchError !== '' && <div className="error-block top-0"><p className="Error-p">{fetchError}</p></div>}

                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                        className="login-register-input col-4 mb-1"
                    />
                    {errors.username && <p className="mb-1">{errors.username.message}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                            maxLength: { value: 30, message: "Password cannot exceed 30 characters" },
                            pattern: {
                                value: passwordRegex,
                                message: "Password is invalid"
                            }
                        })}
                        className="login-register-input col-4 mb-1"
                    />
                    {errors.password && <div className="error-div col-6 mb-1"><p>{errors.password.message}</p></div>}

                    <button className={`login-btn col-3 ${isValid ? `enabled-button`: `disabled-button`}`} type="submit" disabled={!isValid}>Login</button>
                </form>
            ) : (
                <form className="register-form  d-flex justify-content-center align-items-center" onSubmit={handleSubmit(handleRegister)}>
                {fetchError && fetchError !== '' && <div className="error-block top-0"><p className="Error-p">{fetchError}</p></div>}

                   

                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                        className="login-register-input col-4 mb-1"
                    />
                    {errors.username && <p className="mb-1 col-12">⚠︎ {errors.username.message}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                            maxLength: { value: 30, message: "Password cannot exceed 30 characters" },
                            pattern: {
                                value: passwordRegex,
                                message: "Password must include at least one uppercase letter, one lowercase letter and one number"
                            }
                        })}
                        className="login-register-input col-4 mb-1"
                    />
                    {errors.password && <div className="error-div col-12 mb-1"><p>⚠︎ {errors.password.message}</p></div>}

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        className="login-register-input col-4 mb-1"
                    />
                    {errors.email && <p className="mb-1 col-12">⚠︎ {errors.email.message}</p>}
                    
                    <div className="d-flex col-6 text-center mt-2">
                    <div className={`passwordScale strength-${scalePass} col-${scalePass == 0 ? 1 : scalePass * 4} `}></div>
                    </div>
                    <div className="col-6  d-flex justify-content-start">
                    <p className={`password-safety-${scalePass} passwordSafetyAnimation`}>{passwordStrength}</p>
                    </div>
                    <button className={`register-btn col-3 ${isValid ? `enabled-button`: `disabled-button`}`} type="submit" disabled={!isValid}>Register</button>
                </form>
            )}

            </div>
            

        </div>
        </div>
    );
};

export default Login_Register;