import {useState, useEffect} from "react"
import api from "./AxiosSetting";
const LandingPage = () => {
  const [loading, setLoading] = useState(true); 
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const fetchRole = async () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await api.get("/role/", {  // використовуємо token для авторизації
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const role  = response.data.role;
          setGreeting(`Welcome, ${role}!`)
        } catch (error) {
          console.error("Помилка при отриманні привітання:", error);
        }
      }
      setLoading(false);
    };
    fetchRole();
  }, []);

  if (loading) {
    return <h1>Завантаження...</h1>;
  }

  return (
    <div>
        {<h1>{greeting}</h1>}
        <button>start!</button>
    </div>
  );
};

export default LandingPage;