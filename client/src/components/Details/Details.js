import './Details.css'
import { EditDeleteButtons } from '../EditDeleteButtons/EditDeleteButtons'
import { useState, useEffect } from 'react';
import { Likes } from '../Likes/Likes';
import { useParams } from 'react-router-dom';
import { GoogleMap } from '../GoogleMap/GoogleMap';
import * as api from '../../api/data';

export const Details = (props) => {
    const [pet, setPet] = useState({});
    const userId = sessionStorage.userId;
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
        <article id='details-page'>
            <h1>Details</h1>
            <div className='flex-container'>
                <div className="details-pet">
                    <img src={pet.img} alt={pet.name} />
                    <h3>{pet.type} name:  <span>{pet.name}</span></h3>
                    <h5>Birth Year: <span>{pet.birthYear} year</span></h5>
                    <h5>Data Of Lost: {pet.dataLost} </h5>
                    <h5>City: {pet.city}</h5>
                    <h5>Neighborhood: {pet.neighborhood}</h5>

                    <div className="description-details center">
                        {pet.description}
                    </div>
                    {pet.owner === userId ? '' : <Likes petsId={id} />}
                    {pet.owner === userId ? <EditDeleteButtons pet={pet} /> : ""}

                </div>

                <div className="comments">
                    <h1>Comments:</h1>
                    <ul>
                        <li>Comment 1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply </li>
                        <li>Comment 2</li>
                        <li>Comment 3</li>
                        <li>Comment 4</li>
                    </ul>
                </div>
            </div>
            <GoogleMap />
        </article>

    )
}