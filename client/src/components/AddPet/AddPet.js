import './AddPet.css';
import { createRecord } from '../../api/data';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContexts } from '../../contexts/PetContexts';

export const AddPet = () => {
    const [pet, setPet] = useState({ name: '', img: '', dataLost: '', city: '', neighborhood: '', type: '', description: '' });
    const [validationForm, setValidationForm] = useState({ name: '', img: '', dataLost: '', city: '', neighborhood: '', type: '', description: '' });
    const { AddPet } = useContext(PetContexts);
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const petData = Object.fromEntries(new FormData(e.target));

        if (
            validationForm.name &&
            validationForm.img &&
            validationForm.dataLost &&
            validationForm.city &&
            validationForm.neighborhood &&
            validationForm.birthYear &&
            validationForm.type &&
            validationForm.description
        ) {
            createRecord(petData)
                .then(result => {
                    AddPet(result)
                })

            navigate('/')
        } else {
            alert('Fill correct all fields')
        }
    }

    const onChangeHandler = (e) => {
        if (e.target.name === "name") {
            setPet({ ...pet, name: e.target.value })
        } else if (e.target.name === "img") {
            setPet({ ...pet, img: e.target.value })
        } else if (e.target.name === "dataLost") {
            setPet({ ...pet, dataLost: e.target.value })
        } else if (e.target.name === "city") {
            setPet({ ...pet, city: e.target.value })
        } else if (e.target.name === "neighborhood") {
            setPet({ ...pet, neighborhood: e.target.value })
        } else if (e.target.name === "birthYear") {
            setPet({ ...pet, birthYear: e.target.value })
        } else if (e.target.name === "type") {
            setPet({ ...pet, type: e.target.value })
        } else if (e.target.name === "description") {
            if (e.target.value.length > 500) {
                alert('Description must be <= 500 charecters');
                throw console.error('Description must be <= 500 charecters');
            }
            setPet({ ...pet, description: e.target.value })
        }
    }

    const validateFormData = (e) => {
        const eventValue = e.target.value;
        const eventName = e.target.name;

        if (eventName === "name") {
            eventValue.length < 2 ?
                setValidationForm({ ...validationForm, name: false }) :
                setValidationForm({ ...validationForm, name: true });
        } else if (eventName === "img") {
            const URL_PATTERN = /^https?:\/\/(.+)/;
            URL_PATTERN.test(eventValue) ?
                setValidationForm({ ...validationForm, img: true })
                : setValidationForm({ ...validationForm, img: false });
        } else if (eventName === "dataLost") {
            const LOST_DATA_PATTERN = /^[\d]{2}.[\d]{2}.[\d]{4}$/;
            console.log(validationForm)
            LOST_DATA_PATTERN.test(eventValue) ?
                setValidationForm({ ...validationForm, dataLost: true })
                : setValidationForm({ ...validationForm, dataLost: false })
        } else if (eventName === "city") {
            eventValue.length < 3 ?
                setValidationForm({ ...validationForm, city: false }) :
                setValidationForm({ ...validationForm, city: true });
        } else if (eventName === "neighborhood") {
            eventValue.length < 3 ?
                setValidationForm({ ...validationForm, neighborhood: false }) :
                setValidationForm({ ...validationForm, neighborhood: true });
        } else if (eventName === "birthYear") {
            Number(eventValue) < 2000 || Number(eventValue) > 2022 ?
                setValidationForm({ ...validationForm, birthYear: false }) :
                setValidationForm({ ...validationForm, birthYear: true })
        } else if (eventName === "type") {
            eventValue === 'Dog' || eventValue === 'Cat' ?
                setValidationForm({ ...validationForm, type: true }) :
                setValidationForm({ ...validationForm, type: false })
        } else if (eventName === "description") {
            eventValue.length > 500 ?
                setValidationForm({ ...validationForm, description: false }) :
                setValidationForm({ ...validationForm, description: true })
        }
    }

    return (
        <section className="add">
            <div className='pet-form' onBlur={(e) => validateFormData(e)}>
                <h2 className="add-title">Add form</h2>
                <form className="add-form" onSubmit={onSubmitHandler} onChange={onChangeHandler}>
                    <label htmlFor="pet-name">Pet name:</label>
                    <input type="text" name="name" className="add-input" id="name" placeholder="Bruno" value={pet.name} />
                    <p className={validationForm.name ? 'valid-inputs' : 'errors'}>The Name should be at least 2 characters</p>

                    <label htmlFor="img">Image url:</label>
                    <input type="text" name="img" className="add-input" id="img" placeholder="http:// or https://" value={pet.img} />
                    <p className={validationForm.img ? 'valid-inputs' : 'errors'}>Image must be a valid URL</p>

                    <label htmlFor="dataLost">Data of lost:</label>
                    <input type="text" id="dataLost" className="add-input" name="dataLost" placeholder="19.06.2022" value={pet.dataLost} />
                    <p className={validationForm.dataLost ? 'valid-inputs' : 'errors'}>The Date should be at 10 characters long</p>

                    <label htmlFor="lost-in-sity">Lost in sity:</label>
                    <input type="text" id="city" className="add-input" name="city" placeholder="Sofia" value={pet.city} />
                    <p className={validationForm.city ? 'valid-inputs' : 'errors'}>The City should be at min 3 characters long</p>

                    <label htmlFor="neighborhood">Lost in neighborhood:</label>
                    <input type="text" id="neighborhood" className="add-input" name="neighborhood" placeholder="Mladost 1" value={pet.neighborhood} />
                    <p className={validationForm.neighborhood ? 'valid-inputs' : 'errors'}>The Neighborhood should be at least 3 characters long</p>

                    <label htmlFor="birthYear">Birth Year:</label>
                    <input type="text" id="birthYear" className="add-input" name="birthYear" placeholder="2009" value={pet.birthYear} />
                    <p className={validationForm.birthYear ? 'valid-inputs' : 'errors'}>Year must be min 2000 and max 2022</p>

                    <label htmlFor="species">Species:</label>
                    <input type="text" id="type" className="add-input" name="type" placeholder="Dog" value={pet.type} />
                    <p className={validationForm.type ? 'valid-inputs' : 'errors'}>Species should be "Dog" or "Cat"</p>

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" cols="30" rows="5">{pet.description}</textarea>
                    <p className={validationForm.description ? 'valid-inputs' : 'errors'}>Description must be max 500 characters long</p>

                    <input type="submit" className="add-submit" value="Add" />
                </form>
            </div>
        </section>
    )
} 