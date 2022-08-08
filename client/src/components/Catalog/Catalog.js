import './Catalog.css'
import { Pet } from '../Pet/Pet'
import { useContext } from 'react';
import { PetContext } from '../../contexts/PetContext';

export const Catalog = () => {
    const { pets, onSelectSort} = useContext(PetContext);
   
    return (

        <div className="calalog" >
            <div className="dropdown" >
                <select className="dropbtn" name="sort" onChange={onSelectSort} >
                    <option value="Sort by">Sort by</option>
                    <option value="name">Name</option>
                    <option value="city">City</option>
                </select>
            </div>
            <div className='list'>
                {
                    pets ? pets.map(pet => <Pet key={pet._id} pet={pet} />) : <h1>No pets in database</h1>
                }
            </div>
        </div>
    )
}
