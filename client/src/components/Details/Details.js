import './Details.css'
import { EditDeleteButtons } from '../EditDeleteButtons/EditDeleteButtons'
import { useState, useEffect } from 'react';
import { Likes } from '../Likes/Likes';
import { useParams } from 'react-router-dom';
import { GoogleMap } from '../GoogleMap/GoogleMap';
import { Comments } from '../Comments/Comments'
import * as api from '../../api/data';

export const Details = (props) => {
    const [pet, setPet] = useState({});
    const userId = sessionStorage.userId;
    console.log(userId)
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        api.getPetById(id)
            .then(result => {
                setPet(result)
            })
    }, []);



    const [isFounded, setIsFounded] = useState(false);

    const isFoundedHandler = (e) => {
        setIsFounded(isFounded => isFounded = true);
    }

    return (
        <article id='details-page' className='details-page'>
            <h1>Details</h1>
            <div className="flex-container">
                <div className="details-pet">
                    <img src={pet.img} alt={pet.name} />
                    <h3>{pet.type} name:  <span>{pet.name}</span></h3>
                    <h5>Birth Year: <span>{pet.birthYear} year</span></h5>
                    <h5>Data Of Lost: {pet.dataLost} </h5>
                    <h5>City: {pet.city}</h5>
                    <h5>Neighborhood: {pet.neighborhood}</h5>

                    <div className="description-details">
                        {pet.description}
                    </div>
                    {userId === undefined || pet.owner === userId ? '' : <Likes petsId={id} />}

                    {userId !== undefined && pet.owner === userId ?
                        <div>
                            <EditDeleteButtons pet={pet} />
                        </div>
                        : ""
                    }
                    <button className='comment-button'>Comment</button>
                </div>

                <Comments />
            </div>
            <GoogleMap />
        </article>

    )
}