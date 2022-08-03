import React, { useEffect, useState } from "react";
import * as api from '../../api/data';
import './Likes.css'
import likeHand from './likeHand.jpeg';
import unlikeHand from './unlikeHand.jpeg';

export const Likes = (props) => {
  const [countLikes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const userId = sessionStorage.userId;

  useEffect(()=>{
    api.getLikesById(props.petsId)
    .then(data=>{
      setLikes(data.likes.length);
      if(data.likes.includes(userId)){
        setIsLiked(true)
      }
    })
  }, [])

  const onClickLikeHandler = () => {
    if (isLiked) {
      api.postUnLikesById(props.petsId)
      .then((data) => {
        setLikes(data.likes.length)
      })
      .catch((err) => {
        console.error(err.message);
      });
    } else{
      api.postLikeById(props.petsId)
      .then((data) => {
        setLikes(data.likes.length)
      })
      .catch((err) => {
        console.error(err.message);
      });
    }
    setIsLiked(!isLiked)
  }
  
  return (
    <button onClick={() => {onClickLikeHandler()}}>
        <div className="like-button">
            <img src={isLiked ? likeHand : unlikeHand} alt="png" className="like-img" />
            <span>{countLikes} </span>
        </div>
    </button>
  );
};