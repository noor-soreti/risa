import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(`asyncStorageHelper.tsx - Error storing data: ${e}`);
    }
}

// function to get data for key
export const getItemFor = async (key: any) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        }
    } catch (e) {
        console.log(`asyncStorageHelper.tsx - Error getting data: ${e}`);
    }
}