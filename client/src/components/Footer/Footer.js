
import './Footer.css';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export const Footer = () => {
    const { user } = useContext(AuthContext)
    const isAuth = user.authToken ? true : false;
    return (
        isAuth ? 
            <footer className="footer">
                <div>
                    <b><span>Menu</span></b>
                    <div>
                        <Link to='/catalog'>Catalog</Link>
                    </div>
                    <div>
                        <Link to='/my-profail'>My profaile</Link>
                    </div>
                    <div>
                        <Link to='/create'>Add Pet</Link>
                    </div>
                </div>
                <div className='copy'>
                    &copy; Design by Desislava Deneva.
                </div>
            </footer>

            :
                <footer className="footer">
                    <div>
                        <b><span>Menu</span></b>
                        <div>
                            <Link to='/catalog'>Catalog</Link>
                        </div>
                        <div>
                            <Link to='/'>Home</Link>
                        </div>
                    </div>
                    <div className='copy'>
                        &copy; Design by Desislava Deneva.
                    </div>
                </footer>


    );
}