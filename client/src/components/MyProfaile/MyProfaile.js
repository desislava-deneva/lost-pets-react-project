import './MyProfaile.css'
import { Pet } from '../Pet/Pet'
import { AuthContext } from '../../contexts/AuthContext';
import { PetContext } from '../../contexts/PetContext';
import { useContext, useEffect, useState } from 'react';
import profailePicture from './unisex-image.jpeg';

export const MyProfaile = () => {

    const { user, onEditUserProfaileHandler, isEdit } = useContext(AuthContext);
    const { pets } = useContext(PetContext);

    const [myPets, setMyPets] = useState([]);

    useEffect(() => {
        const result = pets.filter((x) => x.owner === user._id);
        setMyPets(result);
    }, [pets, user._id]);

    let nameInput = <input type="name" name='name' placeholder='Ivan Ivanov' />
    let usernameInput = <input type="username" name='username' placeholder='Username' />
    let userImg = <input type="img" name='img' placeholder='Image url' />

    return (
        <div className="my-profaile-page">
            <div className="my-profaile">

                <img src={user.img ? user.img : profailePicture} alt="img" className='profaile-picture' />
                {isEdit ? userImg : ""}

                <ul>
                    <li>Name: {user.name}</li>
                    {isEdit ? nameInput : ""}
                    <li>Username: {user.username}</li>
                    {isEdit ? usernameInput : ""}
                </ul>
                <div className='edit-profaile' onClick={onEditUserProfaileHandler}>Edit profaile</div>
            </div>

            <div className="my-pets">
                <h2>My lost pets</h2>
                {myPets ? myPets.map(pet => <Pet key={pet._id} pet={pet} />) : <h1>No pets in database</h1>}
            </div>
        </div>
    )
}