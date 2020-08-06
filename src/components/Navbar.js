import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { Button } from "@material-ui/core";

const Navbar = ({ signInBtn, signOutBtn }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="app__header">
      <img
        className="app__headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
      />

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app_loginContainer">
          <Button onClick={signInBtn}>Sign In</Button>
          <Button onClick={signOutBtn}>Sign Up</Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
