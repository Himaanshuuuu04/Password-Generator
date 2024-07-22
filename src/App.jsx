import "./styles.css";
import { useState, useCallback, useEffect } from "react";
import useSound from "use-sound";
import click from "./sounds/click.mp3";

export default function App() {
  const [play] = useSound(click);
  const [password, setPassword] = useState("");
  const [length, setlength] = useState(8);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const generator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if (characterAllowed) str += "!@#$%^&*(){}[]+=:;<>?/|";
    if (numberAllowed) str += "1234567890";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, characterAllowed, numberAllowed]);

  useEffect(() => {
    generator();
  }, [length, characterAllowed, numberAllowed,generator]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    play();
  };

  const [tooltipText, setTooltipText] = useState("Copy to clipboard");

  const handleCopy = () => {
    play();
    copyPassword();
    setTooltipText("Copied!");
    setTimeout(() => {
      setTooltipText("Copy to clipboard");
    }, 2000); // Reset tooltip text after 2 seconds
  };

  return (
    <div className="flex">
      <div className="container">
        <div className="sub-container-1">
          <h1>Password Generator</h1>
          <div className="main">
            <label className="search-label">
              <input
                className="input"
                value={password}
                placeholder="password"
                readOnly
                type="text"
              />
            </label>
            <button className="copy" onClick={handleCopy}>
              <span
                className="tooltip"
                data-text-initial="Copy to clipboard"
                data-text-end="Copied!"
              ></span>
              <span>
                <svg
                  className="clipboard"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  x="0"
                  y="0"
                  viewBox="0 0 6.35 6.35"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="18"
                  height="18"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      fill="currentColor"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="sub-container-2">
          <label className="slider">
            <input
              className="level"
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
                play();
              }}
            />
          </label>
          <label className="length">{length}</label>
          <div className="sub-container-3">
            <div className="customCheckBoxHolder">
              <input
                id="cCB1"
                value={numberAllowed}
                className="customCheckBoxInput"
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                  play();
                }}
              />
              <label htmlFor="cCB1" className="customCheckBoxWrapper">
                <div className="customCheckBox">
                  <div className="inner">Numbers</div>
                </div>
              </label>
            </div>
            <div className="customCheckBoxHolder">
              <input
                id="cCB2"
                value={characterAllowed}
                className="customCheckBoxInput"
                type="checkbox"
                defaultChecked={characterAllowed}
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                  play();
                }}
              />
              <label htmlFor="cCB2" className="customCheckBoxWrapper">
                <div className="customCheckBox">
                  <div className="inner">Characters </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
