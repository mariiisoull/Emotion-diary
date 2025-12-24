import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || !password) {
      alert('Введите логин и пароль!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();
      console.log('Ответ сервера:', data);

      if (data.success) {
  // ✅ сохраняем JWT
  localStorage.setItem('token', data.token);

  // (необязательно, но удобно)
  localStorage.setItem('userId', data.userId);


  const pincodeEnabled = JSON.parse(localStorage.getItem("pincodeEnabled"));
const savedPin = localStorage.getItem("pincode");

if (pincodeEnabled && savedPin) {
  navigate("/pincodecheck");   // ← СЮДА
} else {
  navigate("/dashboard");       // ← как раньше
}
}
 else {
        alert(data.message || 'Неверный логин или пароль');
      }
    } catch (err) {
      console.error('Ошибка логина:', err);
      alert('Ошибка сервера!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h2>Войти в аккаунт</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          <label>
            Логин:
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин"
              required
            />
          </label>

          <label>
            Пароль:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </label>

          <button type="submit" className="loginBtn" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="registerLink">
          Нет аккаунта? <Link to="/register">Создать аккаунт</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
