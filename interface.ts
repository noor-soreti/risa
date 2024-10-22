interface IUser {
  id: number;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  status: string;
  lastSeen: number; // Assuming Unix timestamp (milliseconds)
  isOnline: boolean;
}

interface IChatLog {
    id: number;
    recentMessage: string;
    message: Set<IMessage>;
    users: Set<IUser>;
    names: Set<string>
  }

  interface IMessage {
    id: number
    message: string;
    senderId: number;
    deliveredAt: number;
    readAt: number;
  }

  interface IContact {
    id: number;
    userId: number;
    contactId: number;
    displayName: string;
    // addedAt: number??
  }

  /*****************************************/

  // display on chatPreview screen
  interface IChatListItem {
    id: number;
    names: string;
    lastMessage: string;
  }

  interface ISearchContact {
    id: number;
    fullName: string;
    phoneNumber: string;
    profilePicture: string;
    isOnline: boolean;
  }

  interface ISendMessage {
    senderId: number;
    message: string;
  }

  /*****************************************/

  interface IUserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
  }

  interface IChatLogState {
    chatLog: Set<IChatLog> | null
    loading: boolean,
    error: string | null
}

interface IContactState {
  contacts: Set<IContact> | []
  loading: boolean
  error: string | null
}

interface IMessageState {
  message: Set<IMessage> | null,
  loading: boolean,
  error: string | null
}