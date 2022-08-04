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
import { setUserSessionStorage } from './api/authServices';

function App() {
  const [user, setUserInfo] = useState({ username: '', authToken: '', _id: '', name: '' });

  const onLogin = (data) => {
    setUserInfo({ username: data.username, authToken: data.accessToken, _id: data._id, name: data.name })
  }

  const editUserSessionStorage = (names, username) => {
    let token = sessionStorage.getItem('authToken');
    let userId = sessionStorage.getItem('userId');
    setUserInfo({ username, authToken: token, _id: userId, name:names });
  }

  const onLogout = () => {
    setUserInfo({ username:"", authToken: "", _id: "", names:"" });
  }

  const onRegister = (data) => {
    let token = sessionStorage.getItem('authToken');
    let userId = sessionStorage.getItem('userId');
    setUserInfo({ username: data.username, authToken: token, _id: userId, name: data.name })
  }

  return (
    <AuthContext.Provider value={{ user, onLogin, onLogout, onRegister, editUserSessionStorage }}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<AddPet add={{ add: "Add", textBtn: "Submit" }} />} />
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
