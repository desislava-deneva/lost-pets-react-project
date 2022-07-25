import './AddPet.css';
import { createRecord } from '../../api/data';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddPet = (params) => {

    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petBirthYear, setBirthYear] = useState('');
    const [petCity, setPetCity] = useState('');
    const [petNeighborhood, setPetNeighborhood] = useState('');
    const [petImg, setPetImg] = useState('');
    const [petLostData, setPetLostData] = useState('');
    const [petDescription, setPetDescription] = useState('');

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            "name": petName,
            "type": petType,
            "birthYear": petBirthYear,
            "city": petCity,
            "neighborhood": petNeighborhood,
            "dataLost": petLostData,
            "img": petImg,
            "description": petDescription,
        }

        createRecord(data)
            .then(result => {
                console.log(result)
            })

        navigate('/')

    }

    const onChangeHandler = (e) => {
        if (e.target.name === "name") {
            setPetName(e.target.value)
        } else if (e.target.name === "img") {
            setPetImg(e.target.value)
        } else if (e.target.name === "lostData") {
            setPetLostData(e.target.value);
        } else if (e.target.name === "city") {
            setPetCity(e.target.value)

        } else if (e.target.name === "neighborhood") {
            setPetNeighborhood(e.target.value)
        } else if (e.target.name === "birthYear") {
            setBirthYear(e.target.value)
        } else if (e.target.name === "type") {
            setPetType(e.target.value)

        } else if (e.target.name === "description") {
            setPetDescription(e.target.value)
        }
    }

    return (
        <section className="add">
            <div className='pet-form'>
                <h2 className="add-title">{params.add.add} form</h2>
                <form className="add-form" onSubmit={onSubmitHandler} onChange={onChangeHandler}>
                    <label htmlFor="pet-name">Pet name:</label>
                    <input type="text" name="name" className="add-input" id="name" placeholder="Bruno" value={petName} />
                    <label htmlFor="img">Image url:</label>
                    <input type="text" name="img" className="add-input" id="img" placeholder="http:// or https://" value={petImg} />
                    <label htmlFor="lostData">Data of lost:</label>
                    <input type="text" id="lostData" className="add-input" name="lostData" placeholder="19.06.2022" value={petLostData} />
                    <label htmlFor="lost-in-sity">Lost in sity:</label>
                    <input type="text" id="city" className="add-input" name="city" placeholder="Sofia" value={petCity} />
                    <label htmlFor="neighborhood">Lost in neighborhood:</label>
                    <input type="text" id="neighborhood" className="add-input" name="neighborhood" placeholder="Mladost 1" value={petNeighborhood} />
                    <label htmlFor="birthYear">Birth Year:</label>
                    <input type="text" id="birthYear" className="add-input" name="birthYear" placeholder="2009" value={petBirthYear} />
                    <label htmlFor="species">Species:</label>
                    <input type="text" id="type" className="add-input" name="type" placeholder="Dog" value={petType} />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" cols="30" rows="5">{petDescription}</textarea>
                    <input type="submit" className="add-submit" value={params.add.textBtn} />
                </form>
            </div>
        </section>
    )
}