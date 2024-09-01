import * as SecureStore from 'expo-secure-store';

// Store user data
export async function storeUserData(user) {
  try {
    await SecureStore.setItemAsync('user', JSON.stringify(user));
  } catch (error) {
    console.log('Error storing user data:', error);
  }
}

// Retrieve user data
export async function getUserData() {
  try {
    const userData = await SecureStore.getItemAsync('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.log('Error retrieving user data:', error);
    return null;
  }
}
