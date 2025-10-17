import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import user from '../../assets/user.png';
import Input from '../../components/UI/Input';
import { mockChats, mockChatMessages } from '../../data/chat-data';
import type { Message, ChatItem, ChatMessages } from '../../types/chat.types';

function Chat() {
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [messageText, setMessageText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Данные чатов из mock-файла
  const chats: ChatItem[] = mockChats;

  // Сообщения для разных чатов из mock-файла
  const chatMessages: ChatMessages = mockChatMessages;

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const messages = chatMessages[activeChatId] || [];

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

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Здесь будет логика отправки сообщения
      console.log('Отправка сообщения:', messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="chat-page">
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
                      <img src={chat.avatar || user} alt={chat.name} />
                      {chat.online && <span className="chat-item_online"></span>}
                    </div>
                    <div className="chat-item_content">
                      <div className="chat-item_header">
                        <h3 className="chat-item_name">{chat.name}</h3>
                        <span className="chat-item_time">{chat.time}</span>
                      </div>
                      <div className="chat-item_footer">
                        <p className="chat-item_message">{chat.lastMessage}</p>
                        {chat.unread && chat.unread > 0 && (
                          <span className="chat-item_unread">{chat.unread}</span>
                        )}
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
                      <img src={activeChat.avatar || user} alt={activeChat.name} />
                      {activeChat.online && <span className="chat-header_online"></span>}
                    </div>
                    <div className="chat-header_details">
                      <h2 className="chat-header_name">{activeChat.name}</h2>
                      <p className="chat-header_status">
                        {activeChat.online ? 'В сети' : 'Не в сети'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Сообщения */}
                <div className="chat-messages" ref={messagesContainerRef}>
                  {messages.length > 0 ? (
                    <>
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`message ${message.sender === 'user' ? 'message-user' : 'message-other'}`}
                        >
                          {message.sender === 'other' && (
                            <div className="message_avatar">
                              <img src={activeChat.avatar || user} alt="Avatar" />
                            </div>
                          )}
                          <div className="message_content">
                            <div className="message_bubble">
                              <p className="message_text">{message.text}</p>
                            </div>
                            <span className="message_time">{message.time}</span>
                          </div>
                        </div>
                      ))}
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
  );
}

export default Chat;
