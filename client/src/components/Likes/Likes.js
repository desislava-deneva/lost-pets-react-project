import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import './Likes.css'

export const LikeButton = () => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);
    const [likes, setLikes] = useState(0);

    const likeHandler = (isCliked)=>{
        if (isCliked) {
            setLikes(oldLikes=> oldLikes-1);
        }else{
            setLikes(oldLikes=> oldLikes+1);

        }
               
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
