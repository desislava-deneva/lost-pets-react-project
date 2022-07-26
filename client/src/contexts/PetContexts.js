import { createContext, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from '../api/data'

export const PetContexts = createContext();

export const PetProviders = ({
    children
}) => {
    const petReducer = (state, action) => {

        switch (action.type) {
            case 'ADD_PETS':
                return [...action.payload]
            case 'ADD_PET':
                return [...state, action.payload]
            case 'PET_DETAILS':
            case 'EDIT_PET':
                state = state.map(x => x._id === action._id ? { ...x, ...action.payload } : x);
                return [...state]
            case 'ADD_COMMENT':
                const pet = state.find(x => x._id === action._id);
                const actionP = action.payload;
                return state.map(x => x._id === action._id ? { ...x, comments: [...x.comments, actionP] } : x);
            case 'DELETE_PET':
                return state.filter(x => x._id !== action._id);
            default:
                return state;
        }
    }

    const [pets, dispatcher] = useReducer(petReducer, [])
    const [filterPets, setFilterPets] = useState('')
    const navigate = useNavigate();
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

    const getPet = (id) => {
        return pets.find(x => x._id === id);
    }
    const addComment = (_id, comment) => {
        dispatcher({
            type: 'ADD_COMMENT',
            payload: comment,
            _id
        });
    }

    const petDetails = (_id, petDetails) => {
        dispatcher({
            type: 'PET_DETAILS',
            payload: petDetails,
            _id,
        })
    }

    const petEdit = (_id, petData) => {
        dispatcher({
            type: 'EDIT_PET',
            payload: petData,
            _id,
        });
    };

    const delPet = (_id) => {
        dispatcher({
            type: 'DELETE_PET',
            _id
        })

        navigate('/catalog')
    }

    const onSearchHandler = (e) => {
        e.preventDefault()
        const parentEl = e.target.parentElement;
        const searchedText = parentEl.querySelector('input');
        if (parentEl) {
            const test = pets.filter(x => x.name.toLowerCase().includes(searchedText.value.toLowerCase()))
            setFilterPets(test);
        }
        searchedText.value = ''
    }

    const onClear = (e) => {
        e.preventDefault()
        setFilterPets(null)
    }

    return (
        <PetContexts.Provider value={{ pets, addPet, onSelectSort, petEdit, petDetails, delPet, getPet, addComment, onSearchHandler, onClear, filterPets }}>
            {children}
        </PetContexts.Provider>
    )
}