import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NewNote from "./NewNote";

function Note(props) {
  console.log(props.layout);
  const [notes, setNote] = useState({ key: "", note: "", color: "#ffffff" });
  const [items, setItem] = useState([]);

  const toggleTheme = {
    backgroundColor: props.theme === "dark" ? "#333333" : "white",
    color: props.theme === "dark" ? "white" : "#333333",
  };

  const handleClick = (e) => {
    e.preventDefault();
    const newItems = notes;
    if (newItems.note !== "") {
      setItem([...items, newItems]);
    }
    setNote({ note: "", key: "", color: "#ffffff" }); // reseting values after pressing enter
  };
  const handleDelete = (key) => {
    const filteredItems = items.filter((item) => item.key !== key);
    setItem(filteredItems);
  };

  const handleEdit = (text, key) => {
    const allNotes = items;
    allNotes.map((item) => {
      if (item.key === key) {
        item.note = text;
      }
    });
    setItem([...items]);
  };

  React.useEffect(() => {
    const data = localStorage.getItem("notes");
    if (data) {
      setItem(JSON.parse(data));
    }
  }, []); //display what was in local storage only on the first render

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(items));
  }); // set items array of all the values into the localstorage

  let buttonStyles = {
    display: "flex",
    flexAlign: "row",
    alignItems: "center",
  };

  return (
    <div style={toggleTheme} className="main-body">
      <form style={toggleTheme} className="enter-text">
        <input
          style={toggleTheme}
          className="input-title"
          placeholder="Title..."
          name="key"
          value={notes.key || ""}
          onChange={(e) => setNote({ ...notes, key: e.target.value })}
        />

        <TextareaAutosize
          style={toggleTheme}
          name="text"
          className="input-note"
          placeholder="enter note..."
          minRows="5"
          spellCheck="false"
          value={notes.note || ""}
          onChange={(e) => setNote({ ...notes, note: e.target.value })}
        />
        <div style={(buttonStyles, toggleTheme)} className="form-btns">
          <button
            className="enter-btn"
            style={{ border: "none", outline: "none", height: "4vh", width: "8vh" }}
            onClick={handleClick}
          >
            Enter
          </button>

          <input
            placeholder="color"
            className="color-picker"
            style={{ height: "4vh", width: "8vh" }}
            type="color"
            name="color"
            value={notes.color || "#ffffff"}
            onChange={(e) => setNote({ ...notes, color: e.target.value })}
          />
        </div>
      </form>
      <NewNote
        items={items}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        theme={props.theme}
        layout={props.layout}
      />
    </div>
  );
}

export default Note;
