import { useState } from 'react';
import './Likes.css'

export const LikeButton = () => {
    const [likes, setLikes] = useState(0);
    
    const likeHandler = (e)=>{
       setLikes(oldLikes=> oldLikes+1);
    }


    return (
        
                <button className='likes' onClick={likeHandler}>
                     <span>Like {likes}</span>
                </button>
       
        
    )
}