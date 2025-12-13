import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { getWeekDays } from "../utils/getWeek";
import { FiCalendar, FiSettings, FiEdit, FiHome, FiTrendingUp } from "react-icons/fi";
import "./Dashboard.scss";

function Dashboard() {
  const navigate = useNavigate();

  // Проверка авторизации
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Календарь + неделя
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [week, setWeek] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    setWeek(getWeekDays(selectedDate));
  }, [selectedDate]);

  return (
    <div className="dashboard">

      {/* Заголовок */}
      <div className="dashboard-header">
        <FiSettings className="settings-icon" size={24} />
        <div className="calendar-icon" onClick={() => setShowCalendar(true)}>
          <FiCalendar size={24} />
        </div>
      </div>

      {/* Неделя */}
      <div className="week-row" style={{ margin: "0 200px" }}>
        {week.map((d) => (
          <div
            key={d.full}
            className={`day-card ${d.full === today ? "active-day" : ""}`}
            onClick={() => setSelectedDate(new Date(d.full))}
          >
            <div className="day-num">{d.num}</div>
            <div className="day-label">{d.label}</div>
          </div>
        ))}
      </div>

      {/* Всплывающий календарь */}
      {showCalendar && (
        <div className="calendar-popup">
          <div className="calendar-window">
            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                setShowCalendar(false);
              }}
              value={selectedDate}
            />
            <button
              className="close-btn"
              onClick={() => setShowCalendar(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Эмоции */}
      <div className="emotion-card" style={{ margin: "0 200px" }}>
        <div className="emotion-title">Как ваше настроение?</div>

        <div className="emotions-row">
          {[
            { emoji: "😣", text: "ужасно" },
            { emoji: "☹️", text: "плохо" },
            { emoji: "🙂", text: "нормально" },
            { emoji: "😊", text: "хорошо" },
            { emoji: "🥰", text: "отлично" },
          ].map((e) => (
            <div className="emotion-item" key={e.text}>
              <div className="emotion-emoji">{e.emoji}</div>
              <div className="emotion-text">{e.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Рекомендации */}
      <div className="recs-card" style={{ margin: "0 200px" }}>
        <div className="recs-title">Рекомендации</div>
        <div className="recs-cards-row">
          <div className="rec-box"></div>
          <div className="rec-box"></div>
          <div className="rec-box"></div>
        </div>
      </div>

      {/* Нижнее меню */}
      <div className="bottom-nav">
        <div className="nav-btn">
          <FiEdit size={24} />
        </div>
        <div className="nav-btn active">
          <FiHome size={24} />
        </div>
        <div className="nav-btn">
          <FiTrendingUp size={24} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
