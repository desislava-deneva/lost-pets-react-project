import './Home.css';
import { Pet } from '../Pet/Pet'
import { useState, useEffect, useContext } from 'react';
import { PetContext } from '../../contexts/PetContext';

export const Home = () => {

    const [lastAddPets, setLastAddPets] = useState([]);
    const { pets } = useContext(PetContext);

    useEffect(() => {
        lastAddPets.reverse()
        lastAddPets.length = 4;
        setLastAddPets(pets)
    }, [lastAddPets, pets])

    return (
        <div className="home-list">
            <div className="home-pets">
                <h1>Last lost pets</h1>
                {pets ? pets.map(pet => <Pet key={pet._id} pet={pet} />) : <h1>No pets in database</h1>}
            </div>
        </div>
    )
}