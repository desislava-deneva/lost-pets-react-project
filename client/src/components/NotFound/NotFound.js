import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
    return (
        <section className="not-found">
            <Link to="/"><b>Page Not Found 404. Click here to go to Home Page</b>.</Link>
        </section>
    );
}