import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Notification.scss";

function NotificationPage() {
  const navigate = useNavigate();
  
  // Состояние уведомлений, читаем из localStorage
  const [notifications, setNotifications] = useState(
    () => JSON.parse(localStorage.getItem("notifications")) ?? true
  );

  

  // Сохраняем состояние в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const [notifiedToday, setNotifiedToday] = useState(false);



  // Проверка времени и отправка уведомления
  useEffect(() => {
    if (!notifications) return; // если выключено — ничего не делаем

  const sendNotification = () => {
    new window.Notification("Напоминание", { body: "Как ваше настроение!" });
  };

  const checkTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // если сейчас 18:00 (секунды не проверяем) и уведомление ещё не отправлено
    if (hours === 16 && minutes === 48 && !notifiedToday) {
      sendNotification();
      setNotifiedToday(true); // уведомление уже отправлено
    }

    // сброс флага в полночь
    if (hours === 0 && minutes === 0) {
      setNotifiedToday(false);
    }
  };

  const interval = setInterval(checkTime, 1000); // проверка каждую секунду
  return () => clearInterval(interval);
}, [notifications, notifiedToday]);




// Функция для тестового уведомления
  const sendTestNotification = () => {
    if (notifications) {
      new window.Notification("EMOTION DIARY", {
        body: "Поделитесь эмоциями!",
      });
    } else {
      alert("Включите уведомления для теста");
    }
  };





  return (
    <div className="notification-page">
      <div className="notification-content">
        {/* Заголовок */}
        <div className="notification-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={24} />
          </button>
          <h1>Уведомления</h1>
        </div>

        {/* Контент */}
        <div className="notification-body">
          <div className="notification-item">
            <span>Уведомления</span>

            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider" />
            </label>
          </div>

        {/* Кнопка для тестового уведомления */}
          <div className="notification-item">
            <button className="test-btn" onClick={sendTestNotification}>
              Получить уведомление
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
