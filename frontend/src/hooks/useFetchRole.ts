import api from "../AxiosSetting";
import { useEffect, useState } from "react";

export default function useFetchRole() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        setError("Токен не знайдено");
        setLoading(false);
        return;
      }

      console.log("Token being sent:", token); // Already present

      try {
        const response = await api.get("/role/", {
          headers: {
            Authorization: `Bearer ${token.trim()}`, // Trim to avoid whitespace
            "Content-Type": "application/json",
          },
        });
        console.log("Role response:", response.data); // Debug response
        setRole(response.data.role);
      } catch (error: any) {
        console.error("Error fetching role:", error.response?.data || error.message); // Detailed error
        setError(`Помилка при отриманні ролі: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, []);

  return { role, loading, error };
}