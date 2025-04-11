import { useState, useEffect } from "react";
import api from "../AxiosSetting";
import { defaultTeachers } from "../data";
type Teacher = {
  id: string;
  fullName: string;
  department: string;
  position: string;
  photoUrl: string;
};

export function useFetchTeachers() {
  const [teachersData, setTeachersData] = useState<Teacher[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const token = localStorage.getItem("accessToken");

  

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/teachers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeachersData(response.data);
        setError(null);
      } catch (err) {
        console.log("Using default teachers data");
        setTeachersData(defaultTeachers);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, [token]);

  return { teachersData, isLoading, error };
}