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

    }, [])

    return (

        <div className="calalog">
                <div className="dropdown">
                    <select className="dropbtn">SortBy
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
