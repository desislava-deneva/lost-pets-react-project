import './Catalog.css'
import { Pet } from '../Pet/Pet'
import { useContext } from 'react';
import { PetContexts } from '../../contexts/PetContexts';
import { Search } from '../Search/Search'

export const Catalog = () => {
    const { pets, onSelectSort, filterPets } = useContext(PetContexts);

    return (
        <div className="calalog" >
            <div className="dropdown" >
                <select className="dropbtn" name="sort" onChange={onSelectSort} >
                    <option value="Sort by">Sort by</option>
                    <option value="name">Name</option>
                    <option value="city">City</option>
                </select>
                <Search />
            </div>
            <div className='list'>
                {
                    filterPets ?
                        <div>
                            <h3 className='search-list'>Search list</h3>
                            {
                                filterPets ?
                                    filterPets.map(pet => <Pet key={pet._id} pet={pet} />)
                                    :
                                    <h4>No mach pets</h4>
                            }
                        </div> :

                        pets ? pets.map(pet => <Pet key={pet._id} pet={pet} />)
                            :
                            <h1>No pets in database</h1>
                }
            </div>
        </div>
    )
}
