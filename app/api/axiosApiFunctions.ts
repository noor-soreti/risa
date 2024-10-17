import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.100.29:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});


// GET 
export const getUserById = async (id: number) => {
    try {
        const response = await api.get(`api/user/id/${id}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const searchUserByPhoneNumber = async (phoneNumber: string) => {
    try {
        const response = await api.get(`api/user/phoneNumber/${phoneNumber}`)
        // console.log(response.data);
        const searchContact: ISearchContact =  {
            id: response.data.id,
            fullName: response.data.fullName,
            phoneNumber: response.data.phoneNumber,
            profilePicture: response.data.avatar,
            isOnline: response.data.isOnline
        }
        return searchContact
    } catch (error) {
        // console.log(error);
        throw error
    }
}

export const registerUser = async ({...userData}) => {
    try {
        const response = await api.post('api/user/register', userData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserChats = async (uid: string) => {
    try {
        const response = await api.get(`api/chatlog/userid/${uid}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserNotifications = async (id: String) => {
    try {
        const response = await api.get(`api/user/userNotifications/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

// POST
export const newChatLog = async (userIds: any) => {
    try {
        const response = await api.post("/api/chatlog", userIds)
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        
        throw error
    }
}

export const postMessage = async (messageData: object) => {
    try {
        const response = await api.post(`api/messages`, messageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postImage = async (imageData: any) => {
    try {
      const response = await api.post('/api/imagedata'
        , imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export const addContact = async (userId: number, contactId: number) => {
    try {
        const response = await api.post(`api/contact/id/${userId}/${contactId}`)
        console.log(response.data);
        
        return response.data
    } catch (error) {
        throw error
    }
}

// export default api;
