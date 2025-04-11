import api from "../AxiosSetting";
import {useEffect, useState} from "react"

export default  function useFetchRole() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [role, setRole] = useState<string | null>(null)

    useEffect(()=>{
        const fetchRole = async () =>{
            const token = sessionStorage.getItem("accessToken");
            if (!token){
                setError('Токен не знайдено');
                setLoading(false);
                return;
            }
            try {
                const response = await api.get("/role/", {  
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                setRole(response.data.role);
                console.log(response.data.role)
            } catch (error:any) {
                setError(`Помилка при отриманні ролі: ${error}`);
            } finally{
                setLoading(false);
            }
        }
        fetchRole();
    }, [])
    return{role, loading, error}
};