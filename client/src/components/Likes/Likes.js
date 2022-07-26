import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import { useParams } from "react-router-dom";
import * as api from '../../api/data';
import { getUserId } from "../../api/authServices";

import './Likes.css'





export const LikeButton = () => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [likes, setLikes] = useState(0);

  const params = useParams();
  const id = params.id;

  const likeHandler = (isCliked) => {
   
    if (isCliked) {
      setLikes(oldLikes => oldLikes - 1);
      api.postUnLikesById(id)
      .then((data) => {
        setLikes(data.likes)
      })
      
    } else {
      setLikes(oldLikes => oldLikes + 1);
      api.postLikeById(id)
      .then((data) => {
        setLikes(data.likes)
      })
      
      .catch((err) => {
        console.error(err.message);
      });
    }

    setClicked(!clicked);
  }



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
