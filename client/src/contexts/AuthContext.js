import { createContext, useState } from 'react';
import * as api from '../api/data';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [user, setUserInfo] = useState({ username: '', authToken: '', _id: '', name: '', img: '' });
    const [isEdit, setIsEdit] = useState(false);


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

    const onEditUserProfaileHandler = async (e) => {
        if (!isEdit) {
            setIsEdit(true);
        } else {
            const { img, name, username } = document.getElementsByTagName('input');

            setIsEdit(false);

            try {
                const newUser = await api.updateUserProfaile({ authToken: user.authToken, _id: user._id, name: name.value, username: username.value, img: img.value });

                if (img.value) {
                    const URL_PATTERN = /^https?:\/\/(.+)/;
                }

                setUserInfo({authToken: user.authToken, _id: user._id, name: newUser.name, username: newUser.username, img: newUser.img })

            } catch (error) {
                setUserInfo({ ...user })
                throw new Error(error.message)
            }

        }
    }

    return (
        <AuthContext.Provider value={{ user, onLogin, onLogout, onRegister, onEditUserProfaileHandler, isEdit }}>
            {props.children}
        </AuthContext.Provider>
    );

}
