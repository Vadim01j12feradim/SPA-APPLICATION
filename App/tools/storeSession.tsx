import AsyncStorage from '@react-native-async-storage/async-storage';

const storeSession = async (token: any) => {
    try {
        // Convert token to a string before storing
        await AsyncStorage.setItem('sessionToken', JSON.stringify(token));
        console.log('Session created successfully');
    } catch (error) {
        console.error('Error storing session:', error);
    }
};

const getSession = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('sessionToken');
        if (token !== null) {
            //console.log('Session token:', token);
            return JSON.parse(token); // Parse the string back into its original form if needed
        } else {
            console.log('No session found');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving session:', error);
        return null; // Ensure null is returned in case of an error
    }
};


const clearSession = async () => {
    try {
        await AsyncStorage.removeItem('sessionToken');
        console.log('Session cleared');
    } catch (error) {
        console.error('Error clearing session:', error);
    }
};

export default {
    storeSession,
    getSession,
    clearSession,
};