import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api/data'


export const Login = ({
    onLogin
}) => {
    const navigate = useNavigate();

    const onLoginhandler = async (e) => {
        e.preventDefault()

        let formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        await api.login(username, password);
        
        navigate('/')
    }

    return (
        <section className="login-wrapper">
            <section className="login">
                <h2 className="login-title">Login form</h2>
                <form className="login-form" onSubmit={onLoginhandler}>
                    <input type="username" id="username" name="username" className="login-input" placeholder="Username" />
                    <input type="password" id="password" name="password" className="login-input" placeholder="Password" />
                    <input type="submit" className="login-submit" value="Sign up" />
                </form>
            </section>
        </section>
    );
}
