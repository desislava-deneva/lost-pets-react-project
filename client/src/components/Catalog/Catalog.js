import './Catalog.css'
import { Pet } from '../Pet/Pet'
import { useState, useEffect } from 'react';
import * as api from '../../api/data';

export const Catalog = (props) => {
    const [pets, setPets] = useState([]);
    const text = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo dolores, quasi pariatur odio repellat dicta quas libero nulla quo quisquam porro architecto officiis! Laudantium hic ab est nemo voluptatem dolor'

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
                } else {
                    setPets(result)
                }
            });
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
                {pets.map(pet => <Pet key={pet._id} pet={pet} />)}
            </div>
        </div>
    )
}
