import './Register.css';
// import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api/data'

import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';


// form onSubmit={onRegisterHandler}
export const Register = (props) => {

    const navigate = useNavigate();
    const {onRegister} = useContext(AuthContext)

    const onRegisterHandler = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const username = formData.get('username');
        const password = formData.get('password');
        const repass = formData.get('repass');

        if (name.length < 3) {
            return alert('Your name should be at least 3 characters.');
        }

        if (password.length < 4) {
            return alert('Your password should be at least 4 characters.');
        }

        if (password !== repass) {
            return alert('Your password and repeat password do not match.');
        }

        if(!username){
            return alert('Your username do not match.');

        }

        e.target.reset();

        await api.register(name, username, password)
        
        onRegister({name, username})
        navigate('/')
    }



    return (
        <section className="register-wrapper">
            <section className="register">
                <h2 className="register-title">Register form</h2>
                <form className="register-form" onSubmit={onRegisterHandler} >
                    <input type="text" name="name" id="name" className="register-input" placeholder="Ivan Ivanov" />
                    <input type="username" id="username" name="username" className="register-input" placeholder="Username" />
                    <input type="password" id="password" name="password" className="register-input" placeholder="Password" />
                    <input type="password" id="repass" name="repass" className="register-input" placeholder="Confirm password" />
                    <input type="submit" className="register-submit" value="Register" />
                </form>

            </section>
        </section>
    );
}