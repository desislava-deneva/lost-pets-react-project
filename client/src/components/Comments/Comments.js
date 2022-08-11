import './Comments.css';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PetContexts } from '../../contexts/PetContexts';
import { Link } from 'react-router-dom';


import * as api from '../../api/data';
import { AuthContext } from '../../contexts/AuthContext';
import image from './profaile.jpg'
export const Comments = ({
    comments
}) => {
    const { getPet, addComment } = useContext(PetContexts)
    const { user } = useContext(AuthContext);

    const [comment, setComment] = useState('');

    const params = useParams();
    const id = params.id;

    const addCommentHandler = async (e) => {
        await api.postCommentById(comments.pet._id, comment);
        addComment(comments.pet._id, { userImg: user.img, username: user.username, comment: comment.comment });

        const parent = e.target.parentElement;
        const textareaEl = parent.querySelector('textarea');
        textareaEl.value = '';
    }
    const isAuth = user.username ? true : false;

    const changeHandler = (e) => {
        setComment(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const pet = getPet(id);
    return (
        <div className="comments" >
            <h2>Comments:</h2>
            <ul>
                {pet?.comments.length > 0 ? pet.comments.map(x => <><li><img src={x.userImg ? x.userImg : image} alt="img" /><strong> {x.username} commented:</strong> {'\n'}{x.comment}</li></>) : <h4>No comments yet...</h4>}
                {isAuth ?
                    <>
                        <label className='label-comments'>Add new comment:</label>

                        <form >
                            <textarea onChange={changeHandler} className="comment-input" name="comment" id="comment" cols="30" rows="10"></textarea>
                        </form>
                    </>
                    : null}

                {isAuth ?
                    <button className='comment-button' onClick={addCommentHandler}>Comment</button>
                    : <h3>If you want to comment this publication, pleace <Link to="/login" className="button" >login</Link></h3>
                }

            </ul>
        </div >
    )
}


