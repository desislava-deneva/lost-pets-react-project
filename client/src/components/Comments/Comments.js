import './Comments.css';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PetContexts } from '../../contexts/PetContexts';

import * as api from '../../api/data';
export const Comments = ({
    comments
}) => {
    const { getPet, addComment } = useContext(PetContexts)
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
    const isAuth = sessionStorage.length

    const changeHandler = (e) => {
        setComment(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return (
        <div className="comments" >
            <h2>Comments:</h2>
            <ul>
                {pet?.comments.length > 0 ? pet.comments.map(x => <li>{x}</li>) : <h4>No comments yet...</h4>}
                {isAuth.length > 0 ?
                    <>
                        <label className='label-comments'>Add new comment:</label>

                        <form >
                            <textarea onChange={changeHandler} className="comment-input" name="comment" id="comment" cols="30" rows="10"></textarea>
                        </form>
                    </>
                    : null}

                {isAuth.length > 0 ?
                    <button className='comment-button' onClick={addCommentHandler}>Comment</button>
                    : null}

            </ul>
        </div>
    )
}


