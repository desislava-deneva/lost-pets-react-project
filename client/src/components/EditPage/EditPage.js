import './EditPage.css'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../../api/data'


export const EditPage = (props) => {

    const [pet, setPet] = useState({});
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        api.getPetById(id)
            .then(result => {
                setPet(result)
                console.log(result)
            })
    }, [id])


    const onChangeHandler = (e) => {
        if (e.target.name === "name") {
            setPet({ ...pet, name: e.target.value })
            console.log(e.target.value)
        }
        else if (e.target.name === "img") {
            setPet({ ...pet, img: e.target.value })

        } else if (e.target.name === "dataLost") {
            setPet({ ...pet, dataLost: e.target.value })

        } else if (e.target.name === "city") {
            setPet({ ...pet, city: e.target.value })

        } else if (e.target.name === "neighborhood") {
            setPet({ ...pet, neighborhood: e.target.value })

        } else if (e.target.name === "birthYear") {
            const birdYearInput = Number(e.target.value);
            console.log(birdYearInput);
            if (birdYearInput >= 0 && birdYearInput <= 2022) {
                setPet({ ...pet, birthYear: e.target.value })
            } else {
                alert('Birth Year year must be number');
            }
        } else if (e.target.name === "type") {
            if(e.target.value === "Dog" || e.target.value === "Cat"){
                setPet({ ...pet, type: e.target.value })
            }
        } else if (e.target.name === "description") {
            if (e.target.value.length > 500) {
                alert('Description must be <= 500 charecters');
                throw console.error('Description must be <= 500 charecters');
            }
            setPet({ ...pet, description: e.target.value })
        }

        console.log(pet)

    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        await api.editRecord(id, pet);
        navigate('/details/' + id)

    }
    return (
        <section className="add">
            <div className='pet-form' onSubmit={onSubmitHandler}>
                <h2 className="add-title">Edit form</h2>
                <form className="add-form" onChange={onChangeHandler}>
                    <label htmlFor="pet-name">Pet name:</label>
                    <input type="text" name="name" className="add-input" id="name" placeholder="Bruno" value={pet.name} />
                    <label htmlFor="img">Image url:</label>
                    <input type="text" name="img" className="add-input" id="img" placeholder="http:// or https://" value={pet.img} />
                    <label htmlFor="dataLost">Data of lost:</label>
                    <input type="text" id="dataLost" className="add-input" name="dataLost" placeholder="19.06.2022" value={pet.dataLost} />
                    <label htmlFor="lost-in-sity">Lost in sity:</label>
                    <input type="text" id="city" className="add-input" name="city" placeholder="Sofia" value={pet.city} />
                    <label htmlFor="neighborhood">Lost in neighborhood:</label>
                    <input type="text" id="neighborhood" className="add-input" name="neighborhood" placeholder="Mladost 1" value={pet.neighborhood} />
                    <label htmlFor="birthYear">Birth Year:</label>
                    <input type="text" id="birthYear" className="add-input" name="birthYear" placeholder="2009" value={pet.birthYear} />
                    <label htmlFor="species">Species:</label>
                    <input type="text" id="type" className="add-input" name="type" placeholder="Dog" value={pet.type} />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" cols="30" rows="5" value={pet.description}></textarea>

                    <input type="submit" className="add-submit" value="Edit" />
                </form>
            </div>

        </section>
    )
}