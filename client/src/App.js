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
import { Footer } from './components/Footer/Footer';
import { NotFound } from './components/NotFound/NotFound';
import { PrivateRouteGard } from './components/PrivateRouteGard/PrivateRouteGard';

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
              <Route element={<PrivateRouteGard />}>
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/create" element={<AddPet />} />
                <Route path='/edit/:id' element={<EditPage />} />
              </Route>
              <Route path='/my-profail' element={<MyProfaile />} />
              <Route path='/details/:id' element={<Details />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
          </ValidationProviders>
        </PetProviders>
      </div>
    </AuthProvider>
  );
}
export default App;
