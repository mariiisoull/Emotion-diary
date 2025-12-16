import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Если нужно для кнопки Назад
import { 
  Search, Plus, X, Calendar, 
  Edit2, Trash2, ChevronLeft 
} from 'lucide-react';

// ИМПОРТИРУЕМ НАШ SCSS
import './Tegs.scss';

const noteColors = [
  { id: 'white', value: '#ffffff' },
  { id: 'pink', value: '#fce4ec' },
  { id: 'blue', value: '#e3f2fd' },
  { id: 'green', value: '#e8f5e9' },
  { id: 'yellow', value: '#fffde7' },
];

const JournalPage = () => {
  const navigate = useNavigate(); // Хук для навигации

  // Данные (State)
  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: 'Итоги недели', 
      text: 'Чувствую, что начал лучше высыпаться. Прогулки по вечерам помогают...', 
      date: '12 Окт, 2024',
      color: 'blue'
    },
    { 
      id: 2, 
      title: 'Ссора с коллегой', 
      text: 'Сегодня был сложный разговор. Я чувствовал раздражение, но смог сдержаться.', 
      date: '10 Окт, 2024',
      color: 'pink'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [formData, setFormData] = useState({ title: '', text: '', color: 'white' });

  // Функции
  const openCreateModal = () => {
    setCurrentNoteId(null);
    setFormData({ title: '', text: '', color: 'white' });
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setCurrentNoteId(note.id);
    setFormData({ title: note.title, text: note.text, color: note.color });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;

    if (currentNoteId) {
      setNotes(notes.map(n => n.id === currentNoteId ? { ...n, ...formData } : n));
    } else {
      const newNote = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      setNotes([newNote, ...notes]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить эту заметку?')) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="journal-page">
      
      {/* Шапка */}
      <header className="header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1>Дневник мыслей</h1>
            <p>Записывайте всё, что вас волнует</p>
          </div>
        </div>

        <div className="header-right">
          <div className="search-wrapper">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Поиск..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button onClick={openCreateModal} className="add-btn">
            <Plus size={24} />
            <span>Запись</span>
          </button>
        </div>
      </header>

      {/* Сетка заметок */}
      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div 
              key={note.id} 
              onClick={() => openEditModal(note)}
              className={`note-card color-${note.color}`}
            >
              <div className="card-header">
                <span className="date">
                  <Calendar size={12} /> {note.date}
                </span>
                <button 
                  className="delete-btn"
                  onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Edit2 size={48} style={{ opacity: 0.3, marginBottom: 10 }} />
            <p>Записей пока нет. Создайте первую!</p>
          </div>
        )}
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="modal-header">
              <h2>{currentNoteId ? 'Редактировать' : 'Новая запись'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Выбор цвета */}
              <div className="color-picker">
                {noteColors.map((c) => (
                  <div
                    key={c.id}
                    className={`color-circle ${formData.color === c.id ? 'active' : ''}`}
                    style={{ backgroundColor: c.value }}
                    onClick={() => setFormData({...formData, color: c.id})}
                  />
                ))}
              </div>

              <input 
                type="text" 
                className="input-title"
                placeholder="Тема..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                autoFocus
              />

              <textarea 
                className="input-text"
                placeholder="Напишите всё, что думаете..."
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
              ></textarea>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                onClick={handleSave}
                disabled={!formData.title.trim()}
                className="save-btn"
              >
                Сохранить
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default JournalPage;