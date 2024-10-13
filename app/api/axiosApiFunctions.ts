import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.100.29:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getUserById = async (id: Number) => {
    try {
        const response = await api.get(`/user/id/${id}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const registerUser = async ({...userData}) => {
    try {
        const response = await api.post('/user/register', userData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserChats = async () => {
    try {
        const response = await api.get(`/chatlog`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserNotifications = async (id: String) => {
    try {
        const response = await api.get(`/user/userNotifications/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const postMessage = async (messageData: object) => {
    try {
        const response = await api.post(`/messages`, messageData);
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
  

// export default api;
