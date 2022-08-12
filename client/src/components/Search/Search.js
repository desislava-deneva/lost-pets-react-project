import './Serach.css'
import { useContext } from 'react'
import { PetContexts } from '../../contexts/PetContexts';

export const Search = () => {
    const { onSearchHandler, onClear } = useContext(PetContexts);
    return (
        <form className='search-form'>
            <input   type="text" name='search' placeholder="Search.."></input>
            <button onClick={(e) => onClear(e)}>clear</button>
            <button onClick={(e) => onSearchHandler(e)}>Search</button>
        </form>
    )
}