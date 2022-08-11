import './Register.css';
// import { useContext, createContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../../api/data'

import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';

export const Register = () => {

    const navigate = useNavigate();

    const { onRegister } = useContext(AuthContext)
    const [validationForm, setValidationForm] =
        useState(
            { user: { name: '', username: '', password: '', repass: '' } }
        );

    const onRegisterHandler = async (e) => {
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

        if (!username) {
            return alert('Your username do not match.');
        }

        if (validationForm.user.name && validationForm.user.username && validationForm.user.password) {
            await api.register(name, username, password)

            onRegister({ name, username })
            navigate('/')
        } else {
            throw console.error('Pls, fill corect all fieleds in register form');
        }

        e.target.reset();
    }

    const validateFormData = (e) => {
        const eventValue = e.target.value;
        const eventName = e.target.name;
        const parentElement = e.target.parentElement;

        if (parentElement.className === 'register-form' || parentElement.className === 'my-profaile') {
            if (eventName === 'name') {
                eventValue.length >= 3 ?
                    setValidationForm({ user: { ...validationForm.user, name: true } }) :
                    setValidationForm({ user: { ...validationForm.user, name: false } });
            } else if (eventName === 'username') {
                eventValue.length >= 3 ?
                    setValidationForm({ user: { ...validationForm.user, username: true } }) :
                    setValidationForm({ user: { ...validationForm.user, username: false } });
            } else if (eventName === 'password') {
                eventValue.length >= 4 ?
                    setValidationForm({ user: { ...validationForm.user, password: true } }) :
                    setValidationForm({ user: { ...validationForm.user, password: false } });
            }
        }
    }

    return (
        <section className="register-wrapper" >
            <section className="register" onBlur={(e) => validateFormData(e)}>
                <h2 className="register-title">Register form</h2>
                <form className="register-form" onSubmit={onRegisterHandler} >

                    <input type="text" name="name" id="name" className="register-input" placeholder="Ivan Ivanov" />
                    <p className={validationForm.user.name ? 'valid-inputs' : 'errors'}>The Name should be at least 3 characters</p>

                    <input type="username" id="username" name="username" className="register-input" placeholder="Username" />
                    <p className={validationForm.user.username ? 'valid-inputs' : 'errors'}>The Username should be at least 3 characters</p>

                    <input type="password" id="password" name="password" className="register-input" placeholder="Password" />
                    <p className={validationForm.user.password ? 'valid-inputs' : 'errors'}>Your password should be at least 4 characters</p>

                    <input type="password" id="repass" name="repass" className="register-input" placeholder="Confirm password" />
                    <input type="submit" className="register-submit" value="Register" />
                    <span>You have a profaile click <b><Link to="/login" className="button" >login</Link></b></span> 
                </form>
            </section>
        </section>
    );
}