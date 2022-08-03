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

function App() {
  const [user, setUserInfo] = useState({username: '', authToken: '', _id: ''});

  const onLogin = (data) => {
    setUserInfo(data)
  }

  const onLogout = () => {
    let token = sessionStorage.getItem('authToken');
    let username = sessionStorage.getItem('username');
    let userId = sessionStorage.getItem('userId');
    token ='';
    username = '';
    userId = ''
    setUserInfo({username, authToken:token, _id: userId});
  }


  return (
    <AuthContext.Provider value={{user, onLogin, onLogout}}>
      <BrowserRouter>
      <main>
        <div className="App">
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<AddPet add={{ add: "Add", textBtn: "Submit" }} />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/edit/:id' element={<EditPage edit={{ edit: "Edit", textBtn: "Edit" }} />} />
            <Route path='/logout' element={<Logout/>} />
          </Routes>
        </div>
      </main>

      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
