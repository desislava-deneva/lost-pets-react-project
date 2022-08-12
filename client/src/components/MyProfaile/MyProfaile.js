import './MyProfaile.css'
import { Pet } from '../Pet/Pet'
import { AuthContext } from '../../contexts/AuthContext';
import { PetContexts } from '../../contexts/PetContexts';
import { useContext, useEffect, useState } from 'react';
import profailePicture from './unisex-image.jpeg';
import * as api from '../../api/data';

export const MyProfaile = () => {
    const { user, onEditProfaile } = useContext(AuthContext);
    const { pets, } = useContext(PetContexts);
    const [isEdit, setIsEdit] = useState(false);
    const [myPets, setMyPets] = useState([]);

    useEffect(() => {
        const result = pets.filter((x) => x.owner === user._id);
        setMyPets(result);
    }, []);

    const onEditUserProfaileHandler = async (e) => {
        if (!isEdit) {
            setIsEdit(true);
        } else {
            const { img, name, username } = document.getElementsByTagName('input');
            setIsEdit(false);
            try {
                if (img.value) {
                    const URL_PATTERN = /^https?:\/\/(.+)/;

                    if (!URL_PATTERN.test(img.value)) {
                        alert('Url is not correct format');
                        img.value = '';
                    }
                }

                const usernameValue = username.value ? username.value : user.username;
                api.updateUserProfaile({ authToken: user.authToken, _id: user._id, name: name.value, username: usernameValue, img: img.value })
                    .then(res => {
                        onEditProfaile(res);
                    });

            } catch (error) {
                onEditProfaile({ ...user })
                throw new Error(error.message)
            }
        }
    }

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
                <div className='edit-profaile' onClick={onEditUserProfaileHandler}>Edit profile</div>
            </div>

            <div className="my-pets" >
                <h2>My lost pets</h2>
                {myPets ? myPets.map(pet => <Pet key={pet._id} pet={pet} />) : <h1>No pets in database</h1>}
            </div>
        </div>
    )
}