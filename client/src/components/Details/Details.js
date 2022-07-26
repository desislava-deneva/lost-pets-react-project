import './Details.css'
import { EditDeleteButtons } from '../EditDeleteButtons/EditDeleteButtons'
import { useState, useEffect, useContext } from 'react';
import { Likes } from '../Likes/Likes';
import { useParams } from 'react-router-dom';
import { GoogleMap } from '../GoogleMap/GoogleMap';
import { Comments } from '../Comments/Comments'
import * as api from '../../api/data';
import { PetContexts } from '../../contexts/PetContexts';

export const Details = () => {

    const [pet, setPet] = useState({});
    const { delPet } = useContext(PetContexts);
    const userId = sessionStorage.userId;
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        api.getPetById(id)
            .then(result => {
                setPet(result)
            })
    }, []);

    //TODO when pet is Found setup Faund pet div
    const [isFounded, setIsFounded] = useState(false);

    const isFoundedHandler = (e) => {
        setIsFounded(isFounded => isFounded = true);
    }

    const deleteHandler = () => {
        api.deleteRecord(id)
            .then(() => {
                delPet(id)
            })
            .catch(err => console.error(err));
        return null;
    }

    return (
        <>
            <h1>Details</h1>
            <article id='details-page' className='details-page center'>
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
                                <EditDeleteButtons pet={{ pet, deleteHandler }} />
                            </div>
                            : ""
                        }
                    </div>
                </div>
                <Comments key={pet._id} comments={{ comments: pet.comments, pet }} />
            </article>
            <GoogleMap />
        </>
    )
}