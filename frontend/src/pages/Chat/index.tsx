import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import user from '../../assets/user.png';
import Input from '../../components/UI/Input';
import { useChat } from '../../hooks/useChat';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/user/selectors';
import type { ChatItem, ChatMessage } from '../../types/chat.types';
import Loader from '../../components/default/Loader';

function Chat() {
  const [messageText, setMessageText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Получаем данные текущего пользователя
  const { data: currentUser } = useSelector(selectUserData);

  // Используем хук для работы с чатом
  const {
    chats,
    messages,
    loading,
    error,
    sendMessage,
    activeChatId,
    setActiveChatId,
  } = useChat();

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Автоматическая прокрутка к последнему сообщению внутри контейнера
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Небольшая задержка для корректного рендера сообщений
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [activeChatId, messages.length]);

  const handleSendMessage = async () => {
    if (messageText.trim() && activeChatId) {
      try {
        await sendMessage({ text: messageText });
        setMessageText('');
      } catch (err) {
        console.error('Ошибка отправки сообщения:', err);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Автоматически выбираем первый чат, если нет активного
  useEffect(() => {
    if (chats.length > 0 && !activeChatId) {
      setActiveChatId(chats[0].id);
    }
  }, [chats, activeChatId, setActiveChatId]);

  // Показываем загрузку, если данные пользователя еще не загружены или идет загрузка чатов/сообщений
  if (!currentUser || (loading && (chats.length === 0 || messages.length === 0))) {
    return (
      <div className="chat-page">
        <div className="container">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <div className="container">
        {error && (
          <div className="chat-error">
            <p>{error}</p>
          </div>
        )}
        <div className="chat-container">
          {/* Левая панель - список чатов */}
          <div className="chat-sidebar">
            <div className="chat-sidebar_header">
              <h2 className="chat-sidebar_title">Сообщения</h2>
            </div>

            {/* Поиск */}
            <div className="chat-sidebar_search">
              <div className="chat-sidebar_search-wrapper">
                <SearchIcon className="chat-sidebar_search-icon" />
                <Input
                  placeholder="Поиск чатов..."
                  value={searchText}
                  onChange={(value) => setSearchText(value)}
                  className="chat-sidebar_search-input"
                />
              </div>
            </div>

            {/* Список чатов */}
            <div className="chat-sidebar_list">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
                    onClick={() => setActiveChatId(chat.id)}
                  >
                    <div className="chat-item_avatar">
                      <img src={user} alt={chat.title} />
                    </div>
                    <div className="chat-item_content">
                      <div className="chat-item_header">
                        <h3 className="chat-item_name">{chat.title}</h3>
                        <span className="chat-item_time">Сейчас</span>
                      </div>
                      <div className="chat-item_footer">
                        <p className="chat-item_message">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="chat-sidebar_empty">
                  <p>Чаты не найдены</p>
                </div>
              )}
            </div>
          </div>

          {/* Правая панель - активный чат */}
          <div className="chat-main">
            {activeChat ? (
              <>
                {/* Заголовок чата */}
                <div className="chat-header">
                  <div className="chat-header_info">
                    <div className="chat-header_avatar">
                      <img src={user} alt={activeChat.title} />
                    </div>
                    <div className="chat-header_details">
                      <h2 className="chat-header_name">{activeChat.title}</h2>
                      <p className="chat-header_status">Чат</p>
                    </div>
                  </div>
                </div>

                {/* Сообщения */}
                <div className="chat-messages" ref={messagesContainerRef}>
                  {messages.length > 0 ? (
                    <>
                      {messages.map((message) => {
                        const isCurrentUser = message.user?.id === currentUser?.id;
                        return (
                          <div
                            key={message.id}
                            className={`message ${isCurrentUser ? 'message-user' : 'message-other'}`}
                          >
                            {!isCurrentUser && (
                              <div className="message_avatar">
                                <img src={user} alt="Avatar" />
                              </div>
                            )}
                          <div className="message_content">
                            <div className="message_bubble">
                              <div className="message_text" style={{ whiteSpace: 'pre-line' }}>
                                {message.text}
                              </div>
                              {message.files && message.files.length > 0 && (
                                <div className="message_files">
                                  {message.files.map((file, index) => (
                                    <div key={index} className="message_file">
                                      <a href={file.path} target="_blank" rel="noopener noreferrer">
                                        {file.originalName || 'Файл'}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="message_time">
                              {new Date(message.createdAt).toLocaleTimeString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="chat-messages-empty">
                      <p>Нет сообщений. Начните диалог!</p>
                    </div>
                  )}
                </div>

                {/* Поле ввода сообщения */}
                <div className="chat-input">
                  <button className="chat-input_attach">
                    <AttachFileIcon />
                  </button>
                  <textarea
                    placeholder="Введите сообщение..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="chat-input_field"
                    rows={1}
                  />
                  <button
                    className="chat-input_send"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <SendIcon />
                  </button>
                </div>
              </>
            ) : (
              <div className="chat-empty">
                <p>Выберите чат для начала общения</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
