import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import "./Chart.scss"; // Подключаем стили

function Chart() {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [averageMood, setAverageMood] = useState(0);

  useEffect(() => {
    // 1. Получаем данные из localStorage (так же, как в Dashboard)
    const storedEmotions = JSON.parse(localStorage.getItem("emotions")) || {};

    // 2. Преобразуем объект данных в массив для графика
    const dataArray = Object.keys(storedEmotions).map((dateKey) => {
      const record = storedEmotions[dateKey];
      return {
        fullDate: dateKey,
        date: format(parseISO(dateKey), "dd.MM"), // Формат даты для оси X (день.месяц)
        value: record.emotion?.value || 0, // Значение 1-5
        emoji: record.emotion?.emoji || "",
        text: record.emotion?.text || "",
      };
    });

    // 3. Сортируем по дате (от старых к новым)
    dataArray.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));

    setChartData(dataArray);

    // 4. Считаем среднее настроение
    if (dataArray.length > 0) {
      const total = dataArray.reduce((acc, cur) => acc + cur.value, 0);
      setAverageMood((total / dataArray.length).toFixed(1));
    }
  }, []);

  // Кастомная подсказка (Tooltip) при наведении на график
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-date">{label}</p>
          <p className="tooltip-mood">
            {data.emoji} {data.text} ({data.value}/5)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-page">
      {/* Шапка с кнопкой назад */}
      <div className="chart-header">
        <FiArrowLeft 
          size={24} 
          className="back-icon"
          onClick={() => navigate("/dashboard")} 
        />
        <h2>Статистика настроения</h2>
      </div>

      {/* Карточки с общей информацией */}
      <div className="summary-cards">
        <div className="card">
          <span>Записей всего</span>
          <strong>{chartData.length}</strong>
        </div>
        <div className="card">
          <span>Среднее настроение</span>
          <strong>{averageMood} / 5.0</strong>
        </div>
      </div>

      {/* График */}
      <div className="chart-container card">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{fontSize: 12}} />
              <YAxis domain={[0, 6]} hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorMood)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty-message">
            <p>Нет данных для отображения.</p>
            <p>Заполните дневник в Dashboard хотя бы один раз!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chart;