import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.scss';

function Register() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
  if (!login || !password || !confirmPassword) {
    alert("Заполните все поля!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Пароли не совпадают!");
    return;
  }

  setLoading(true);

  try {
    // 1️⃣ Создание аккаунта
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const data = await response.json();
    console.log("Ответ сервера:", data);

    if (data.success) {
      // 2️⃣ Сразу логинимся
      const loginResponse = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const loginData = await loginResponse.json();
      console.log("Ответ логина:", loginData);

      if (loginData.success) {
        navigate("/dashboard"); // Переход на Dashboard
      } else {
        alert(loginData.message || "Ошибка при входе после регистрации");
      }
    } else {
      alert(data.message || "Ошибка регистрации!");
    }


    
  } catch (err) {
    console.error("Ошибка:", err);
    alert("Ошибка сервера");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="registerWrapper">
      <div className="registerContainer">
        <h2>Регистрация</h2>

        <label>Логин:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Придумайте логин"
        />

        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />

        <label>Повторите пароль:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите пароль"
        />

        <button
          onClick={handleCreateAccount}
          className="createBtn"
          disabled={loading}
        >
          {loading ? "Создание..." : "Создать аккаунт"}
        </button>
      </div>
    </div>
  );
}

export default Register;
