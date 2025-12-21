import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Profile.scss";

function Profile() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("user123");
  const [name, setName] = useState("Мария");
  const [bio, setBio] = useState("");

  const handleSave = () => {
    alert("Профиль сохранен!");
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        {/* Заголовок с кнопкой назад */}
        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={24} />
          </button>
          <h1>Профиль</h1>
        </div>

        {/* Форма */}
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Логин
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>

          <label>
            Имя
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Био
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Введите краткую информацию о себе"
            />
          </label>

          <button className="save-btn" onClick={handleSave}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
