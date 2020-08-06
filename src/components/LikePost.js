import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { HeartIcon, FilledHeartIcon } from "./Icons";

const LikePost = ({ isLiked, postId, user }) => {
  const [likedState, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked.status);
  }, [isLiked]);

  const handleToggleLike = () => {
    if (likedState) {
      setLiked(false);
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(isLiked.id)
        .delete();
    } else {
      setLiked(true);
      db.collection("posts").doc(postId).collection("likes").add({
        username: user.userData.username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  if (likedState) {
    return <FilledHeartIcon onClick={handleToggleLike} />;
  }

  if (!likedState) {
    return <HeartIcon onClick={handleToggleLike} />;
  }
};

export default LikePost;
