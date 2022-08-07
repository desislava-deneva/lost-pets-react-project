import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { AddPet } from './components/AddPet/AddPet';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from './components/Details/Details'
import { useEffect, useState } from 'react';
import { EditPage } from './components/EditPage/EditPage';
import { Logout } from './components/Logout/Logout';
import { AuthContext } from './contexts/AuthContext'
import { MyProfaile } from './components/MyProfaile/MyProfaile';
import * as api from '../src/api/data';

function App() {

  const [user, setUserInfo] = useState({ username: '', authToken: '', _id: '', name: '', img: '' });
  const [classNameIsValid, setClassNameIsValid] = useState({ name: '', img: '', lostData: '', city: '', neighborhood: '', type: '', description: '', user: { name: '', username: '', password: '', repass: '' } });
  const [isEdit, setIsEdit] = useState(false);
  const [buttonComment, setButtonComment] = useState(false);


  const onLogin = (data) => {
    setUserInfo({ ...user, username: data.username, authToken: data.accessToken, _id: data._id, name: data.name, img: data.img })
  }

  const onLogout = () => {
    setUserInfo({ username: "", authToken: "", _id: "", names: "", img: "" });
  }

  const onRegister = (data) => {
    let token = sessionStorage.getItem('authToken');
    let userId = sessionStorage.getItem('userId');
    setUserInfo({ username: data.username, authToken: token, _id: userId, name: data.name, img: "" })
  }

  const validateFormData = (e) => {
    const eventValue = e.target.value;
    const eventName = e.target.name;
    const parentElement = e.target.parentElement;

    if (parentElement.className === 'register-form') {
      if (eventName === 'name') {
        eventValue.length >= 3 ?
          setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, name: true } }) :
          setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, name: false } });

      } else if (eventName === 'username') {
        eventValue.length >= 3 ?
          setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, username: true } }) :
          setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, username: false } });
      } else if (eventName === 'password') {
        eventValue.length >= 4 ?
          setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, password: true } }) :
          setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, password: false } });
      }

    } else {
      if (eventName === "name") {
        eventValue.length < 2 ?
          setClassNameIsValid({ ...classNameIsValid, name: false }) :
          setClassNameIsValid({ ...classNameIsValid, name: true });
      } else if (eventName === "img") {
        const URL_PATTERN = /^https?:\/\/(.+)/;
        URL_PATTERN.test(eventValue) ?
          setClassNameIsValid({ ...classNameIsValid, img: true })
          : setClassNameIsValid({ ...classNameIsValid, img: false });
      } else if (eventName === "lostData") {
        const LOST_DATA_PATTERN = /^[\d]{2}.[\d]{2}.[\d]{4}$/;
        LOST_DATA_PATTERN.test(eventValue) ?
          setClassNameIsValid({ ...classNameIsValid, lostData: true })
          : setClassNameIsValid({ ...classNameIsValid, lostData: false })
      } else if (eventName === "city") {
        eventValue.length < 3 ?
          setClassNameIsValid({ ...classNameIsValid, city: false }) :
          setClassNameIsValid({ ...classNameIsValid, city: true });
      } else if (eventName === "neighborhood") {
        eventValue.length < 3 ?
          setClassNameIsValid({ ...classNameIsValid, neighborhood: false }) :
          setClassNameIsValid({ ...classNameIsValid, neighborhood: true });
      } else if (eventName === "birthYear") {
        Number(eventValue) < 2000 || Number(eventValue) > 2022 ?
          setClassNameIsValid({ ...classNameIsValid, birthYear: false }) :
          setClassNameIsValid({ ...classNameIsValid, birthYear: true })
      } else if (eventName === "type") {
        eventValue === 'Dog' || eventValue === 'Cat' ?
          setClassNameIsValid({ ...classNameIsValid, type: true }) :
          setClassNameIsValid({ ...classNameIsValid, type: false })
      } else if (eventName === "description") {
        eventValue.length > 500 ?
          setClassNameIsValid({ ...classNameIsValid, description: false }) :
          setClassNameIsValid({ ...classNameIsValid, description: true })
      }
    }

  }

  const onEditUserProfaileHandler = async (e) => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      const { img, name, username } = document.getElementsByTagName('input');

      setIsEdit(false);

      try {
        const newUser = await api.updateUserProfaile({ ...user, name: name.value, username: username.value, img: img.value });

        if (img.value) {
          const URL_PATTERN = /^https?:\/\/(.+)/;
        }

        setUserInfo({ ...user, name: newUser.name, username: newUser.username, img: newUser.img })

      } catch (error) {
        setUserInfo({ ...user })
        throw new Error(error.message)
      }

    }
  }

  const setButtonCommentHandler = (e) => {
    setButtonComment(true);
  }

  return (
    <AuthContext.Provider value={{ user, onLogin, onLogout, onRegister, validateFormData, classNameIsValid, onEditUserProfaileHandler, isEdit, buttonComment, setButtonCommentHandler, setButtonComment }}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<AddPet />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/edit/:id' element={<EditPage edit={{ edit: "Edit", textBtn: "Edit" }} />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/my-profail' element={<MyProfaile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
export default App;
