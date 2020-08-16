import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import Note from "./Note";

export default function Navbar() {
  const [themeBtnText, setThemeText] = useState("Enable Dark Theme");
  const [theme, setTheme] = useState("light");
  const [layout, setLayout] = useState({
    display: "grid",
    justifyContent: "space-around",
    gridTemplateColumns: "repeat(3, 400px)",
  });

  const toggleTheme = {
    backgroundColor: theme === "dark" ? "#ff6600" : "#ffa500",
    color: theme === "dark" ? "white" : "#333333",
  };

  const handleClick = (e) => {
    setTheme("dark");
    setThemeText("Disable Dark Theme");

    if (theme === "dark") {
      setThemeText("Enable Dark Theme");
      setTheme("light");
    }
  };

  const handleLayout = () => {
    setLayout({ ...layout, gridTemplateColumns: "repeat(1, 400px)" });
  };

  const resetLayout = () => {
    setLayout({ ...layout, gridTemplateColumns: "repeat(3, 400px)" });
  };

  React.useEffect(() => {
    const data = localStorage.getItem("theme");
    if (data) {
      setTheme(JSON.parse(data));
    }
  }, []); //display what was in local storage only on the first render

  React.useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }); // set items array of all the values into the localstorage

  console.log(layout);
  return (
    <div className="wrapper" style={{ backgroundColor: theme === "dark" ? "#333333" : "white" }}>
      <nav style={toggleTheme} className="navbar">
        <div style={{ letterSpacing: "5px" }} className="title-name">
          ENTRY
        </div>
        <button style={toggleTheme} onClick={resetLayout} className="refresh-btn">
          <FontAwesomeIcon icon={faRedo} size="2x" />
        </button>
        <button onClick={handleLayout} style={toggleTheme}>
          <FontAwesomeIcon icon={faList} size="2x" />
        </button>

        <Dropdown style={toggleTheme}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FontAwesomeIcon style={toggleTheme} icon={faCog} size="2x" />
          </Dropdown.Toggle>

          <Dropdown.Menu style={toggleTheme}>
            <Dropdown.Item onClick={handleClick}>{themeBtnText}</Dropdown.Item>
            <Dropdown.Item href="./">Settings</Dropdown.Item>
            <Dropdown.Item href="./">Help</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
      <Note theme={theme} layout={layout} />
    </div>
  );
}
