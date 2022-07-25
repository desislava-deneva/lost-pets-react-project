import './Buttons.css'
import { Link } from 'react-router-dom';

export const EditDeleteButtons = (props) => {
   
    return (
        <div id="edit-delete-buttons" className='button' >
            <Link to={`/edit/${props.pet._id}`} className="btn-edit">Edit</Link>
            <Link to={`/delete/${props.pet._id}`} className="btn-delete">Delete</Link>
        </div>

    )
}