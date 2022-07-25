import { useNavigate } from 'react-router-dom';


export const Logout = ()=>{
    const navigate = useNavigate();

    sessionStorage.clear();
    localStorage.clear();

    navigate('/');
}