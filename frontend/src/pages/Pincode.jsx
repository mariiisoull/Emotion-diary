import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Pincode.scss";

function Pincode() {
  const navigate = useNavigate();

  // Состояние чекбокса и PIN
  const [pincodeEnabled, setPincodeEnabled] = useState(
    () => JSON.parse(localStorage.getItem("pincodeEnabled")) ?? false
  );
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  // Сохраняем состояние чекбокса в localStorage
  useEffect(() => {
    localStorage.setItem("pincodeEnabled", JSON.stringify(pincodeEnabled));
  }, [pincodeEnabled]);

  // Обработчик сохранения PIN
  const handleSave = () => {
    const savedPin = localStorage.getItem("pincode") || "";

    // Если PIN уже установлен, проверяем текущий
    if (savedPin && currentPin !== savedPin) {
      alert("Текущий PIN неверный!");
      return;
    }

    if (newPin !== confirmPin) {
      alert("Пароли не совпадают!");
      return;
    }

    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      alert("PIN должен состоять из 4 цифр!");
      return;
    }

    // Сохраняем новый PIN и включаем PIN
    localStorage.setItem("pincode", newPin);
    setPincodeEnabled(true);
    alert("PIN сохранён!");

    // Сбрасываем поля ввода
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
  };

  return (
    <div className="pincode-page">
      <div className="pincode-modal">
        {/* Заголовок */}
        <div className="settings-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={24} />
          </button>
          <h1>PIN-код</h1>
        </div>

        {/* Контент */}
        <div className="pincode-body">
          <div className="pincode-item">
            <span>Включить PIN</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={pincodeEnabled}
                onChange={() => setPincodeEnabled(!pincodeEnabled)}
              />
              <span className="slider" />
            </label>
          </div>

          {pincodeEnabled && (
            <>
              {localStorage.getItem("pincode") && (
                <label>
                  Текущий PIN:
                  <input
                    type="password"
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value)}
                    maxLength={4}
                    placeholder="****"
                  />
                </label>
              )}

              <label>
                Новый PIN:
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  maxLength={4}
                  placeholder="4 цифры"
                />
              </label>

              <label>
                Подтверждение PIN:
                <input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  maxLength={4}
                  placeholder="Повторите PIN"
                />
              </label>

              <button className="save-btn" onClick={handleSave}>
                Сохранить
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pincode;
