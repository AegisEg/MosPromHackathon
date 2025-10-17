export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'other';
  time: string;
  avatar?: string;
};

export type ChatItem = {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
};

export type ChatMessages = Record<number, Message[]>;

