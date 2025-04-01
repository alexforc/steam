
import { create } from 'zustand';

interface Message {
  id: string;
  productId?: string;
  sender: 'user' | 'support';
  content: string;
  timestamp: Date;
  isRead?: boolean;
}

interface Chat {
  id: string;
  productId: string;
  productName: string;
  lastMessageTime: Date;
  unreadCount: number;
}

interface ChatState {
  isOpen: boolean;
  activeChat: {
    productId: string;
    productName: string;
  } | null;
  messages: Message[];
  allChats: Chat[];
  openChat: (productId: string, productName: string) => void;
  closeChat: () => void;
  sendMessage: (content: string) => void;
  receiveMessage: (content: string, isAdmin?: boolean) => void;
  markChatAsRead: (productId: string) => void;
  getMessagesForProduct: (productId: string) => Message[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  isOpen: false,
  activeChat: null,
  messages: [],
  allChats: [],
  
  openChat: (productId, productName) => {
    // Check if chat already exists
    const existingChat = get().allChats.find(chat => chat.productId === productId);
    
    if (!existingChat) {
      // Create a new chat in the list of all chats
      set(state => ({
        allChats: [
          ...state.allChats,
          {
            id: Date.now().toString(),
            productId,
            productName,
            lastMessageTime: new Date(),
            unreadCount: 0
          }
        ]
      }));
    }
    
    set({
      isOpen: true,
      activeChat: { productId, productName },
      // Filter messages for this product
      messages: get().getMessagesForProduct(productId).length > 0 
        ? get().getMessagesForProduct(productId) 
        : [
            {
              id: Date.now().toString(),
              productId,
              sender: 'support',
              content: `Hello! You're inquiring about ${productName}. How can we help you today?`,
              timestamp: new Date()
            }
          ]
    });
    
    // Mark this chat as read when opened
    get().markChatAsRead(productId);
  },
  
  closeChat: () => {
    set({ isOpen: false });
  },
  
  sendMessage: (content) => {
    const { activeChat } = get();
    const newMessage: Message = {
      id: Date.now().toString(),
      productId: activeChat?.productId,
      sender: 'user',
      content,
      timestamp: new Date(),
      isRead: false
    };
    
    set(state => ({
      messages: [...state.messages, newMessage],
      allChats: state.allChats.map(chat => 
        chat.productId === activeChat?.productId 
          ? { 
              ...chat, 
              lastMessageTime: new Date(),
              unreadCount: chat.unreadCount + 1
            } 
          : chat
      )
    }));
    
    // Simulate a response after a short delay (only for customer-facing chats)
    setTimeout(() => {
      const { receiveMessage } = get();
      receiveMessage(
        `Thanks for your question about ${activeChat?.productName}. A support agent will respond shortly. In the meantime, is there anything specific you'd like to know?`
      );
    }, 1000);
  },
  
  receiveMessage: (content, isAdmin = false) => {
    const { activeChat } = get();
    const newMessage: Message = {
      id: Date.now().toString(),
      productId: activeChat?.productId,
      sender: 'support',
      content,
      timestamp: new Date(),
      isRead: isAdmin ? true : false
    };
    
    set(state => ({
      messages: [...state.messages, newMessage]
    }));
  },
  
  markChatAsRead: (productId) => {
    set(state => ({
      allChats: state.allChats.map(chat => 
        chat.productId === productId ? { ...chat, unreadCount: 0 } : chat
      ),
      messages: state.messages.map(message => 
        message.productId === productId ? { ...message, isRead: true } : message
      )
    }));
  },
  
  getMessagesForProduct: (productId) => {
    return get().messages.filter(message => message.productId === productId);
  }
}));
