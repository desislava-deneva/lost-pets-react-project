import './Serach.css'
import { useState,  useContext } from 'react';
import { PetContexts } from '../../contexts/PetContexts';

export const Search = () => {
    const [search, setSearch] = useState();
    const { pets } = useContext(PetContexts);

    const onSearchHandler = (e) => {
        const searched = e.target.firstChild()
        console.log(searched.value)
    }

    return (
        <form className='search-form' onSubmit={onSearchHandler}>
            <input type="text" placeholder="Search.."></input>
            <button >Search</button>
        </form>
    )
}