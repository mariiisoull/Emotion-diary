import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiTrash2, FiLogOut } from "react-icons/fi";
import "./Settings.scss";

function Settings() {
  const navigate = useNavigate();

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
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={24} />
        </button>
        <h1>Настройки</h1>
      </div>

      <div className="settings-content">
        {/* Ссылки на отдельные страницы */}
        <div className="settings-section" onClick={() => navigate("/profile")}>
          <h2>Профиль</h2>
          <p>Редактирование логина, имени и биографии</p>
        </div>

        <div className="settings-section" onClick={() => navigate("/pincode")}>
          <h2>Пароль</h2>
          <p>Установить или изменить пароль приложения</p>
        </div>

        <div className="settings-section" onClick={() => navigate("/notification")}>
          <h2>Уведомления</h2>
          <p>Настройки уведомлений</p>
        </div>

        <div className="settings-section">
          <button className="clear-btn" onClick={handleClearData}>
            <FiTrash2 size={18} /> Очистить данные
          </button>
        </div>

        <div className="settings-section">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={18} /> Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
