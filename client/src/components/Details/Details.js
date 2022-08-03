import './Details.css'
import { EditDeleteButtons } from '../EditDeleteButtons/EditDeleteButtons'
import { useState, useEffect } from 'react';
import { LikeButton } from '../Likes/Likes';
import { LikesDesy } from '../Likes/Likes';
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
                console.log(pet);
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
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry </p>

                </div>
                {pet.owner === userId ? '' : <LikesDesy petsId={id} />}
            </div>

            <div className="comments">
                <ul>
                    <li>Comment 1</li>
                    <li>Comment 2</li>
                    <li>Comment 3</li>
                    <li>Comment 4</li>
                </ul>
            </div>
            </div>
           
            {pet.owner === userId ? <EditDeleteButtons pet={pet} /> : ""}


            <GoogleMap />
        </article>

    )
}