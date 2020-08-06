import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FeedProvider } from "./context/FeedContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <FeedProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </FeedProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);