import React from "react";
import hljs from "highlight.js";
import ReactQuill, { Quill } from "react-quill";

import $ from "jquery";
import "react-quill/dist/quill.snow.css";
import "./editor.css";
import "highlight.js/styles/gradient-dark.css";

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
});

const CustomButton = () => (
  <img
    style={{ width: "20px" }}
    src="https://www.svgrepo.com/show/77584/image.svg"
    alt=""
  />
);

const Size = Quill.import("formats/size");
Size.whitelist = [
  "1",
  "2",
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "20",
  "24",
  "26",
  "30",
];
Quill.register(Size, true);

function insertImage() {
  var length = this.quill.getLength();
  var value = prompt("What is the image URL");
  var alt = prompt("Enter alt text information");
  var size = prompt("Enter image size : cover/sm/lg/default ").toLowerCase();
  console.log(size, alt);
  console.log(length);
  this.quill.insertEmbed(length, "image", value, "alt tag");
  $(`.ql-container img[src$="${value}"]`).attr("alt", alt);
  $(`.ql-container img[src$="${value}"]`).addClass(`ql-urlImage-${size}`);
  console.log($(`.ql-container img[src$="${value}"]`));
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value="5"></option>
      <option value="6"></option>
      <option selected></option>
    </select>

    <select class="ql-font">
      <option value="serif"></option>
      <option selected></option>
      <option value="monospace"></option>
    </select>

    <select className="ql-size">
      <option value="1">1</option>
      <option selected value="2">
        2
      </option>
      <option value="4">4</option>
      <option value="6">6</option>
      <option value="8">8</option>
      <option value="10">10</option>
      <option value="12">12</option>
      <option value="14">14</option>
      <option value="16">16</option>
      <option value="20">20</option>
      <option value="24">24</option>
      <option value="26">26</option>
      <option value="30">30</option>
    </select>

    <select class="ql-align">
      <option value="center"></option>
      <option selected></option>
      <option value="right"></option>
      <option value="justify"></option>
    </select>

    <select className="ql-background">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>

    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>

    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <button className="ql-blockquote"></button>
    <button className="ql-direction"></button>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-video"></button>
    <button value="ordered" className="ql-list"></button>
    <button value="bullet" className="ql-list"></button>
    <button value="-1" className="ql-indent"></button>
    <button value="+1" className="ql-indent"></button>
    <button className="ql-code-block"></button>

    <button className="ql-insertImage">
      <CustomButton />
    </button>
  </div>
);

/*
 * Editor component with custom toolbar and content containers
 */

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    this.props.handleEditor(html);
    console.log(this.state);
  }
  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          placeholder="Let's Write"
          value={this.state.editorHtml || ""}
        />
      </div>
    );
  }
}

Editor.modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: {
    container: "#toolbar",

    handlers: {
      insertImage: insertImage,
    },
  },
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

/*
 * PropType validation
 */

export default Editor;

// // // -----------------------
