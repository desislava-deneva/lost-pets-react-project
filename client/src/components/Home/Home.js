import './Home.css';
import { Pet } from '../Pet/Pet'
import { useState, useEffect } from 'react';
import * as api from '../../api/data';

export const Home = (props) => {

    const [pets, setPets] = useState([]);

    useEffect( () => {
     api.getPets()
      .then(result=>{
        result.reverse()
        result.length = 4;
        setPets(result)
        console.log(result);
      });

    },[])

    return (

        <div className="home-list">
            <div className="home-pets">
                <h1>Last lost pets</h1>
                {pets.map(pet => <Pet key={pet._id} pet={pet} />)}
            </div>
        </div>

    )
}