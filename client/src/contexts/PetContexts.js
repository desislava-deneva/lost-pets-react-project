import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from '../api/data'

export const PetContexts = createContext();

export const PetProviders = ({
    children
}) => {
    const navigate = useNavigate();

    const petReducer = (state, action) => {

        switch (action.type) {
            case 'ADD_PETS':
                return [...action.payload]
            case 'ADD_PET':
                return [...state, action.payload]
            default:
                return state;
        }
    }
    const [pets, dispatcher] = useReducer(petReducer, [])

    useEffect(() => {
        api.getPets()
            .then(result => {
                const action = {
                    type: 'ADD_PETS',
                    payload: result
                }
                dispatcher(action)
            })
    }, []);

    const addPet = (dataPet) => {
        dispatcher({
            type: 'ADD_PET',
            payload: dataPet
        })

        navigate('/catalog')
    }

    const onSelectSort = (e) => {
        const dropValue = e.target.value;
        if (dropValue === 'name') {
            dispatcher({
                type: 'ADD_PETS',
                payload: (Object.values(pets).sort((a, b) => a.name.localeCompare(b.name)))
            })
        } else if (dropValue === 'city') {
            dispatcher({
                type: 'ADD_PETS',
                payload: (Object.values(pets).sort((a, b) => a.city.localeCompare(b.city)))
            })
        }
    }

    return (
        <PetContexts.Provider value={{ pets, addPet, onSelectSort }}>
            {children}
        </PetContexts.Provider>

    )
}