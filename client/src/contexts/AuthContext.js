import { createContext, useState } from 'react';
import * as api from '../api/data';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [user, setUserInfo] = useState({ username: '', authToken: '', _id: '', name: '', img: '' });



    const onLogin = (data) => {
        setUserInfo({ ...user, username: data.username, authToken: data.accessToken, _id: data._id, name: data.name, img: data.img })
    }

    const onLogout = () => {
        setUserInfo({ username: "", authToken: "", _id: "", names: "", img: "" });
        sessionStorage.clear();
    }

    const onRegister = (data) => {
        let token = sessionStorage.getItem('authToken');
        let userId = sessionStorage.getItem('userId');
        setUserInfo({ username: data.username, authToken: token, _id: userId, name: data.name, img: "" })
    }

    const onEditProfaile = (data) => {
        const img = data.img ? data.img : user.img;
        const name = data.name ? data.name : user.name;
        const username = data.username ? data.username : user.username;
        console.log(img, name, username);
        setUserInfo({ username, name, img, authToken: user.authToken, _id: user._id, });
        return user;
    }

    return (
        <AuthContext.Provider value={{ user, onLogin, onLogout, onRegister, onEditProfaile }}>
            {props.children}
        </AuthContext.Provider>
    );

}
