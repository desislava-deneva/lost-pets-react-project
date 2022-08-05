import './EditPage.css'
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as api from '../../api/data'


export const EditPage = (props) => {
    const { validateFormData, classNameIsValid } = useContext(AuthContext);

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
        }
        else if (e.target.name === "img") {
            setPet({ ...pet, img: e.target.value })
        } else if (e.target.name === "lostData") {
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

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (
            classNameIsValid.name &&
            classNameIsValid.img &&
            classNameIsValid.lostData &&
            classNameIsValid.city &&
            classNameIsValid.neighborhood &&
            classNameIsValid.birthYear &&
            classNameIsValid.type &&
            classNameIsValid.description
        ) {
            await api.editRecord(id, pet);
            navigate('/details/' + id)
        } else {
            alert('Fill correct all fields')
        }



    }
    return (
        <section className="add" onBlur={(e) => validateFormData(e)}>
            <div className='pet-form' onSubmit={onSubmitHandler}>
                <h2 className="add-title">Edit form</h2>
                <form className="add-form" onChange={onChangeHandler}>
                    <label htmlFor="pet-name">Pet name:</label>
                    <input type="text" name="name" className="add-input" id="name" placeholder="Bruno" value={pet.name} />
                    <p className={classNameIsValid.name ? 'valid-inputs' : 'errors'}>The Name should be at least 2 characters</p>

                    <label htmlFor="img">Image url:</label>
                    <input type="text" name="img" className="add-input" id="img" placeholder="http:// or https://" value={pet.img} />
                    <p className={classNameIsValid.img ? 'valid-inputs' : 'errors'}>Image must be a valid URL</p>

                    <label htmlFor="lostData">Data of lost:</label>
                    <input type="text" id="lostData" className="add-input" name="lostData" placeholder="19.06.2022" value={pet.dataLost} />
                    <p className={classNameIsValid.lostData ? 'valid-inputs' : 'errors'}>The Date should be at 10 characters long</p>

                    <label htmlFor="lost-in-sity">Lost in city:</label>
                    <input type="text" id="city" className="add-input" name="city" placeholder="Sofia" value={pet.city} />
                    <p className={classNameIsValid.city ? 'valid-inputs' : 'errors'}>The City should be at min 3 characters long</p>

                    <label htmlFor="neighborhood">Lost in neighborhood:</label>
                    <input type="text" id="neighborhood" className="add-input" name="neighborhood" placeholder="Mladost 1" value={pet.neighborhood} />
                    <p className={classNameIsValid.neighborhood ? 'valid-inputs' : 'errors'}>The Neighborhood should be at least 3 characters long</p>

                    <label htmlFor="birthYear">Birth Year:</label>
                    <input type="text" id="birthYear" className="add-input" name="birthYear" placeholder="2009" value={pet.birthYear} />
                    <p className={classNameIsValid.birthYear ? 'valid-inputs' : 'errors'}>Year must be min 2000 and max 2022</p>

                    <label htmlFor="species">Species:</label>
                    <input type="text" id="type" className="add-input" name="type" placeholder="Dog" value={pet.type} />
                    <p className={classNameIsValid.type ? 'valid-inputs' : 'errors'}>Species should be "Dog" or "Cat"</p>

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" cols="30" rows="5" value={pet.description}></textarea>
                    <p className={classNameIsValid.description ? 'valid-inputs' : 'errors'}>Description must be max 500 characters long</p>

                    <input type="submit" className="add-submit" value="Edit" />
                </form>
            </div>

        </section>
    )
}