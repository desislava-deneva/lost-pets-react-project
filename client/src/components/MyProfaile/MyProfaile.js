import './MyProfaile.css'
import { Pet } from '../Pet/Pet'
import * as api from '../../api/data';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import profailePicture from './unisex-image.jpeg';

export const MyProfaile = () => {

    const { user } = useContext(AuthContext);
    const [myPets, setMyPets] = useState([]);
    useEffect(() => {
        try {
            api.getPets()
                .then(res => {
                    const result = res.filter((x) => x.owner === user._id);
                    setMyPets(result);
                })
        } catch (error) {
            alert(error.message)
            throw new error(error);
        }

    }, [])

    return (
        <div className="my-profaile-page">
            <div className="my-profaile">
                <img src={profailePicture} alt="img" className='profaile-picture' />
                <ul>
                    <li>Name: {user.name}</li>
                    <li>Username: {user.username}</li>
                </ul>
                <button>Edit profaile</button>

            </div>
            <div className="my-pets">
                {myPets && myPets.map(pet => <Pet key={pet._id} pet={pet} />)}
            </div>

        </div>
    )
}