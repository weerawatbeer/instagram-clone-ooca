import React, { useState, useEffect, useContext, Fragment } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import logo from "../assets/logo.png";
import phoneImage01 from "../assets/phone-image-01.jpg";
import appstoreLogo from "../assets/appstore.png";
import googleplayLogo from "../assets/googleplay.png";
import facebookLogo from "../assets/facebook.png";
import { db, auth } from "../firebase";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.white};
  padding: 1rem;
  width: 350px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 6rem auto;
  text-align: center;
  padding: 2rem 0;

  img {
    margin-bottom: 1.5rem;
  }

  input {
    display: block;
    margin: 0 auto;
    margin-bottom: 0.4rem;
    padding: 0.5rem 1.2rem;
    background: #fafafa;
    border: 1px solid ${(props) => props.theme.borderColor};
    font-family: "Fira Sans", sans-serif;
    font-size: 0.75rem;
    border-radius: 3px;
    width: 80%;
    height: 38px;
  }

  input[type="submit"] {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.blue};
    cursor: pointer;
    font-size: 14px;
    height: 30px;
  }

  button {
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.blue};
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    height: 30px;
    border-radius: 4px;
    width: 80%;
  }

  .has-separator {
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
    font-size: 13px;
    font-weight: 600;
    color: #999999;
    position: relative;
  }

  .has-separator::before,
  .has-separator::after {
    content: "";
    position: absolute;
    background-color: ${(props) => props.theme.borderColor};
    width: 30%;
    height: 0.5px;
    top: 50%;
    transform: translateY(-50%);
  }

  .has-separator::before {
    left: 34px;
  }

  .has-separator::after {
    right: 34px;
  }

  p {
    margin-top: 2rem;
  }

  span {
    color: ${(props) => props.theme.blue};
    cursor: pointer;
  }
`;

export const FormWrapperLogin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #fafafa;
  padding: 1rem;
  max-width: 935px;
  width: 100%;
  height: 100%;
  margin: 1.5rem auto;
  margin-top: 5rem;
  margin-bottom: 10rem;
  text-align: center;
`;

export const Phone = styled.div`
  background-image: url("https://www.instagram.com/static/images/homepage/home-phones@2x.png/9364675fb26a.png");
  background-position: 0 0;
  background-size: 454px 618px;
  flex-basis: 454px;
  height: 618px;
  margin-left: -35px;
  margin-right: -15px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const PhoneImage = styled.div`
  margin: 100px 0 0 87px;
  position: relative;
`;

export const Logo = styled.div`
  img {
    display: block;
    margin: 0 auto 35px;
    margin-bottom: 1.5rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  background: #fafafa;
  border: 1px solid #efefef;
  font-size: 12px;
  border-radius: 3px;
  color: #262626;
  padding: 10px;
  margin-bottom: 5px;

  :focus {
    border: 1px solid #b2b2b2;
  }
`;

export const Button = styled.button`
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.blue};
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  height: 30px;
  border-radius: 4px;
  width: 100%;
`;

export const Footer = styled.div`
  color: #003569;
  font-size: 0.75rem;
  max-width: 1012px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  ul li {
    display: inline-block;
    margin-right: 10px;
  }
`;

export const CopyRight = styled.div`
  color: #999;
`;

export const AppGroup = styled.div`
  text-align: center;
  color: #262626;

  p {
    margin-bottom: 20px;
  }

  a img {
    width: 135px;
    height: 40px;
    margin: 0 5px;
  }
`;

export const SignUp = styled.div`
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  padding: 10px 0px;
  margin: 10px 0 20px;
  text-align: center;
  color: #262626;

  a {
    color: #3897f0;
  }

  p {
    margin: 0.75rem;
    font-size: 14px;
  }
`;

export const Forgot = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
  a {
    color: #003569;
  }
`;

export const Below = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
  }

  p {
    color: #385185;
    font-weight: 500;
    margin-left: 10px;
  }
`;

export const Or = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15px;
  margin: 15px 0 20px;
  p {
    color: #999;
    font-size: 12px;
  }
`;

export const Line = styled.div`
  width: 105px;
  height: 2px;
  background: #efefef;
`;

export const Container = styled.div`
  max-width: 350px;
  width: 100%;
  margin: 1rem 0;
`;

export const Top = styled.div`
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  padding: 40px 40px 20px;
`;

const Login = ({ signup }) => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("auth logged", authUser);
        //user has logged in...
        if (authUser.uid) {
          console.log("auth logged uid", authUser.uid);
          db.collection("users")
            .where("userId", "==", authUser.uid)
            .get()
            .then(function (snapshot) {
              snapshot.forEach(function (docs) {
                setUser({ userDocId: docs.id, userData: docs.data() });
              });
            });
        }

        setEmail("");
        setPassword("");
        setUserData(authUser);
        //setUser(authUser);
      } else {
        // user has logged out...
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userData]);

  const handleLogin = (event) => {
    console.log("Login");
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <Main>
      <FormWrapperLogin>
        <Phone>
          <PhoneImage>
            <img src={phoneImage01} alt="instagram" />
          </PhoneImage>
        </Phone>
        <Container>
          <Top>
            <Logo>
              <img src={logo} alt="instagram" />
            </Logo>

            <Input
              type="text"
              placeholder="Phone number, username, or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={handleLogin}>
              Log In
            </Button>

            <Or>
              <Line />
              <p>OR</p>
              <Line />
            </Or>

            <Below>
              <img src={facebookLogo} alt="facebook" />
              <p>Log in with Facebook</p>
            </Below>

            <Forgot>
              <a href="#">Forgot password?</a>
            </Forgot>
          </Top>

          <SignUp>
            <p>
              Don't have an account? <a onClick={signup}>Sign up</a>
            </p>
          </SignUp>

          <AppGroup>
            <p>Get the app.</p>
            <div className="icons">
              <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo#">
                <img src={appstoreLogo} alt="appstore" />
              </a>
              <a href="">
                <img src={googleplayLogo} alt="googleplay" />
              </a>
            </div>
          </AppGroup>
        </Container>
      </FormWrapperLogin>
      <Footer>
        <ul>
          <li>
            <a href="#">ABOUT</a>
          </li>
          <li>
            <a href="#">HELP</a>
          </li>
          <li>
            <a href="#">PRESS</a>
          </li>
          <li>
            <a href="#">API</a>
          </li>
          <li>
            <a href="#">JOBS</a>
          </li>
          <li>
            <a href="#">PRIVACY</a>
          </li>
          <li>
            <a href="#">TERMS</a>
          </li>
          <li>
            <a href="#">LOCATIONS</a>
          </li>
          <li>
            <a href="#">TOP ACCOUNTS</a>
          </li>
          <li>
            <a href="#">HASHTAGS</a>
          </li>
          <li>
            <a href="#">LANGUAGE</a>
          </li>
        </ul>
        <CopyRight>© 2020 INSTAGRAM FROM FACEBOOK</CopyRight>
      </Footer>
    </Main>
  );
};

export default Login;
