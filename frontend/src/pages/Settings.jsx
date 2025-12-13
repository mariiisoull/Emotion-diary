import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEdit, FiTrash2, FiLogOut } from "react-icons/fi";
import "./Settings.scss";

function Settings() {
  const navigate = useNavigate();

  /* ===== Профиль ===== */
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [login, setLogin] = useState("user123");
  const [name, setName] = useState("Мария");
  const [bio, setBio] = useState("");

  /* ===== Уведомления ===== */
  const [notifications, setNotifications] = useState(true);

  /* ===== Функции ===== */
  const handleClearData = () => {
    localStorage.clear();
    alert("Все данные очищены!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="settings-page">
      {/* Заголовок и кнопка назад */}
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={24} />
        </button>
        <h1>Настройки</h1>
      </div>

      {/* Контент */}
      <div className="settings-content">
        {/* Профиль */}
        <div className="settings-section" onClick={() => setShowProfileModal(true)}>
          <h2>Профиль</h2>
          <p>Редактирование логина, имени и биографии</p>
        </div>

        {/* Уведомления */}
        <div className="settings-section">
          <h2>Уведомления</h2>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Очистить данные */}
        <div className="settings-section">
          <button className="clear-btn" onClick={handleClearData}>
            <FiTrash2 size={18} /> Очистить данные
          </button>
        </div>

        {/* Выход */}
        <div className="settings-section">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={18} /> Выйти
          </button>
        </div>
      </div>

      {/* ===== Модальное окно Профиля ===== */}
      {showProfileModal && (
        <div className="calendar-popup">
          <div className="calendar-window profile-modal">
            <button
              className="modal-close-btn"
              onClick={() => setShowProfileModal(false)}
            >
              <FiArrowLeft size={20} />
            </button>

            <h2>Редактирование профиля</h2>

            <label>
              Логин:
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </label>

            <label>
              Имя:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Био:
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Введите краткую информацию о себе"
              />
            </label>

            <button
              className="save-btn"
              onClick={() => {
                alert("Профиль сохранен!");
                setShowProfileModal(false);
              }}
            >
              Сохранить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
