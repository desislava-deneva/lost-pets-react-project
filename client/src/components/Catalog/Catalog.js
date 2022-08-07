import './Catalog.css'
import { Pet } from '../Pet/Pet'
import { useState, useContext } from 'react';
import { PetContext } from '../../contexts/PetContext';

export const Catalog = (props) => {
    const [sortedPets, setSortedPets] = useState([]);
    const { pets } = useContext(PetContext)

    const onSelectSort = (e) => {
        const dropValue = e.target.value;

        if (dropValue === 'name') {
            setSortedPets(pets.sort((a, b) => a.name.localeCompare(b.name)))
        } else if (dropValue === 'city') {
            setSortedPets(pets.sort((a, b) => a.city.localeCompare(b.city)))
        } else {
            setSortedPets(pets)
        }
    }

    return (

        <div className="calalog">
            <div className="dropdown" onChange={onSelectSort}>
                <select className="dropbtn" name="sort">
                    <option value="Sort by">Sort by</option>
                    <option value="name">Name</option>
                    <option value="city">City</option>
                    <option value="data">Data</option>
                </select>
            </div>
            <div className='list'>

                {sortedPets ? sortedPets.map(pet => <Pet key={pet._id} pet={pet} />) : <h1>No pets in database</h1>}
            </div>
        </div>
    )
}
