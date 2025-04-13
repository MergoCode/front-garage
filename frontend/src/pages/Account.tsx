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
              <h2 className="user-status">{role == "superuser" ? "Студрада" : "Студент"}</h2>
              <h3 className="user-more-data">{localStorage.getItem("e-mail")}</h3>
              <div className="personal-buttons">
                <button className="personal-btn">Змінити Дані</button>
                <button className="personal-btn">Вийти з Акаунту</button>
              </div>
            </div>
          </div>
          <div className="personal-ws__au-title"></div>
          <div className="personal-ws__auditories"></div>
        </div>
      )}
    </>
  );
}

export default Account;
