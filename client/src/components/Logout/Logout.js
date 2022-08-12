
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as api from '../../api/data'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export const Logout = () => {
    const { onLogout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        api.logout(user.authToken)
            .then(res => {
                onLogout()
                navigate('/')
            })
    }, []);

    return null;
}
