import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouteGard = () => {
    const { user } = useContext(AuthContext);

    console.log(user);

    if (!user.authToken) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />;
}