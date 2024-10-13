interface Message {
    id: number
    message: string;
    senderId: number;
    deliveredAt: number;
    readAt: number;
}

interface ChatLog {
    id: number;
    message: Set<Message>;
    users: Set<User>;
  }
  
  interface User {
    id: number;
    fullName: string;
    phoneNumber: string;
    profilePicture: string;
    status: string;
    lastSeen: number; // Assuming Unix timestamp (milliseconds)
    isOnline: boolean;
    chatLogs: Set<ChatLog>;
  }
  