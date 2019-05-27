import { css, keyframes } from "emotion";
import React from "react";
import logo from "./logo.svg";
import {GameOfLifeCanvas} from "./GameOfLifeCanvas";

export const App: React.FC = () => {
  return (
    <div className={containerCss}>
      <header className={headerCss}>
        <img src={logo} className={logoCss} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={linkCss}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <GameOfLifeCanvas className={css({ margin: "10em" })}/>
      </header>
    </div>
  );
};

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
