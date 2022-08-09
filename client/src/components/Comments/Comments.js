import './Comments.css';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PetContexts } from '../../contexts/PetContexts';

import * as api from '../../api/data';
export const Comments = ({
    comments
}) => {
    const { getPet, addComment } = useContext(PetContexts)
    console.log(comments.comments)

    const [comment, setComment] = useState('');

    const params = useParams();
    const id = params.id;

    const pet = getPet(id);

    const addCommentHandler = async (e) => {
        await api.postCommentById(comments.pet._id, comment);
        addComment(comments.pet._id, comment);

        const parent = e.target.parentElement;
        const textareaEl = parent.querySelector('textarea');
        textareaEl.value = '';
    }

    const changeHandler = (e) => {
        setComment(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return (
        <div className="comments" >
            <h2>Comments:</h2>
            <ul>
                {pet.comments ? pet.comments.map(x => <li>{x}</li>) : ''}
                <label className='label-comments'>Add new comment:</label>
                <form >
                    <textarea onChange={changeHandler} className="comment-input" name="comment" id="comment" cols="30" rows="10"></textarea>
                </form>
                <button className='comment-button' onClick={addCommentHandler}>Comment</button>
            </ul>
        </div>
    )
}


