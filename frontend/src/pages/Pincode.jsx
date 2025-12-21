import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Pincode.scss";

function Pincode() {
  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");

  const handleSave = () => {
    alert("Пароль сохранен!");
    // здесь можно добавить логику сохранения пароля
  };

  return (
    <div className="pincode-page">
      <div className="pincode-content">
        {/* Заголовок */}
        <div className="pincode-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={24} />
          </button>
          <h1>Пароль приложения</h1>
        </div>

        {/* Форма */}
        <form className="pincode-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Новый пароль
            <input
              type="password"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Введите пароль"
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

export default Pincode;
