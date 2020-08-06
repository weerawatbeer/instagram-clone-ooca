import React, { Fragment, useContext } from "react";
import Auth from "./components/Auth";
import Routing from "./Routing";
import { UserContext } from "./context/UserContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "./context/ThemeContext";
import GlobalStyle from "./styles/GlobalStyle";
const App = () => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  return (
    <StyledThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        {user ? <Routing /> : <Auth />}
      </Fragment>
    </StyledThemeProvider>
  );
};

export default App;
