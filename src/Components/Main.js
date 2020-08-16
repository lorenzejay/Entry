import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NewNote from "./NewNote";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      item: [],
      currentItem: {
        key: "",
        text: "",
        color: "#ffffff",
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      currentItem: {
        text: e.target.value,
        key: this.state.currentItem.key,
        color: this.state.currentItem.color,
      },
    });
  };

  handleChangeTitle = (e) => {
    this.setState({
      currentItem: {
        text: this.state.currentItem.text,
        key: e.target.value,
        color: this.state.currentItem.color,
      },
    });
  };

  handleColorPicker = (e) => {
    console.log(e.target.value);
    this.setState({
      currentItem: {
        color: e.target.value,
        key: this.state.currentItem.key,
        text: this.state.currentItem.text,
      },
    });
  };

  deleteItem = (key) => {
    const filteredItems = this.state.item.filter((targetKey) => targetKey.key !== key);
    this.setState({
      item: filteredItems,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (this.state.currentItem.text === "" || this.state.currentItem.key === "") {
      return;
    } else if (newItem !== "") {
      const newItems = [...this.state.item, newItem];
      this.setState({
        item: newItems, //pushes the text over to the array
        currentItem: {
          text: "", // make empty after adding what was currentItem to the item array
          key: "", // make empty
          color: "#ffffff",
        },
      });
    }
  };

  setUpdate = (text, key) => {
    console.log("items: " + this.state.item);
    const editedItem = this.state.item;
    editedItem.map((eachItem) => {
      if (eachItem.key == key) {
        console.log("its a match");
        eachItem.text = text;
      }
    });
    this.setState({
      item: editedItem,
    });
  };

  render() {
    console.log(this.state.item);
    let buttonStyles = {
      display: "flex",
      flexAlign: "row",
      alignItems: "center",
    };
    return (
      <div className="main-body">
        <form className="enter-text">
          <input
            className="input-title"
            placeholder="Title..."
            name="key"
            value={this.state.currentItem.key || ""}
            onChange={this.handleChangeTitle}
          />

          <TextareaAutosize
            name="text"
            className="input-note"
            placeholder="enter note..."
            minRows="5"
            spellCheck="false"
            value={this.state.currentItem.text || ""}
            onChange={this.handleChange}
          />
          <div style={buttonStyles}>
            <button
              style={{ border: "none", outline: "none", height: "4vh", width: "8vh" }}
              onClick={this.handleSubmit}
            >
              Enter
            </button>

            <input
              style={{ height: "4vh", width: "8vh" }}
              type="color"
              name="color"
              value={this.state.currentItem.color || "#ffffff"}
              onChange={this.handleColorPicker}
            />
          </div>
        </form>

        <NewNote
          item={this.state.item}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
          color={this.state.currentItem.color}
        />
      </div>
    );
  }
}
