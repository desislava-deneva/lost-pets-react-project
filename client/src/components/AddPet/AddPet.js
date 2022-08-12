import './AddPet.css';
import { createRecord } from '../../api/data';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContexts } from '../../contexts/PetContexts';
import { ValidationContexts } from '../../contexts/validationContext';

export const AddPet = () => {
    const { addPet } = useContext(PetContexts);
    const { validateFormData, validationForm } = useContext(ValidationContexts);

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const petData = Object.fromEntries(new FormData(e.target));
        if (Object.values(validationForm).some(x => x === false)) {
            alert('Fill correct all fields')
        } else {
            createRecord(petData)
                .then(result => {
                    addPet(result)
                })
            navigate('/catalog')
        }
    }

    return (
        <section className="add">
            <div className='pet-form' onBlur={(e) => validateFormData(e)}>
                <h2 className="add-title">Add form</h2>
                <form className="add-form" onSubmit={onSubmitHandler} >
                    <label htmlFor="pet-name">Pet name:</label>
                    <input type="text" name="name" className="add-input" id="name" placeholder="Bruno"/>
                    <p className={validationForm.name ? 'valid-inputs' : 'errors'}>The Name should be at least 2 characters</p>

                    <label htmlFor="img">Image url:</label>
                    <input type="text" name="img" className="add-input" id="img" placeholder="http:// or https://"/>
                    <p className={validationForm.img ? 'valid-inputs' : 'errors'}>Image must be a valid URL</p>

                    <label htmlFor="dataLost">Date of lost:</label>
                    <input type="text" id="dataLost" className="add-input" name="dataLost" placeholder="19.06.2022"  />
                    <p className={validationForm.dataLost ? 'valid-inputs' : 'errors'}>The Date should be at 10 characters long</p>

                    <label htmlFor="lost-in-sity">Lost in sity:</label>
                    <input type="text" id="city" className="add-input" name="city" placeholder="Sofia" />
                    <p className={validationForm.city ? 'valid-inputs' : 'errors'}>The City should be at min 3 characters long</p>

                    <label htmlFor="neighborhood">Lost in neighborhood:</label>
                    <input type="text" id="neighborhood" className="add-input" name="neighborhood" placeholder="Mladost 1" />
                    <p className={validationForm.neighborhood ? 'valid-inputs' : 'errors'}>The Neighborhood should be at least 3 characters long</p>

                    <label htmlFor="birthYear">Birth Year:</label>
                    <input type="number" id="birthYear" className="add-input" name="birthYear" placeholder="2009"  />
                    <p className={validationForm.birthYear ? 'valid-inputs' : 'errors'}>Year must be min 2000 and max 2022</p>

                    <label htmlFor="species">Species:</label>
                    <input type="text" id="type" className="add-input" name="type" placeholder="Dog" />
                    <p className={validationForm.type ? 'valid-inputs' : 'errors'}>Species should be "Dog" or "Cat"</p>

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" cols="30" rows="5"></textarea>
                    <p className={validationForm.description ? 'valid-inputs' : 'errors'}>Description must be max 500 characters long</p>

                    <input type="submit" className="add-submit" value="Add" />
                </form>
            </div>
        </section>
    )
} 