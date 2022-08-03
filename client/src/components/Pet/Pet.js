// import { LikeButton } from '../Likes/Likes'
import './Pet.css'
import { Link } from 'react-router-dom';

export const Pet = (props) => {
    
    return (
            <div className="pet">
                <Link to={`/details/${ props.pet._id}`}><img className='imageList' src={props.pet.img} alt={props.pet.name} pet={props.pet}/></Link>
                <h3>{props.pet.species}</h3>
                <h4>Name: <span>{props.pet.name}</span></h4>
                <h4>Lost in : <span>{props.pet.city}</span></h4>
                <p className="pet-description">{!props.pet.description ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry ': props.pet.description }</p>
            </div>
    )
}
