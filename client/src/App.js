import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { AddPet } from './components/AddPet/AddPet';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from './components/Details/Details'
import {useState, useEffect } from 'react';
import * as authServices from './api/authServices'
import { EditPage } from './components/EditPage/EditPage';
import { Logout } from './components/Logout/Logout';


function App() {
  const [userInfo, setUserInfo] = useState({isAuthenticated: false, username: ''});

  useEffect(()=>{
    let user = authServices.getUser();
    setUserInfo({
      isAuthenticated: Boolean(user),
      user,
    });
  },[]);

  const onLogin = (username)=>{
    setUserInfo({
      isAuthenticated: true,
      user: username,
    });
  }
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar {...userInfo}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<AddPet add={{add:"Add", textBtn: "Submit"}}/>} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path='/details/:id' element={<Details/>} />
          <Route path='/edit/:id' element= {<EditPage edit={{edit:"Edit", textBtn: "Edit"}}/>} />
          <Route path='/logout' element = {<Logout/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
