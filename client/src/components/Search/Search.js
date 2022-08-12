import './Serach.css'
import { useState, useContext } from 'react';
import { PetContexts } from '../../contexts/PetContexts';

export const Search = () => {
    const [search, setSearch] = useState();
    const { pets } = useContext(PetContexts);

    const onSearchHandler = (e) => {
        e.preventDefault()
        const searched = e.target.firstChild
        setSearch(searched.value)
        console.log(search);
    }

    const onChangeText = (e) => {
        const searched = e.target
        setSearch(searched.value)
        console.log(search);
    }

    return (
        <form className='search-form' onSubmit={onSearchHandler} >
            <input onChange={onChangeText} type="text" name='search' placeholder="Search.."></input>
            <button >Search</button>
        </form>
    )
}