import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Suggestions from "../components/Suggestions";
import NoFeedSuggestions from "../components/NoFeedSuggestions";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { FeedContext } from "../context/FeedContext";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase";

const Wrapper = styled.div`
  @media screen and (max-width: 1040px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { feed, setFeed } = useContext(FeedContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setFeed(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          caption: doc.data().caption,
          user: {
            avatar: doc.data().avatar,
            username: doc.data().username,
          },
          files: [
            {
              url: doc.data().imageUrl,
            },
          ],
          isLiked:
            doc.data().username === user.userData.username ? true : false,
          isMine: doc.data().username === user.userData.username ? true : false,
          isSaved: doc.data().isSaved,
          timestamp: doc.data().timestamp,
        }))
      );
    });
  }, []);

  useEffect(() => {
    const logout = () => {
      setUser(null);
    };

    setLoading(false);
  }, [setFeed, setUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {feed.length > 0 ? (
        <>
          <div className="home">
            {feed.map((post) => (
              <Post key={post._id} post={post} user={user} />
            ))}
          </div>
          <Suggestions />{" "}
        </>
      ) : (
        <NoFeedSuggestions />
      )}
    </Wrapper>
  );
};

export default Home;
