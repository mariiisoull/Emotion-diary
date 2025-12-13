import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { getWeekDays } from "../utils/getWeek";
import { FiX, FiTrash2 } from "react-icons/fi";

import {
  FiCalendar,
  FiSettings,
  FiEdit,
  FiHome,
  FiTrendingUp,
} from "react-icons/fi";
import "./Dashboard.scss";

function Dashboard() {
  const navigate = useNavigate();

  /* =======================
     АВТОРИЗАЦИЯ
  ======================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /* =======================
     КАЛЕНДАРЬ И НЕДЕЛЯ
  ======================= */
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [week, setWeek] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setWeek(getWeekDays(selectedDate));
  }, [selectedDate]);

  const selectedDayKey = format(selectedDate, "yyyy-MM-dd");

  /* =======================
     ЭМОЦИИ
  ======================= */
  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [emotionNote, setEmotionNote] = useState("");

  const [emotionsByDate, setEmotionsByDate] = useState(() => {
    return JSON.parse(localStorage.getItem("emotions")) || {};
  });



  const openRecordIfExists = (date) => {
  const key = format(date, "yyyy-MM-dd");
  const record = emotionsByDate[key];

  setSelectedDate(date);

  if (record) {
    setSelectedEmotion(record.emotion);
    setEmotionNote(record.note);
    setShowEmotionModal(true);
  }
};



  /* =======================
     JSX
  ======================= */
  return (
    <div className="dashboard">
      {/* ===== Заголовок ===== */}
      <div className="dashboard-header">
              <FiSettings
        className="settings-icon"
        size={24}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/settings")}
      />

        <div className="calendar-icon" onClick={() => setShowCalendar(true)}>
          <FiCalendar size={24} />
        </div>
      </div>

      {/* ===== Неделя ===== */}
      <div className="week-row" style={{ margin: "0 200px" }}>
        {week.map((d) => (
          <div
            key={d.full}
            className={`day-card ${
              d.full === selectedDayKey ? "active-day" : ""
            }`}
          onClick={() => openRecordIfExists(new Date(d.full))}

          >
            <div className="day-num">{d.num}</div>
            <div className="day-label">{d.label}</div>
          </div>
        ))}
      </div>

      {/* ===== Календарь ===== */}
      {showCalendar && (
        <div className="calendar-popup">
          <div className="calendar-window">
            <Calendar
             onChange={(date) => {
  openRecordIfExists(date);
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

      {/* ===== Эмоции ===== */}
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
            <div
              className="emotion-item"
              key={e.text}
              onClick={() => {
                setSelectedEmotion(e);  
                setEmotionNote(
                  emotionsByDate[selectedDayKey]?.note || ""
                );
                setShowEmotionModal(true);
              }}
            >
              <div className="emotion-emoji">{e.emoji}</div>
              <div className="emotion-text">{e.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Модальное окно эмоции ===== */}
{showEmotionModal && selectedEmotion && (
  <div className="calendar-popup">
    <div className="calendar-window emotion-modal">
      {/* Кнопка закрытия */}
      <button
        className="modal-close-btn"
        onClick={() => setShowEmotionModal(false)}
      >
        <FiX size={20} />
      </button>

      <h3>{format(selectedDate, "dd.MM.yyyy")}</h3>

      <div className="chosen-emotion">
        <span className="emoji">{selectedEmotion.emoji}</span>
        <span>{selectedEmotion.text}</span>
      </div>

      <textarea
        placeholder="Опишите своё состояние..."
        value={emotionNote}
        onChange={(e) => setEmotionNote(e.target.value)}
      />

      <div className="modal-actions">
        <button
          className="save-btn"
          onClick={() => {
            const updated = {
              ...emotionsByDate,
              [selectedDayKey]: {
                emotion: selectedEmotion,
                note: emotionNote,
              },
            };
            setEmotionsByDate(updated);
            localStorage.setItem("emotions", JSON.stringify(updated));
            setShowEmotionModal(false);
          }}
        >
          Сохранить
        </button>

        <button
          className="delete-btn"
          onClick={() => {
            const updated = { ...emotionsByDate };
            delete updated[selectedDayKey];
            setEmotionsByDate(updated);
            localStorage.setItem("emotions", JSON.stringify(updated));
            setShowEmotionModal(false);
          }}
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  </div>
)}


      {/* ===== Рекомендации ===== */}
      <div className="recs-card" style={{ margin: "0 200px" }}>
        <div className="recs-title">Рекомендации</div>
        <div className="recs-cards-row">
          <div className="rec-box"></div>
          <div className="rec-box"></div>
          <div className="rec-box"></div>
        </div>
      </div>

      {/* ===== Нижнее меню ===== */}
      <div className="bottom-nav">
        <div className="nav-btn">
          <FiEdit size={24} />
        </div>
        <div className="nav-btn active">
          <FiHome size={24} />
        </div>
        <div className="nav-btn" onClick={() => navigate("/chart")}>
        <FiTrendingUp size={24} />
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
