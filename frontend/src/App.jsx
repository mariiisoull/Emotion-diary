import React from 'react';
import { Link } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="wrapper">

      {/* Навбар */}
      <div className="navbar">
        <span className="logo">Emotion diary</span>
        <Link to="/login" className="loginBtn">Войти</Link>
      </div>

      {/* Центр */}
      <div className="centerContent">
        <h1 className="title">Ваш личный дневник эмоций</h1>
        <Link to="/register" className="createBtn">Создать аккаунт</Link>
      </div>

      {/* Текст снизу */}
      <p className="description">
        Простые и понятные техники, выполняя которые,<br />
        вы уже в ближайшее время увидите положительные изменения.
      </p>

    </div>
  );
}

export default App;
