// Импортируем типы из API
import { ChatMessage, ChatItem } from '../api/chat/types';

// Расширенные типы для UI компонентов
export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'other';
  time: string;
  avatar?: string;
  files?: Array<{
    path: string;
    originalName: string | null;
    size: number | null;
    mimeType: string | null;
  }>;
};

export type ChatItemUI = {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
};

export type ChatMessages = Record<number, Message[]>;

// Экспортируем типы из API для удобства
export type { ChatMessage, ChatItem } from '../api/chat/types';

