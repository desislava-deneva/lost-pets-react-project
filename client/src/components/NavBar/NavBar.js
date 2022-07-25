import './NavBar.css';
import { Link } from 'react-router-dom';


export const NavBar = ({
    isAuthenticated,
    user
}) => {

    let userNav = (
        <ul className="nav navbar-nav user">
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="/catalog" className="button" >Catalog of lost pets</Link></li>
            <li> <Link className="button" to="/my-profail">My Profail</Link></li>
            <li> <Link className="button" to="/create">Add Pets</Link></li>
            <li className='navRigth'> <Link className="button" to="/logout">Logout</Link></li>
        </ul>
    );

    let guestNav = (
        <ul className="nav navbar-nav guest">
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="/login"><span className="login-user"></span>Login</Link></li>
            <li><Link to="/register"><span className="register-user"></span> Register</Link></li>
        </ul>
    );

    return (
        <header>
            <nav className="navbar">
                <div className="container-nav center">
                    <Link to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYJFkg33PO4QnK06474BVqODtbAstj29jqGA&usqp=CAU" alt="home" className="home-jpg" /></Link>
                    {isAuthenticated ? userNav : guestNav}
                </div>
            </nav>
        </header>

    );
};