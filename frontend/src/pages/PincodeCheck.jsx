import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pincode.scss";

function PincodeCheck() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  // получаем PIN как строку и убираем пробелы
  const savedPin = (localStorage.getItem("pincode") || "").trim();
  const pincodeEnabled = JSON.parse(localStorage.getItem("pincodeEnabled")) || false;

  useEffect(() => {
    if (!pincodeEnabled || !savedPin) {
      navigate("/dashboard");
    }
  }, [navigate, pincodeEnabled, savedPin]);

  const handleSubmit = () => {
    if (pin.trim() === savedPin) { // trim на всякий случай

      localStorage.setItem("pinVerified", "true");
      navigate("/dashboard");
    } else {
      setError("Неверный PIN");
      setPin(""); // очищаем поле
    }
  };

  return (
    <div className="pincode-page">
      <div className="pincode-modal">
        <h2>Введите PIN-код</h2>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={4}
          placeholder="****"
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit}>Войти</button>
      </div>
    </div>
  );
}

export default PincodeCheck;
