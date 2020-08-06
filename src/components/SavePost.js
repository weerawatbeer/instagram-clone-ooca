import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { BookmarkIcon, FilledBookmarkIcon } from "./Icons";

const SavePost = ({ isSaved, postId, user }) => {
  const [savedState, setSaved] = useState(isSaved);
  useEffect(() => {
    setSaved(isSaved.status);
  }, [isSaved]);

  const handleToggleSave = () => {
    if (savedState) {
      setSaved(false);
      db.collection("users")
        .doc(user.userDocId)
        .collection("savedposts")
        .doc(isSaved.id)
        .delete();
    } else {
      setSaved(true);
      db.collection("users").doc(user.userDocId).collection("savedposts").add({
        postId: postId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  if (savedState) {
    return <FilledBookmarkIcon onClick={handleToggleSave} />;
  }

  if (!savedState) {
    return <BookmarkIcon onClick={handleToggleSave} />;
  }
};

export default SavePost;
