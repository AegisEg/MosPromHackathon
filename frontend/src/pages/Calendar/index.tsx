import React, { useState, useEffect } from 'react';
import { 
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import Button, { ButtonType } from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import './style.scss';

interface Note {
    id: string;
    text: string;
    date: string;
    createdAt: Date;
}

const Calendar: React.FC = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [noteText, setNoteText] = useState('');

    // Загружаем заметки из localStorage при монтировании
    useEffect(() => {
        const savedNotes = localStorage.getItem('calendar-notes');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    // Сохраняем заметки в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('calendar-notes', JSON.stringify(notes));
    }, [notes]);

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        const firstDay = new Date(year, month, 1).getDay();
        return firstDay === 0 ? 6 : firstDay - 1; // Понедельник = 0
    };

    const isToday = (year: number, month: number, day: number) => {
        const today = new Date();
        return year === today.getFullYear() && 
               month === today.getMonth() && 
               day === today.getDate();
    };

    const isWeekend = (year: number, month: number, day: number) => {
        const dayOfWeek = new Date(year, month, day).getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // Воскресенье или суббота
    };

    const getDateString = (year: number, month: number, day: number) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const getNotesForDate = (date: string) => {
        return notes.filter(note => note.date === date);
    };

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
        setIsNoteModalOpen(true);
        setEditingNote(null);
        setNoteText('');
    };

    const handleAddNote = () => {
        if (noteText.trim() && selectedDate) {
            const newNote: Note = {
                id: Date.now().toString(),
                text: noteText.trim(),
                date: selectedDate,
                createdAt: new Date()
            };
            setNotes(prev => [...prev, newNote]);
            setNoteText('');
        }
    };

    const handleEditNote = (note: Note) => {
        setEditingNote(note);
        setNoteText(note.text);
        setIsNoteModalOpen(true);
    };

    const handleUpdateNote = () => {
        if (noteText.trim() && editingNote) {
            setNotes(prev => prev.map(note => 
                note.id === editingNote.id 
                    ? { ...note, text: noteText.trim() }
                    : note
            ));
            setEditingNote(null);
            setNoteText('');
            setIsNoteModalOpen(false);
        }
    };

    const handleDeleteNote = (noteId: string) => {
        setNotes(prev => prev.filter(note => note.id !== noteId));
    };

    const closeModal = () => {
        setIsNoteModalOpen(false);
        setEditingNote(null);
        setNoteText('');
        setSelectedDate(null);
    };

    const renderCalendar = () => {
        const calendars = [];
        
        for (let month = 0; month < 12; month++) {
            const daysInMonth = getDaysInMonth(currentYear, month);
            const firstDay = getFirstDayOfMonth(currentYear, month);
            const days = [];

            // Пустые ячейки для начала месяца
            for (let i = 0; i < firstDay; i++) {
                days.push(<div key={`empty-${i}`} className="calendar-day calendar-day--empty"></div>);
            }

            // Дни месяца
            for (let day = 1; day <= daysInMonth; day++) {
                const dateString = getDateString(currentYear, month, day);
                const dayNotes = getNotesForDate(dateString);
                const isCurrentDay = isToday(currentYear, month, day);
                const isWeekendDay = isWeekend(currentYear, month, day);

                days.push(
                    <div
                        key={day}
                        className={`calendar-day ${isCurrentDay ? 'calendar-day--today' : ''} ${isWeekendDay ? 'calendar-day--weekend' : ''} ${dayNotes.length > 0 ? 'calendar-day--has-notes' : ''}`}
                        onClick={() => handleDateClick(dateString)}
                    >
                        <span className="calendar-day__number">{day}</span>
                        {dayNotes.length > 0 && (
                            <div className="calendar-day__notes-indicator">
                                <span className="notes-count">{dayNotes.length}</span>
                            </div>
                        )}
                    </div>
                );
            }

            calendars.push(
                <div key={month} className="calendar-month">
                    <h3 className="calendar-month__title">{months[month]} {currentYear}</h3>
                    <div className="calendar-grid">
                        {daysOfWeek.map(day => (
                            <div key={day} className="calendar-day-header">{day}</div>
                        ))}
                        {days}
                    </div>
                </div>
            );
        }

        return calendars;
    };

    return (
        <div className="calendar-page">
            <div className="container">
                <div className="wrapper">
                    <div className="calendar-header">
                        <h1 className="calendar-page__title">Производственный календарь</h1>
                        <div className="calendar-year-controls">
                            <Button 
                                variant={ButtonType.GRAY}
                                onClick={() => setCurrentYear(prev => prev - 1)}
                                className="year-control-btn"
                            >
                                <ChevronLeftIcon />
                            </Button>
                            <span className="current-year">{currentYear}</span>
                            <Button 
                                variant={ButtonType.GRAY}
                                onClick={() => setCurrentYear(prev => prev + 1)}
                                className="year-control-btn"
                            >
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>

                    <div className="calendar-content">
                        {renderCalendar()}
                    </div>
                </div>
            </div>

            {/* Модальное окно для заметок */}
            <Modal
                isOpen={isNoteModalOpen}
                onClose={closeModal}
                title={editingNote ? 'Редактировать заметку' : 'Добавить заметку'}
                className="calendar-modal"
            >
                <div className="modal-body">
                    <p className="selected-date">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long'
                        })}
                    </p>

                    <div className="existing-notes">
                        {selectedDate && getNotesForDate(selectedDate).map(note => (
                            <div key={note.id} className="note-item">
                                <div className="note-content">
                                    <p className="note-text">{note.text}</p>
                                    <span className="note-date">
                                        {new Date(note.createdAt).toLocaleString('ru-RU')}
                                    </span>
                                </div>
                                <div className="note-actions">
                                    <Button 
                                        variant={ButtonType.GRAY}
                                        onClick={() => handleEditNote(note)}
                                        className="note-action-btn"
                                    >
                                        <EditIcon />
                                    </Button>
                                    <Button 
                                        variant={ButtonType.DANGER}
                                        onClick={() => handleDeleteNote(note.id)}
                                        className="note-action-btn"
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!editingNote && (
                        <div className="add-note-form">
                            <textarea
                                className="note-textarea"
                                placeholder="Введите текст заметки..."
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                rows={3}
                            />
                            <Button 
                                onClick={handleAddNote}
                                disabled={!noteText.trim()}
                                className="add-note-btn"
                            >
                                <AddIcon />
                                Добавить заметку
                            </Button>
                        </div>
                    )}

                    {editingNote && (
                        <div className="edit-note-form">
                            <textarea
                                className="note-textarea"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                rows={3}
                            />
                            <div className="edit-actions">
                                <Button 
                                    onClick={handleUpdateNote}
                                    disabled={!noteText.trim()}
                                    className="save-note-btn"
                                >
                                    Сохранить
                                </Button>
                                <Button 
                                    variant={ButtonType.GRAY}
                                    onClick={() => {
                                        setEditingNote(null);
                                        setNoteText('');
                                    }}
                                    className="cancel-note-btn"
                                >
                                    Отмена
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Calendar;
