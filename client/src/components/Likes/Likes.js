import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import { useParams } from "react-router-dom";
import * as api from '../../api/data';

import './Likes.css'

export const LikeButton = ({
  isOwner
}) => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const params = useParams();
  const id = params.id;
  const userId = sessionStorage.userId;

  useEffect(()=>{
    api.getLikesById(id)
    .then(data=>{
      console.log(data)
      setLikes(data.likes.length);
      if(data.likes.includes(userId)){
        setIsLiked(true)
      }
    })
  })


  const likeHandler = (isCliked) => {
    if (isCliked && isLiked ) {
    
      api.postUnLikesById(id)
      .then((data) => {
        setLikes(data.likes.length)
      })
      
    } else{
      api.postLikeById(id)
      .then((data) => {
        setLikes(data.likes.length)

      })
      
      .catch((err) => {
        console.error(err.message);
      });
    }

    setClicked(!clicked);
  }

  const ownerPaharagraph = <p>{likes} Likes</p>
  
  return (
    <button
      onClick={() => {
        setLiked(!liked);
        setClicked(true);
        likeHandler(clicked)
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
        clicked,
      })}
    >
      <div className="like-button">
        <Hand />
        <span>{likes} </span>
        <span>Like</span>
        <span className={cn("suffix", { liked })}>d</span>
      </div>
    </button>
  );
};
