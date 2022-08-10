import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { AddPet } from './components/AddPet/AddPet';
import { Routes, Route } from "react-router-dom";
import { Details } from './components/Details/Details'
import { EditPage } from './components/EditPage/EditPage';
import { Logout } from './components/Logout/Logout';
import { MyProfaile } from './components/MyProfaile/MyProfaile';
import { AuthProvider } from './contexts/AuthContext'
import { PetProviders } from './contexts/PetContexts'
import { ValidationProviders } from './contexts/validationContext';

function App() {


  return (
    <AuthProvider>
      <div className="App">
        <PetProviders>
          < ValidationProviders>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<AddPet />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path='/details/:id' element={<Details />} />
              <Route path='/edit/:id' element={<EditPage />} />
              <Route path='/my-profail' element={<MyProfaile />} />
              <Route path='/logout' element={<Logout />} />
            </Routes>
          </ValidationProviders>
        </PetProviders>
      </div>
    </AuthProvider>
  );
}
export default App;
