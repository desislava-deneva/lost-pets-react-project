import { useContext, createContext, useState, useEffect } from 'react';

const USER_STRING = 'user';

const AuthContext = createContext();

const userNullValues = {
    _id: null,
    name: null,
    username: null,
    accessToken: null
}

export const AuthContextProvider = ({
    children
}) => {
    const [state, setState] = useState(userNullValues);

    useEffect(() => {
        const jsonData = sessionStorage.getItem(USER_STRING);
        const userData = JSON.parse(jsonData) || userNullValues;
        setState(userData);
    }, []);

    const saveUserDataToSessionStorage = (data) => {
        const jsonData = JSON.stringify(data);
        sessionStorage.setItem(USER_STRING, jsonData);
    }

    const removeUserDataToSessionStorage = () => {
        const jsonData = JSON.stringify(userNullValues);
        sessionStorage.setItem(USER_STRING, jsonData);
    }

    const saveUserData = (userData = {}) => {
        saveUserDataToSessionStorage(userData);
        setState(userData);
    }

    const deleteUserData = () => {
        removeUserDataToSessionStorage();
        setState(userNullValues);
    }

    return (
        <AuthContext.Provider value={{ user: state, saveUserData, deleteUserData }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);