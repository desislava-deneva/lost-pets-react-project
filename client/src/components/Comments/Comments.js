import './Comments.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../../api/data';

export const Comments = (props) => {
    const [pet, setPet] = useState('');
    const [comment, setComment] = useState('');
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        api.getPetById(id)
            .then(result => {
                setPet(result)
            })
    }, []);

    const addCommentHandler = async (e) => {
       await api.postCommentById(pet._id, comment);
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


