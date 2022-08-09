import './EditPage.css'
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../../api/data'
import { ValidationContexts } from '../../contexts/validationContext';

export const EditPage = () => {
    const { validateFormData, validationForm } = useContext(ValidationContexts);
    const [pet, setPet] = useState({});
    
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        api.getPetById(id)
            .then(result => {
                setPet(result)
            })
    }, [])
   
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const petData = Object.fromEntries(new FormData(e.target));

        if (Object.values(validationForm).some(x => x === false)) {
            alert('Fill correct all fields')
        } else {
            await api.editRecord(id, petData);
            navigate('/details/' + id)
        }
    }

    return (
        <section className="add" onBlur={(e) => validateFormData(e)} >
            <div className='pet-form' onSubmit={onSubmitHandler}>
                <h2 className="add-title">Edit form</h2>
                <form className="add-form">
                    <label htmlFor="pet-name">Pet name:</label>
                    <input type="text" name="name" className="add-input" id="name" placeholder="Bruno" defaultValue={pet.name} />
                    <p className={validationForm.name ? 'valid-inputs' : 'errors'}>The Name should be at least 2 characters</p>

                    <label htmlFor="img">Image url:</label>
                    <input type="text" name="img" className="add-input" id="img" placeholder="http:// or https://" defaultValue={pet.img} />
                    <p className={validationForm.img ? 'valid-inputs' : 'errors'}>Image must be a valid URL</p>

                    <label htmlFor="dataLost">Data of lost:</label>
                    <input type="text" id="dataLost" className="add-input" name="dataLost" placeholder="19.06.2022" defaultValue={pet.dataLost} />
                    <p className={validationForm.dataLost ? 'valid-inputs' : 'errors'}>The Date should be at 10 characters long</p>

                    <label htmlFor="lost-in-sity">Lost in city:</label>
                    <input type="text" id="city" className="add-input" name="city" placeholder="Sofia" defaultValue={pet.city} />
                    <p className={validationForm.city ? 'valid-inputs' : 'errors'}>The City should be at min 3 characters long</p>

                    <label htmlFor="neighborhood">Lost in neighborhood:</label>
                    <input type="text" id="neighborhood" className="add-input" name="neighborhood" placeholder="Mladost 1" defaultValue={pet.neighborhood} />
                    <p className={validationForm.neighborhood ? 'valid-inputs' : 'errors'}>The Neighborhood should be at least 3 characters long</p>

                    <label htmlFor="birthYear">Birth Year:</label>
                    <input type="text" id="birthYear" className="add-input" name="birthYear" placeholder="2009" defaultValue={pet.birthYear} />
                    <p className={validationForm.birthYear ? 'valid-inputs' : 'errors'}>Year must be min 2000 and max 2022</p>

                    <label htmlFor="species">Species:</label>
                    <input type="text" id="type" className="add-input" name="type" placeholder="Dog" defaultValue={pet.type} />
                    <p className={validationForm.type ? 'valid-inputs' : 'errors'}>Species should be "Dog" or "Cat"</p>

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" cols="30" rows="5" defaultValue={pet.description}></textarea>
                    <p className={validationForm.description ? 'valid-inputs' : 'errors'}>Description must be max 500 characters long</p>

                    <input type="submit" className="add-submit" value="Edit" />
                </form>
            </div>
        </section>
    )
}