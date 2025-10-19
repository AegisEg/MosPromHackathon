// Типы для API чата

export interface ChatFile {
  path: string;
  originalName: string | null;
  size: number | null;
  mimeType: string | null;
}

export interface ChatUser {
  id: number;
  name: string;
}

export interface ChatMessage {
  id: number;
  text: string | null;
  createdAt: string;
  user: ChatUser | null;
  files: ChatFile[];
}

export interface ChatItem {
  id: number;
  title: string;
  lastMessage: string;
}

export interface SendMessagePayload {
  text: string;
  files?: File[];
}

export interface UpdateMessagesPayload {
  lastMessageId: number;
}

export interface ApiResponse<T> {
  data: T;
  status: 'OK' | 'FAIL';
  httpStatus: number;
}
