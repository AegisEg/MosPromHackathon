import api from "..";
import { 
  ChatItem, 
  ChatMessage, 
  SendMessagePayload, 
  UpdateMessagesPayload,
  ApiResponse 
} from "./types";

/**
 * Получить список всех чатов пользователя
 */
export const getChats = (): Promise<ApiResponse<ChatItem[]>> => {
  return api
    .get('chat/')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Get chats error:', error);
      throw error;
    });
};

/**
 * Получить сообщения конкретного чата
 * @param chatId - ID чата
 */
export const getChatMessages = (chatId: number): Promise<ApiResponse<ChatMessage[]>> => {
  return api
    .get(`chat/${chatId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Get chat messages error:', error);
      throw error;
    });
};

/**
 * Отправить сообщение в чат
 * @param chatId - ID чата
 * @param payload - данные сообщения (текст и файлы)
 */
export const sendMessage = (chatId: number, payload: SendMessagePayload): Promise<ApiResponse<ChatMessage>> => {
  const formData = new FormData();
  formData.append('text', payload.text);
  
  if (payload.files && payload.files.length > 0) {
    payload.files.forEach((file) => {
      formData.append('files[]', file);
    });
  }

  return api
    .post(`chat/${chatId}/message`, formData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Send message error:', error);
      throw error;
    });
};

/**
 * Получить новые сообщения после определенного ID
 * @param chatId - ID чата
 * @param payload - данные с ID последнего сообщения
 */
export const getNewMessages = (chatId: number, payload: UpdateMessagesPayload): Promise<ApiResponse<ChatMessage[]>> => {
  return api
    .get(`chat/${chatId}/messages`, {
      params: {
        lastMessageId: payload.lastMessageId
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Get new messages error:', error);
      throw error;
    });
};
