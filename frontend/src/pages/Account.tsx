import React from "react";
import useFetchRole from "../hooks/useFetchRole";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";
import "../css/Account.scss"; // додаємо стилі
import "../css/Account.sass";
function Account() {
  const { role, loading, error } = useFetchRole();
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const bookedAudiences = localStorage.getItem("audienceBookings");
  const bookedbyUser = bookedAudiences
    ? JSON.parse(bookedAudiences).filter(
        (el: any) => el.booked_by_user === localStorage.getItem("username")
      )
    : [];
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
                <button className="personal-btn" onClick={() => {
                  sessionStorage.removeItem("accessToken");
                  navigate("/login-register")
                }}>Вийти з Акаунту</button>
                {role != "студент" ? <button className="personal-btn">Створити новину</button> : ""}
              </div>
            </div>
          </div>
          <div className="personal-ws__au-title">
            <h1 className="taken-au">Заброньовані Аудиторії</h1>
          </div>
          <div className="personal-ws__auditories">
            {bookedbyUser.length  > 0 && role != "студент" ? (
              bookedbyUser.map((el) => <div className="personal-booked-audience">
                <div className="ps-booked-block">
                    <h2 className="ps-booked-head">{el.number} ауд.</h2>
                    <p className="ps-booked-content">{el.campus}</p>
                    </div>
                    <div className="ps-booked-block">
                    <p className="ps-booked-content">Заброньована в: {el.time}</p>
                    <p className="ps-booked-content">Причина бронювання: {el.name}</p>
                    </div>
              </div>)
            ) : (
              <h1>Немає заброньованих аудиторій</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Account;
