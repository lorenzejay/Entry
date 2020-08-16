import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";

export default function NewNote(props) {
  console.log(props.layout);
  const layout = props.layout;
  const toggleTheme = {
    backgroundColor: props.theme === "dark" ? "#333333" : "white",
    color: props.theme === "dark" ? "white" : "#333333",
    ...layout,
  };

  console.log(toggleTheme);
  let currentItem = props.items.map((item) => {
    return (
      <div className="note-cards" style={{ backgroundColor: item.color }} key={item.key}>
        <h3 style={{ backgroundColor: item.color }}>{item.key}</h3>
        <TextareaAutosize
          style={{ backgroundColor: item.color, border: "none" }}
          type="text"
          id={item.key}
          value={item.note}
          onChange={(e) => props.handleEdit(e.target.value, item.key)}
        />
        <button className="delete-btn" style={{ backgroundColor: item.color }}>
          <FontAwesomeIcon
            style={{ backgroundColor: item.color }}
            onClick={() => {
              props.handleDelete(item.key);
            }}
            icon={faTrash}
          />
        </button>
      </div>
    );
  });

  return (
    <div style={toggleTheme} className="notes-container">
      {currentItem}
    </div>
  );
}
