import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  getChats, 
  getChatMessages, 
  sendMessage, 
  getNewMessages 
} from '../api/chat';
import { ChatItem, ChatMessage, SendMessagePayload } from '../api/chat/types';

interface UseChatReturn {
  chats: ChatItem[];
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (payload: SendMessagePayload) => Promise<void>;
  loadChats: () => Promise<void>;
  loadMessages: (chatId: number) => Promise<void>;
  activeChatId: number | null;
  setActiveChatId: (id: number | null) => void;
}

export const useChat = (): UseChatReturn => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastMessageIdRef = useRef<number | null>(null);

  // Загрузка списка чатов
  const loadChats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getChats();
      setChats(response.data);
    } catch (err) {
      setError('Ошибка загрузки чатов');
      console.error('Load chats error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Загрузка сообщений чата
  const loadMessages = useCallback(async (chatId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getChatMessages(chatId);
      setMessages(response.data);
      
      // Сохраняем ID последнего сообщения для polling
      if (response.data.length > 0) {
        lastMessageIdRef.current = response.data[response.data.length - 1].id;
      }
    } catch (err) {
      setError('Ошибка загрузки сообщений');
      console.error('Load messages error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Отправка сообщения
  const handleSendMessage = useCallback(async (payload: SendMessagePayload) => {
    if (!activeChatId) return;
    
    try {
      setError(null);
      const response = await sendMessage(activeChatId, payload);
      
      // Добавляем новое сообщение в список
      setMessages(prev => [...prev, response.data]);
      
      // Обновляем ID последнего сообщения
      lastMessageIdRef.current = response.data.id;
    } catch (err) {
      setError('Ошибка отправки сообщения');
      console.error('Send message error:', err);
    }
  }, [activeChatId]);

  // Polling для получения новых сообщений
  const pollNewMessages = useCallback(async () => {
    if (!activeChatId || !lastMessageIdRef.current) return;
    
    try {
      const response = await getNewMessages(activeChatId, {
        lastMessageId: lastMessageIdRef.current
      });
      
      if (response.data.length > 0) {
        setMessages(prev => [...prev, ...response.data]);
        lastMessageIdRef.current = response.data[response.data.length - 1].id;
      }
    } catch (err) {
      console.error('Poll new messages error:', err);
    }
  }, [activeChatId]);

  // Запуск/остановка polling
  useEffect(() => {
    if (activeChatId && lastMessageIdRef.current) {
      // Запускаем polling каждые 5 секунд
      pollingIntervalRef.current = setInterval(pollNewMessages, 5000);
    } else {
      // Останавливаем polling
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [activeChatId, pollNewMessages]);

  // Загрузка сообщений при смене активного чата
  useEffect(() => {
    if (activeChatId) {
      loadMessages(activeChatId);
    } else {
      setMessages([]);
      lastMessageIdRef.current = null;
    }
  }, [activeChatId, loadMessages]);

  // Загрузка чатов при монтировании
  useEffect(() => {
    loadChats();
  }, [loadChats]);

  return {
    chats,
    messages,
    loading,
    error,
    sendMessage: handleSendMessage,
    loadChats,
    loadMessages,
    activeChatId,
    setActiveChatId,
  };
};
