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

  // =======================
  // АВТОРИЗАЦИЯ
  // =======================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // =======================
  // КАЛЕНДАРЬ И НЕДЕЛЯ
  // =======================
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [week, setWeek] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setWeek(getWeekDays(selectedDate));
  }, [selectedDate]);

  const selectedDayKey = format(selectedDate, "yyyy-MM-dd");

  // =======================
  // ЭМОЦИИ
  // =======================
  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showAddList, setShowAddList] = useState(false);

  const [emotionsByDate, setEmotionsByDate] = useState(() => {
    return JSON.parse(localStorage.getItem("emotions")) || {};
  });

  const openRecordIfExists = (date) => {
    const key = format(date, "yyyy-MM-dd");
    const record = emotionsByDate[key];

    setSelectedDate(date);

    if (record) {
      setSelectedEmotion(record.emotion);
      setShowEmotionModal(true);
    } else {
      setSelectedEmotion(null);
      setShowEmotionModal(false);
    }
  };

  // =======================
  // SAVE / DELETE EMOTION
  // =======================
  const saveEmotionToDB = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/emotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: selectedDayKey,
          mainEmotion: selectedEmotion,
          additionalEmotions: emotionsByDate[selectedDayKey]?.additional || [],
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Эмоция сохранена!");

        // Обновляем локальные данные
        const updated = {
          ...emotionsByDate,
          [selectedDayKey]: {
            emotion: selectedEmotion,
            additional: emotionsByDate[selectedDayKey]?.additional || [],
          },
        };
        setEmotionsByDate(updated);
        localStorage.setItem("emotions", JSON.stringify(updated));

        // Обновляем неделю
        setWeek(getWeekDays(selectedDate));
        setShowEmotionModal(false);
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Ошибка при сохранении эмоции");
    }
  };

  const deleteEmotionFromDB = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/emotions/${selectedDayKey}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        alert("Эмоция удалена!");

        const updated = { ...emotionsByDate };
        delete updated[selectedDayKey];
        setEmotionsByDate(updated);
        localStorage.setItem("emotions", JSON.stringify(updated));

        // Обновляем неделю
        setWeek(getWeekDays(selectedDate));
        setShowEmotionModal(false);
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении эмоции");
    }
  };

  // =======================
  // JSX
  // =======================
  return (
    <div className="dashboard">
      {/* Заголовок */}
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

      {/* Неделя */}
      <div className="week-row" style={{ margin: "0 200px" }}>
        {week.map((d) => (
          <div
            key={d.full}
            className={`day-card ${d.full === selectedDayKey ? "active-day" : ""}`}
            onClick={() => openRecordIfExists(new Date(d.full))}
          >
            <div className="day-num">{d.num}</div>
            <div className="day-label">{d.label}</div>
          </div>
        ))}
      </div>

      {/* Календарь */}
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
            <button className="close-btn" onClick={() => setShowCalendar(false)}>
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
            { emoji: "😣", text: "ужасно", value: 1 },
            { emoji: "☹️", text: "плохо", value: 2 },
            { emoji: "🙂", text: "нормально", value: 3 },
            { emoji: "😊", text: "хорошо", value: 4 },
            { emoji: "🥰", text: "отлично", value: 5 },
          ].map((e) => (
            <div
              className="emotion-item"
              key={e.text}
              onClick={() => {
                setSelectedEmotion(e);
                setShowEmotionModal(true);
              }}
            >
              <div className="emotion-emoji">{e.emoji}</div>
              <div className="emotion-text">{e.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно эмоции */}
      {showEmotionModal && selectedEmotion && (
        <div className="calendar-popup">
          <div className="calendar-window emotion-modal">
            <button className="modal-close-btn" onClick={() => setShowEmotionModal(false)}>
              <FiX size={20} />
            </button>

            <h3>{format(selectedDate, "dd.MM.yyyy")}</h3>

            <div className="chosen-emotion">
              <span className="emoji">{selectedEmotion.emoji}</span>
              <span>{selectedEmotion.text}</span>
            </div>

            <button className="add-tab-btn" onClick={() => setShowAddList((prev) => !prev)}>
              Добавить
            </button>

            {showAddList && (
              <div className="additional-emotions-block">
                {[
                  { emoji: "❤️", text: "любовь" },
                  { emoji: "💪", text: "гордость" },
                  { emoji: "🙏", text: "благодарность" },
                  { emoji: "😊", text: "радость" },
                  { emoji: "😇", text: "блаженство" },
                  { emoji: "🤩", text: "восхищение" },
                  { emoji: "😍", text: "очарованность" },
                  { emoji: "😢", text: "грусть" },
                  { emoji: "😔", text: "тоска" },
                  { emoji: "😞", text: "разочарование" },
                  { emoji: "😟", text: "сожаление" },
                  { emoji: "😒", text: "скука" },
                  { emoji: "😠", text: "зависть" },
                  { emoji: "😡", text: "злость" },
                  { emoji: "😰", text: "тревожность" },
                ].map((e) => {
                  const isSelected = emotionsByDate[selectedDayKey]?.additional?.some(
                    (item) => item.text === e.text
                  );
                  return (
                    <div
                      key={e.text}
                      className={`emotion-tag ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const prev = emotionsByDate[selectedDayKey]?.additional || [];
                        const updatedList = isSelected
                          ? prev.filter((item) => item.text !== e.text)
                          : [...prev, e];

                        const updated = {
                          ...emotionsByDate,
                          [selectedDayKey]: {
                            ...emotionsByDate[selectedDayKey],
                            emotion: selectedEmotion,
                            additional: updatedList,
                          },
                        };
                        setEmotionsByDate(updated);
                      }}
                    >
                      <span className="emoji">{e.emoji}</span> {e.text}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="selected-emotions-block">
              {(emotionsByDate[selectedDayKey]?.additional || []).map((e) => (
                <div key={e.text} className="selected-tag">
                  <span className="emoji">{e.emoji}</span> {e.text}
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={saveEmotionToDB}>
                Сохранить
              </button>
              <button className="delete-btn" onClick={deleteEmotionFromDB}>
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Нижнее меню */}
      <div className="bottom-nav">
        <div className="nav-btn" onClick={() => navigate("/tegs")}>
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
