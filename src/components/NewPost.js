import React, { useContext, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Modal from "./Modal";
import useInput from "../hooks/useInput";
import { FeedContext } from "../context/FeedContext";
import { UserContext } from "../context/UserContext";
import { NewPostIcon } from "./Icons";
import firebase from "firebase";
import { db, storage } from "../firebase";

const NewPostWrapper = styled.div`
  .newpost-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }

  .newpost-header h3:first-child {
    color: ${(props) => props.theme.red};
  }

  h3 {
    cursor: pointer;
  }

  .newpost-header h3:last-child {
    color: ${(props) => props.theme.blue};
  }

  textarea {
    height: 100%;
    width: 100%;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    resize: none;
  }

  .modal-content {
    width: 700px;
  }

  @media screen and (max-width: 780px) {
    .modal-content {
      width: 90vw;
    }
  }
`;

const NewPost = () => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [postImage, setPostImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleUploadImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setShowModal(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmitPost = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts").add({
              avatar: user.userData.avatar,
              caption: caption,
              imageUrl: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              userId: user.userData.userId,
              username: user.userData.username,
            });

            toast.success("Your post has been submitted successfully");
            setCaption("");
            setImage(null);
            setShowModal(false);
          });
      }
    );
  };

  return (
    <NewPostWrapper>
      <label htmlFor="upload-post">
        <NewPostIcon />
      </label>
      <input
        id="upload-post"
        type="file"
        onChange={handleUploadImage}
        style={{ display: "none" }}
      />
      {showModal && (
        <Modal>
          <div className="modal-content">
            <div className="newpost-header">
              <h3 onClick={() => setShowModal(false)}>Cancel</h3>
              <h3 onClick={handleSubmitPost}>Share</h3>
            </div>
            {preview && (
              <img className="post-preview" src={preview} alt="preview" />
            )}
            <div>
              <textarea
                placeholder="Add caption"
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </NewPostWrapper>
  );
};

export default NewPost;
