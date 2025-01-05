import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "./css/AdditionalLogin.css";
import api from "./AxiosSetting";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const LoginRegister: React.FC = () => {
    const [pageChoice, setPageChoice] = useState<'login' | 'register'>('login');
    const [fetchError, setFetchError] = useState<string>('');
    const [passwordStrength, setPasswordStrength] = useState<string>("Weak");
    const [signText, setSignText] = useState<string>('SIGN IN');
    const [fadeSignState, setFadeSignState] = useState<boolean>(false);
    const [fadeState, setFadeState] = useState<string>("fade-in");
    const [scalePass, setScalePassword] = useState<number>(1);

    const navigate = useNavigate();
    const movingRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const changeButtonRef = useRef<HTMLButtonElement>(null);
    const circle1Ref = useRef<HTMLDivElement>(null);
    const circle2Ref = useRef<HTMLDivElement>(null);
    const circle3Ref = useRef<HTMLDivElement>(null);
    const circle4Ref = useRef<HTMLDivElement>(null);
    const formContainerRef = useRef<HTMLDivElement>(null);

    const loginSchema = z.object({
        username: z.string()
            .min(1, "Username is required")
            .max(30, "Username must not exceed 30 characters"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(30, "Password cannot exceed 30 characters")
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,30}$/, 
                "Password must include at least one uppercase letter, one lowercase letter, and one number"),
    });
    
    const registerSchema = z.object({
        username: z.string()
            .min(1, "Username is required")
            .max(30, "Username must not exceed 30 characters"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(30, "Password cannot exceed 30 characters")
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,30}$/, 
                "Password must include at least one uppercase letter, one lowercase letter, and one number"),
        email: z.string().email("Email must be a valid email address"),
    }).refine((data) => (data.username != data.password, {
        message: "Username cannot be the same as password",
        path: ["password"],
    }));

    const schema = pageChoice === "login" ? loginSchema : registerSchema;
    
    type FormData = z.infer<typeof schema>;


    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        setError,
        formState: { errors, isValid, isSubmitting }
    } = useForm<FormData>({
        mode: "onChange",
        defaultValues: {
            username: '',
            password: '',
            email: "",
        },
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        trigger();
    }, [trigger]);

    const password = watch("password");
    const username = watch("username");

    const moveBlock = () => {
        const block = movingRef.current;
        const container = containerRef.current;
        const buttonChange = changeButtonRef.current;

        if (block && container && buttonChange) {
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

            if (formContainerRef.current) {
                formContainerRef.current.style.transform = `translateX(-${newButtonPosition}px)`;
            }
        }
    };
    
    
    

    const resetBlock = () => {
        const block = movingRef.current;
        const buttonChange = changeButtonRef.current;

        if (block && buttonChange) {
            const buttonWidth = buttonChange.offsetWidth;
            const newButtonPosition = buttonWidth / 2;
            block.style.transform = `translateX(0)`;
            buttonChange.style.transform = `translateX(-${newButtonPosition}px)`;
            if (circle1Ref.current) circle1Ref.current.style.transform = "translateX(0)";
            if (circle2Ref.current) circle2Ref.current.style.transform = "translateX(0)";
            if (circle3Ref.current) circle3Ref.current.style.transform = "translateX(0)";
            if (circle4Ref.current) circle4Ref.current.style.transform = "translateX(0)";
        }
    };

    const handleFade = (newText: string) => {
        setFadeSignState(true);
        setTimeout(() => {
            setSignText(newText);
            setFadeSignState(false);
        }, 500);
    };

    const handleFormContainerMove = (ifLogin: boolean) => {
        const block = movingRef.current;
        const formContainer = formContainerRef.current;
        const blockWidth = block?.offsetWidth || 0;

        if (formContainer) {
            const newFormContainerPosition = blockWidth;
            formContainer.style.transform = ifLogin
                ? `translateX(-${newFormContainerPosition}px)`
                : `translateX(0px)`;
        }
    };

    const handleFadeForm = () => {
        setTimeout(() => {
            setFadeState("fade-in");
        }, 500);
    };

    const handleChangePage = () => {
        setFadeState("fade-out");
        setFetchError("");
        if (pageChoice === 'login') {
            setTimeout(() => {
                setPageChoice('register');
                handleFormContainerMove(true);
            }, 500);
            handleFade('SIGN UP');
            handleFadeForm();
            moveBlock();
            reset();
        } else {
            setTimeout(() => {
                setPageChoice('login');
                handleFormContainerMove(false);
            }, 500);
            handleFade('SIGN IN');
            handleFadeForm();
            resetBlock();
            reset();
        }
    };

    const handleLogin: SubmitHandler<FormData> = async (data) => {
        try {
            const response = await api.post("/login/", {
                username: data.username,
                password: data.password
            });
            if (response.data.access) {
                sessionStorage.setItem("accessToken", response.data.access);
                sessionStorage.setItem("refreshToken", response.data.refresh);
                navigate("/home");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || err.message || "An error occurred during login";
            setFetchError(errorMessage);
        }
    };

    const handleRegister: SubmitHandler<FormData> = async (data) => {
        try {
            await api.post("/register/", {
                username: data.username,
                password: data.password,
                email: data.email,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            handleChangePage();
        } catch (err: any) {
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                if (errorData.username) {
                    setError("username", {
                        type: "server",
                        message: errorData.username[0], // Перше повідомлення про помилку
                    });
                } else {
                    setFetchError("An unknown error occurred");
                }}
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
            } else if (password.length === 0) {
                setPasswordStrength("");
                setScalePassword(0);
            } else {
                setPasswordStrength("Weak");
                setScalePassword(1);
            }
        }
    }, [password, pageChoice]);

    return(
        <div className="login-register-page">
            <div className="circle circle-1" ref={circle1Ref}></div>
            <div className="circle circle-2" ref={circle2Ref}></div>
            <div className="circle circle-3" ref={circle3Ref}></div>
            <div className="circle circle-4" ref={circle4Ref}></div>

            <div className="container login-register-container ps-0 d-flex justify-content-center col-8" ref={containerRef}>
                <div className="welcome-section text-center col-4 align-items-center" id="welcome-id" ref={movingRef}>
                    <h2></h2>
                    <h3 className={`fade-sign ${fadeSignState ? "fade-out" : "fade-in"}`}>{signText}</h3>
                </div>
                <button onClick={handleChangePage} className="change-btn" ref={changeButtonRef}>
                    <img src='./public/switch-btn.svg' className="col-9" alt="Switch" />
                </button>
                <div className={`form-container ${fadeState} d-flex align-items-center col-8`} ref={formContainerRef}>
                    {pageChoice === "login" ? (
                        <form className="login-form d-flex justify-content-center align-items-center" onSubmit={handleSubmit(handleLogin)}>
                            {fetchError && <div className="error-block top-0"><p className="Error-p">{fetchError}</p></div>}

                            <input
                                type="text"
                                placeholder="Username"
                                {...register("username")}
                                className="login-register-input col-4 mb-1"
                            />
                            {errors.username && <p className="mb-1">⚠︎ {errors.username.message}</p>}

                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                className="login-register-input col-4 mb-1"
                            />
                            {errors.password && <div className="error-div col-6 mb-1"><p>⚠︎ Password is invalid</p></div>}

                            <button 
                            className={`login-btn col-3 ${isValid ? `enabled-button` : `disabled-button`}`} 
                            type="submit" 
                            disabled={!isValid || isSubmitting}>
                                {isSubmitting? "Loading..." : "Sign In"}
                                </button>
                        </form>
                    ) : (
                        <form className="register-form d-flex justify-content-center align-items-center" onSubmit={handleSubmit(handleRegister)}>
                            {fetchError && <div className="error-block top-0"><p className="Error-p">{fetchError}</p></div>}

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
                                {...register("password")}
                                className="login-register-input col-4 mb-1"
                            />
                            {errors.password && <div className="error-div col-12 mb-1"><p>⚠︎ {errors.password.message}</p></div>}

                            <input
                                type="text"
                                placeholder="Email"
                                {...register("email")}
                                className="login-register-input col-4 mb-1"
                            />
                            {errors.email && <p className="mb-1 col-12">⚠︎ {errors.email.message}</p>}

                            <div className="d-flex col-6 text-center mt-2">
                                <div className={`passwordScale strength-${scalePass} col-${scalePass === 0 ? 1 : scalePass * 4}`}></div>
                            </div>
                            <div className="col-6 d-flex justify-content-start">
                                <p className={`password-safety-${scalePass} passwordSafetyAnimation`}>{passwordStrength}</p>
                            </div>
                            <button className={`register-btn col-3 ${isValid ? `enabled-button` : `disabled-button`}`} type="submit" disabled={!isValid || isSubmitting}>
                                {isSubmitting ? "Loading..." : "Register"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
