import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../AxiosSetting";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await api.get<User>("/user/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Помилка при отриманні користувача:", error);
                sessionStorage.removeItem("accessToken");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (token: string) => {
        sessionStorage.setItem("accessToken", token);
        setLoading(true);
        window.location.reload(); 
    };

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth має використовуватися всередині AuthProvider");
    }
    return context;
};
