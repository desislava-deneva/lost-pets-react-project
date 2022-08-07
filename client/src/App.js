import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { AddPet } from './components/AddPet/AddPet';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from './components/Details/Details'
import { useState } from 'react';
import { EditPage } from './components/EditPage/EditPage';
import { Logout } from './components/Logout/Logout';
import { MyProfaile } from './components/MyProfaile/MyProfaile';
import { AuthProvider } from './contexts/AuthContext'

function App() {

  const [user, setUserInfo] = useState({ username: '', authToken: '', _id: '', name: '', img: '' });
  const [buttonComment, setButtonComment] = useState(false);

  const setButtonCommentHandler = (e) => {
    setButtonComment(true);
  }

  return (
    <AuthProvider>
      {/* <AuthContext.Provider value={{ validateFormData, classNameIsValid, onEditUserProfaileHandler, isEdit, buttonComment, setButtonCommentHandler, setButtonComment }}> */}
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
      {/* </AuthContext.Provider> */}
    </AuthProvider>
  );
}
export default App;
