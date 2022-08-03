// import { LikeButton } from '../Likes/Likes'
import './Pet.css'
import { Link } from 'react-router-dom';

export const Pet = (props) => {

    const onClickDescriptionHandler=((e)=>{
        console.log(e.target.className);
        if(e.target.className ==='hover'){
            e.target.className= 'pet-description'
        }else{
            e.target.className= 'hover'
        }
    })
    
    return (
            <div className="pet">
                <Link to={`/details/${ props.pet._id}`}><img className='imageList' src={props.pet.img} alt={props.pet.name} pet={props.pet}/>
                <h3>{props.pet.type} name: <span>{props.pet.name}</span></h3>
                </Link>
                <h4>Lost in : <span>{props.pet.city}</span></h4>
                <p onClick={onClickDescriptionHandler} className="pet-description">{!props.pet.description ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry ': props.pet.description }</p>
            </div>
    )
}
