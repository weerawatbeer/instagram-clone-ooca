import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import ProfileHeader from "../components/ProfileHeader";
import Placeholder from "../components/Placeholder";
import Loader from "../components/Loader";
import { PostIcon, SavedIcon } from "../components/Icons";
import { db } from "../firebase";

const Wrapper = styled.div`
  .profile-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.4rem 0;
  }

  .profile-tab div {
    display: flex;
    cursor: pointer;
    margin-right: 3rem;
  }

  .profile-tab span {
    padding-left: 0.3rem;
  }

  .profile-tab svg {
    height: 24px;
    width: 24px;
  }

  hr {
    border: 0.5px solid ${(props) => props.theme.borderColor};
  }
`;

const Profile = () => {
  const [tab, setTab] = useState("POSTS");
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [deadend, setDeadend] = useState(false);
  const [countPosts, setCountPosts] = useState();
  const [posts, setPosts] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    db.collection("users")
      .where("username", "==", username)
      .onSnapshot((snapshot) => {
        snapshot.forEach(function (docs) {
          setProfile({
            doc_id: docs.id,
            userdata: docs.data(),
          });
        });
      });
    db.collection("posts")
      .where("username", "==", username)
      .onSnapshot((snapshot) => {
        setCountPosts(snapshot.docs.length);
        setPosts(
          snapshot.docs.map((doc) => ({
            _id: doc.id,
            imageUrl: doc.data().imageUrl,
            likesCount: 10,
            commentsCount: 20,
          }))
        );
      });
  }, [username]);

  if (!deadend && loading) {
    return <Loader />;
  }
  console.log(posts);
  if (deadend) {
    return (
      <Placeholder
        title="Sorry, this page isn't available"
        text="The link you followed may be broken, or the page may have been removed"
      />
    );
  }

  return (
    <Wrapper>
      <ProfileHeader profile={profile.userdata} countPosts={countPosts} />
      <hr />

      <div className="profile-tab">
        <div
          style={{ fontWeight: tab === "POSTS" ? "500" : "" }}
          onClick={() => setTab("POSTS")}
        >
          <PostIcon />
          <span>POSTS</span>
        </div>
        <div
          style={{ fontWeight: tab === "SAVED" ? "500" : "" }}
          onClick={() => setTab("SAVED")}
        >
          <SavedIcon />
          <span>Saved</span>
        </div>
      </div>

      {tab === "POSTS" && (
        <>
          {posts === "" ? (
            <Placeholder
              title="Posts"
              text="Once you start making new posts, they'll appear here"
              icon="post"
            />
          ) : (
            <PostPreview posts={posts} />
          )}
        </>
      )}

      {tab === "SAVED" && (
        <>
          {profile?.savedPosts?.length === 0 ? (
            <Placeholder
              title="Saved"
              text="Save photos and videos that you want to see again"
              icon="bookmark"
            />
          ) : (
            <PostPreview posts={profile?.savedPosts} />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
