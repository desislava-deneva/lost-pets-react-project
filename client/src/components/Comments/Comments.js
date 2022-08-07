import './Comments.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import CommentsBlock from 'simple-react-comments';

export const Comments = () => {
    const [comment, setComment] = useState('');
    const { setButtonComment, setButtonCommentHandler, buttonComment } = useContext(AuthContext);

    const onSubmitHandler = (e) => {
        const divElement = e.target.parentElement;
        const textareaElement = divElement.querySelector('textarea');
        setComment(textareaElement.value);
        setButtonComment(true)
        setComment('')
    }
    return (
        <div className="comments">
            <h2>Comments:</h2>
            <ul>
                <li>Comment 1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply </li>
                <li>Comment 2</li>
                <li>Comment 3</li>
                <li>Comment 4</li>
                {comment && buttonComment ? <li>{comment}</li> : ''}
                <textarea className="comment-input" name="comment" id="comment" cols="30" rows="10"></textarea>
            </ul>

            <button className='comment-button' onClick={onSubmitHandler}>Comment</button>

        </div>
    )
}