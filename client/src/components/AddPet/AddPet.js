import './AddPet.css';
import { createRecord } from '../../api/data';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


export const AddPet = () => {
    // const { validateFormData, classNameIsValid } = useContext(AuthContext);

    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petBirthYear, setBirthYear] = useState('');
    const [petCity, setPetCity] = useState('');
    const [petNeighborhood, setPetNeighborhood] = useState('');
    const [petImg, setPetImg] = useState('');
    const [petLostData, setPetLostData] = useState('');
    const [petDescription, setPetDescription] = useState('');

  const [classNameIsValid, setClassNameIsValid] = useState({ name: '', img: '', lostData: '', city: '', neighborhood: '', type: '', description: '', user: { name: '', username: '', password: '', repass: '' } });


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
            createRecord(data)
            .then(result => {
                console.log(result)
            })

        navigate('/')
        }else{
            alert('Fill correct all fields')
        }
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
            if (e.target.value.length > 500) {
                alert('Description must be <= 500 charecters');
                throw console.error('Description must be <= 500 charecters');
            }
            setPetDescription(e.target.value)
        }
    }

    const validateFormData = (e) => {
        const eventValue = e.target.value;
        const eventName = e.target.name;
        const parentElement = e.target.parentElement;
    
        if (parentElement.className === 'register-form' || parentElement.className === 'my-profaile') {
          if (eventName === 'name') {
            eventValue.length >= 3 ?
              setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, name: true } }) :
              setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, name: false } });
    
          } else if (eventName === 'username') {
            eventValue.length >= 3 ?
              setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, username: true } }) :
              setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, username: false } });
          } else if (eventName === 'password') {
            eventValue.length >= 4 ?
              setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, password: true } }) :
              setClassNameIsValid({ ...classNameIsValid, user: { ...classNameIsValid.user, password: false } });
          }
    
        } else {
          if (eventName === "name") {
            eventValue.length < 2 ?
              setClassNameIsValid({ ...classNameIsValid, name: false }) :
              setClassNameIsValid({ ...classNameIsValid, name: true });
          } else if (eventName === "img") {
            const URL_PATTERN = /^https?:\/\/(.+)/;
            URL_PATTERN.test(eventValue) ?
              setClassNameIsValid({ ...classNameIsValid, img: true })
              : setClassNameIsValid({ ...classNameIsValid, img: false });
          } else if (eventName === "lostData") {
            const LOST_DATA_PATTERN = /^[\d]{2}.[\d]{2}.[\d]{4}$/;
            LOST_DATA_PATTERN.test(eventValue) ?
              setClassNameIsValid({ ...classNameIsValid, lostData: true })
              : setClassNameIsValid({ ...classNameIsValid, lostData: false })
          } else if (eventName === "city") {
            eventValue.length < 3 ?
              setClassNameIsValid({ ...classNameIsValid, city: false }) :
              setClassNameIsValid({ ...classNameIsValid, city: true });
          } else if (eventName === "neighborhood") {
            eventValue.length < 3 ?
              setClassNameIsValid({ ...classNameIsValid, neighborhood: false }) :
              setClassNameIsValid({ ...classNameIsValid, neighborhood: true });
          } else if (eventName === "birthYear") {
            Number(eventValue) < 2000 || Number(eventValue) > 2022 ?
              setClassNameIsValid({ ...classNameIsValid, birthYear: false }) :
              setClassNameIsValid({ ...classNameIsValid, birthYear: true })
          } else if (eventName === "type") {
            eventValue === 'Dog' || eventValue === 'Cat' ?
              setClassNameIsValid({ ...classNameIsValid, type: true }) :
              setClassNameIsValid({ ...classNameIsValid, type: false })
          } else if (eventName === "description") {
            eventValue.length > 500 ?
              setClassNameIsValid({ ...classNameIsValid, description: false }) :
              setClassNameIsValid({ ...classNameIsValid, description: true })
          }
        }
    
      }

    return (
        <section className="add">
            <div className='pet-form' onBlur={(e) => validateFormData(e)}>
                <h2 className="add-title">Add form</h2>
                <form className="add-form" onSubmit={onSubmitHandler} onChange={onChangeHandler}>
                    <label htmlFor="pet-name">Pet name:</label>
                    <input type="text" name="name" className="add-input" id="name" placeholder="Bruno" value={petName} />
                    <p className={classNameIsValid.name ? 'valid-inputs' : 'errors'}>The Name should be at least 2 characters</p>

                    <label htmlFor="img">Image url:</label>
                    <input type="text" name="img" className="add-input" id="img" placeholder="http:// or https://" value={petImg} />
                    <p className={classNameIsValid.img ? 'valid-inputs' : 'errors'}>Image must be a valid URL</p>

                    <label htmlFor="lostData">Data of lost:</label>
                    <input type="text" id="lostData" className="add-input" name="lostData" placeholder="19.06.2022" value={petLostData} />
                    <p className={classNameIsValid.lostData ? 'valid-inputs' : 'errors'}>The Date should be at 10 characters long</p>

                    <label htmlFor="lost-in-sity">Lost in sity:</label>
                    <input type="text" id="city" className="add-input" name="city" placeholder="Sofia" value={petCity} />
                    <p className={classNameIsValid.city ? 'valid-inputs' : 'errors'}>The City should be at min 3 characters long</p>

                    <label htmlFor="neighborhood">Lost in neighborhood:</label>
                    <input type="text" id="neighborhood" className="add-input" name="neighborhood" placeholder="Mladost 1" value={petNeighborhood} />
                    <p className={classNameIsValid.neighborhood ? 'valid-inputs' : 'errors'}>The Neighborhood should be at least 3 characters long</p>

                    <label htmlFor="birthYear">Birth Year:</label>
                    <input type="text" id="birthYear" className="add-input" name="birthYear" placeholder="2009" value={petBirthYear} />
                    <p className={classNameIsValid.birthYear ? 'valid-inputs' : 'errors'}>Year must be min 2000 and max 2022</p>

                    <label htmlFor="species">Species:</label>
                    <input type="text" id="type" className="add-input" name="type" placeholder="Dog" value={petType} />
                    <p className={classNameIsValid.type ? 'valid-inputs' : 'errors'}>Species should be "Dog" or "Cat"</p>

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" cols="30" rows="5">{petDescription}</textarea>
                    <p className={classNameIsValid.description ? 'valid-inputs' : 'errors'}>Description must be max 500 characters long</p>

                    <input type="submit" className="add-submit" value="Add" />
                </form>
            </div>
        </section>
    )
} 