import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import * as api from '../../api/data'
import { Link } from 'react-router-dom';

export const Login = () => {
    const { onLogin } = useContext(AuthContext)
    const navigate = useNavigate();

    const onLoginhandler = (e) => {
        e.preventDefault()

        let formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
        api.login(username, password)
            .then(res => {
                onLogin(res);
                navigate('/')
            })
            .catch(err=>{
                throw err
            })
    }

    return (
        <section className="login-wrapper">
            <section className="login">
                <h2 className="login-title">Login form</h2>
                <form className="login-form" onSubmit={onLoginhandler}>
                    <input type="username" id="username" name="username" className="login-input" placeholder="Username" />
                    <input type="password" id="password" name="password" className="login-input" placeholder="Password" />
                    <input type="submit" className="login-submit" value="Sign up" />
                   <span>You don't have a profaile click <b><Link to="/register" className="button" >register</Link></b></span> 
                </form>
            </section>
        </section>
    );
}
