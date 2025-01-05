import { useEffect, useState } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../AxiosSetting";

const useLoginRegisterForm = (pageChoice: 'login' | 'register') => {
    const [fetchError, setFetchError] = useState<string>("");
    const [passwordStrength, setPasswordStrength] = useState<string>("Weak");
    const [scalePass, setScalePassword] = useState<number>(1);

    const loginSchema = z.object({
        username: z.string().min(1, "Username is required").max(30, "Username must not exceed 30 characters"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(30, "Password cannot exceed 30 characters")
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,30}$/, "Password must include at least one uppercase letter, one lowercase letter, and one number"),
    });

    const registerSchema = z.object({
        username: z.string().min(1, "Username is required").max(30, "Username must not exceed 30 characters"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(30, "Password cannot exceed 30 characters")
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,30}$/, "Password must include at least one uppercase letter, one lowercase letter, and one number"),
        email: z.string().email("Email must be a valid email address"),
    }).refine((data) => (data.username !== data.password), {
        message: "Username cannot be the same as password",
        path: ["password"],
    });

    const schema = pageChoice === "login" ? loginSchema : registerSchema;

    const { register, handleSubmit, watch, setError, formState: { errors, isValid, isSubmitting } } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const handleLogin: SubmitHandler<any> = async (data) => {
        try {
            const response = await api.post("/login/", {
                username: data.username,
                password: data.password
            });
            if (response.data.access) {
                sessionStorage.setItem("accessToken", response.data.access);
                sessionStorage.setItem("refreshToken", response.data.refresh);
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || err.message || "An error occurred during login";
            setFetchError(errorMessage);
        }
    };

    const handleRegister: SubmitHandler<any> = async (data) => {
        try {
            await api.post("/register/", {
                username: data.username,
                password: data.password,
                email: data.email,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err: any) {
            if (err.response?.data) {
                const errorData = err.response.data;
                if (errorData.username) {
                    setError("username", {
                        type: "server",
                        message: errorData.username[0],
                    });
                } else {
                    setFetchError("An unknown error occurred");
                }
            }
        }
    };

    useEffect(() => {
        if (pageChoice === "register" && watch("password").length > 10) {
            setPasswordStrength("Strong");
            setScalePassword(3);
        }
    }, [watch("password"), pageChoice]);

    return {
        register,
        handleSubmit,
        handleLogin,
        handleRegister,
        errors,
        isValid,
        isSubmitting,
        fetchError,
        passwordStrength,
        scalePass,
    };
};

export default useLoginRegisterForm;
