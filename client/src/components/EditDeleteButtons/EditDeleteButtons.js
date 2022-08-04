import './Buttons.css'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as api from '../../api/data';

export const EditDeleteButtons = (props) => {
    
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const deleteHandler = () => {
    
        api.deleteRecord(id)
            .then(() => {
                navigate('/catalog')
            })
            .catch(err => console.error(err));
        return null;
    }
   
    return (
        <div id="edit-delete-buttons" className='button edit-delete-buttons' >
            <Link to={`/edit/${props.pet._id}`} className="btn-edit">Edit</Link>
            <Link to={`/delete/${props.pet._id}`} onClick={deleteHandler} className="btn-delete">Delete</Link>
        </div>

    )
}