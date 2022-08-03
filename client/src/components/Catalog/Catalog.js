import './Catalog.css'
import { Pet } from '../Pet/Pet'
import { useState, useEffect } from 'react';
import * as api from '../../api/data';

export const Catalog = (props) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        api.getPets()
            .then(result => {
                setPets(result)
            });

    }, []);

    const onSelectSort = (e) => {
        const dropValue = e.target.value;
        api.getPets()
        .then(result => {
            if (dropValue === 'name') {
                setPets(result.sort((a, b) => a.name.localeCompare(b.name)))
            } else if (dropValue === 'city') {
                setPets(result.sort((a, b) => a.city.localeCompare(b.city)))
            }else{
                setPets(result)
            }
        });
    }

    return (
        <div className="calalog">
            <div className="dropdown" onChange={onSelectSort}>
                <div>SortBy</div>
                <select className="dropbtn" name="sort">
                    <option value=""></option>
                    <option value="name">Name</option>
                    <option value="city">City</option>
                    <option value="data">Data</option>
                </select>
            </div>
            <h1>Catalog of lost pets</h1>
            <div className='list'>

                {pets.map(pet => <Pet key={pet._id} pet={pet} />)}
            </div>
        </div>
    )
}
