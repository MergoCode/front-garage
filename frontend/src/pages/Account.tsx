import React, { useState, useEffect } from "react";
import useFetchRole from "../hooks/useFetchRole";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";
import "../css/Account.scss";
import "../css/Account.sass";
import {useCreateNewsStore} from "../zustandStore/store.ts";
function Account() {
  const { role, loading, error } = useFetchRole();
  const navigate = useNavigate();
  const setNews = useCreateNewsStore(state => state.setNews);
  const token = sessionStorage.getItem("accessToken");
  const bookedAudiences = localStorage.getItem("audienceBookings");

  const bookedbyUser = bookedAudiences
    ? JSON.parse(bookedAudiences).filter(
        (el: any) => el.booked_by_user === localStorage.getItem("username")
      )
    : [];

  const [showNewsForm, setShowNewsForm] = useState(false);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [newsList, setNewsList] = useState<any[]>([]);

  const handleCreateNews = () => {
    const newNews = {
      news_header: newsTitle,
      news_content: newsContent,
      news_image_url: newsImage,
      news_date: new Date().toISOString()
    };
    setNewsList([...newsList, newNews]);
    // Очищаємо форму
    setNewsTitle("");
    setNewsContent("");
    setNewsImage("");
    setShowNewsForm(false);
    setNews(newNews);
    console.log("Збережено новину:", newNews);
  };

  useEffect(() => {
    localStorage.setItem("username", "Віктор Нікітов");
    localStorage.setItem("userEmail", "viktor.nikitov@lnu.edu.ua");
  }, [])
  return (
    <>
      {loading && <Loading />}
      {error && (
        <div className="account-modal-backdrop">
          <div className="modal-content">
            <p>Щоб перейти на цю сторінку, будь ласка, авторизуйтеся!</p>
            <button onClick={() => navigate("/login-register")}>Увійти</button>
            <button className="my-3 cancel" onClick={() => navigate("/home")}>
              Скасувати
            </button>
          </div>
        </div>
      )}
      {!error && (
        <div className="personal-ws__container">
          <div className="personal-ws__title">
            <h1 className="personal-ws__title-head">Особистий кабінет</h1>
          </div>
          <div className="personal-ws__information">
            <div className="user-pfp">
              <img src="../../public/assets/Group 52.png" alt="" />
            </div>
            <div className="user-text-info">
              <h1 className="username">{localStorage.getItem("username")}</h1>
              <p className="user-status">
                Статус: {role == "superuser" ? "Студрада" : "Студент"}
              </p>
              <p className="user-more-data">
                E-mail: {localStorage.getItem("userEmail")}
              </p>
              <div className="personal-buttons">
                <button className="personal-btn">Змінити Дані</button>
                <button
                  className="personal-btn"
                  onClick={() => {
                    sessionStorage.removeItem("accessToken");
                    localStorage.removeItem("username");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("audienceBookings");
                    navigate("/login-register");
                  }}
                >
                  Вийти з Акаунту
                </button>
                {role !== "студент" && (
                  <button
                    className="personal-btn"
                    onClick={() => setShowNewsForm(!showNewsForm)}
                  >
                    Створити новину
                  </button>
                )}
              </div>
              {showNewsForm && (
                <div className="news-form">
                  <input
                    type="text"
                    placeholder="Назва новини"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="Контент новини"
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Посилання на зображення"
                    value={newsImage}
                    onChange={(e) => setNewsImage(e.target.value)}
                  />
                  <button className="personal-btn" onClick={handleCreateNews}>
                    Зберегти
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="personal-ws__au-title">
            <h1 className="taken-au">Заброньовані Аудиторії</h1>
          </div>
          <div className="personal-ws__auditories">
            {bookedbyUser.length > 0 && role !== "студент" ? (
              bookedbyUser.map((el) => (
                <div className="personal-booked-audience">
                  <div className="ps-booked-block">
                    <h2 className="ps-booked-head">{el.number} ауд.</h2>
                    <p className="ps-booked-content">{el.campus}</p>
                  </div>
                  <div className="ps-booked-block">
                    <p className="ps-booked-content">
                      Заброньована в: {el.time}
                    </p>
                    <p className="ps-booked-content">
                      Причина бронювання: {el.name}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="no-results">Немає заброньованих аудиторій</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Account;
