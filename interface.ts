interface IMessage {
    id: number
    message: string;
    senderId: number;
    deliveredAt: number;
    readAt: number;
}

interface IChatLog {
    id: number;
    message: Set<IMessage>;
    users: Set<IUser>;
  }
  
  interface IUser {
    id: number;
    fullName: string;
    phoneNumber: string;
    profilePicture: string;
    status: string;
    lastSeen: number; // Assuming Unix timestamp (milliseconds)
    isOnline: boolean;
    chatLogs: Set<IChatLog> | [];
    contacts: Set<IContacts> | [];
  }
  
  interface ISearchContact {
    id: number;
    fullName: string;
    phoneNumber: string;
    profilePicture: string;
    isOnline: boolean;
  }

  interface IContacts {
    id: number;
    userId: number;
    contactId: number;
    // addedAt: number??
    displayName: string;
  }

  interface IChatListItem {
    id: number;
    displayName: string;
    lastMessage: string;
  }