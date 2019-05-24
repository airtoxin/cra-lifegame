/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import React from "react";
import logo from "./logo.svg";

const containerCss = css({
  textAlign: "center"
});

const logoCss = css({
  animation: `${keyframes({
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    }
  })} infinite 20s linear`,
  height: "40vmin",
  pointerEvents: "none"
});

const headerCss = css({
  backgroundColor: "#282c34",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 2vmin)",
  color: "white"
});

const linkCss = css({ color: "#61dafb" });

const App: React.FC = () => {
  return (
    <div css={containerCss}>
      <header css={headerCss}>
        <img src={logo} css={logoCss} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          css={linkCss}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
