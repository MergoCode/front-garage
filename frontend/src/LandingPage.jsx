import {useState, useEffect} from "react"
import api from "./AxiosSetting";
import "./App.css"
import Carousel from "./components/Carousel";
import "./css/LandingPage.css"
import RecentNews from "./components/RecentNews"
const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

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
          const role = response.data.role;
          setGreeting(`Welcome, ${role}!`);
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
      {/* {<h1>{greeting}</h1>} */}
      <Carousel />
      <div className="container landing-container d-flex flex-column align-items-center pt-4">
        <h1 className="landing-title">Faculty of Electronics and Computer Technologies</h1>
        <p className="landing-p" >Тут буде текст про наш факультет і цей сайт тіпа шось того треба буде придумати або просто напис</p>
        <a href="#explore" className=" primary-btn" role="button">explore us</a>
        <ul id="explore" className="icons-row">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 119 115" fill="red"><path className="svg-path" d="M80.0625 51.7917C84.9388 51.7917 88.875 47.9671 88.875 43.2292C88.875 38.4913 84.9388 34.6667 80.0625 34.6667C75.1862 34.6667 71.25 38.4913 71.25 43.2292C71.25 47.9671 75.1862 51.7917 80.0625 51.7917ZM38.9375 51.7917C43.8138 51.7917 47.75 47.9671 47.75 43.2292C47.75 38.4913 43.8138 34.6667 38.9375 34.6667C34.0612 34.6667 30.125 38.4913 30.125 43.2292C30.125 47.9671 34.0612 51.7917 38.9375 51.7917ZM59.4412 0.416672C27.0112 0.416672 0.75 25.99 0.75 57.5C0.75 89.01 27.0112 114.583 59.4412 114.583C91.93 114.583 118.25 89.01 118.25 57.5C118.25 25.99 91.93 0.416672 59.4412 0.416672ZM59.5 103.167C33.5325 103.167 12.5 82.7308 12.5 57.5C12.5 32.2692 33.5325 11.8333 59.5 11.8333C85.4675 11.8333 106.5 32.2692 106.5 57.5C106.5 82.7308 85.4675 103.167 59.5 103.167ZM59.5 80.3333C50.8344 80.3333 43.3438 75.7096 39.2606 68.9167H29.42C34.12 80.5902 45.8112 88.8958 59.5 88.8958C73.1888 88.8958 84.88 80.5902 89.58 68.9167H79.7394C75.6562 75.7096 68.1656 80.3333 59.5 80.3333Z"/></svg>
            <p><span>+1350</span> Студентів</p>
          </li>

          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 131 142" fill="none"><g clip-path="url(#clip0_436_86)"><path className="svg-path" d="M27.2916 77.9817V101.648L65.4999 124.25L103.708 101.648V77.9817L65.4999 100.583L27.2916 77.9817ZM65.4999 17.75L5.45825 53.25L65.4999 88.75L114.625 59.6992V100.583H125.542V53.25L65.4999 17.75Z"/></g><defs><clipPath id="clip0_436_86"><rect className="svg-path" width="131" height="142"/></clipPath></defs></svg>
            <p><span>+6</span> Спеціальностей</p>
          </li>

          <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 125" fill="none"><path className="svg-path" d="M84.2727 107H39.7273V97.7778H48.6364V93.1667H21.9091C16.9887 93.1667 13 89.0377 13 83.9444V33.2222C13 28.1289 16.9887 24 21.9091 24H102.091C107.011 24 111 28.1289 111 33.2222V83.9444C111 89.0377 107.011 93.1667 102.091 93.1667H75.3636V97.7778H84.2727V107ZM21.9091 33.2222V83.9444H102.091V33.2222H21.9091Z"/></svg>
            <p><span>+12</span> Лабораторій</p>
          </li>
          
          <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 144 135" fill="none"><path className="svg-path" d="M93.8163 61.75C102.76 61.75 109.926 54.2125 109.926 44.875C109.926 35.5375 102.76 28 93.8163 28C84.8727 28 77.6531 35.5375 77.6531 44.875C77.6531 54.2125 84.8727 61.75 93.8163 61.75ZM50.7143 61.75C59.658 61.75 66.8237 54.2125 66.8237 44.875C66.8237 35.5375 59.658 28 50.7143 28C41.7706 28 34.551 35.5375 34.551 44.875C34.551 54.2125 41.7706 61.75 50.7143 61.75ZM50.7143 73C38.1608 73 13 79.5813 13 92.6875V106.75H88.4286V92.6875C88.4286 79.5813 63.2678 73 50.7143 73ZM93.8163 73C92.2539 73 90.4759 73.1125 88.5902 73.2813C94.84 78.0063 99.2041 84.3625 99.2041 92.6875V106.75H131.531V92.6875C131.531 79.5813 106.37 73 93.8163 73Z"/></svg>
            <p><span>+10</span> Партнерів</p>
          </li>
        </ul>
          <RecentNews />
      </div>
    </div>
  );
};

export default LandingPage;
