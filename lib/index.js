import AsyncStorage from '@react-native-async-storage/async-storage';
export const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (error) {
        // Error saving data
    }
};
export const _storeJsonData = async (key, jsonValue) => {
    try {
        const json = JSON.stringify(jsonValue);
        await AsyncStorage.setItem(key, json);
    }
    catch (error) {
        // Error saving data
    }
};
export const _retrieveData = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    }
    catch (error) {
        // Error retrieving data
        return null;
    }
};
export const _retrieveJsonData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data && JSON.parse(data) || null;
    }
    catch (error) {
        // Error retrieving data
        return null;
    }
};
export const _removeData = async (key) => {
    try {
        return await AsyncStorage.removeItem(key);
    }
    catch (error) {
        // Error removing data
        return null;
    }
};
//# sourceMappingURL=index.js.map