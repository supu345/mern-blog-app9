import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill for client-side only rendering
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS

function Editor({ data, onDataChange }) {
  const formats = [
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
    "video",
    "background",
    "clean",
    "code",
    "align",
    "direction",
    "code-block",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [
        {
          color: [
            "#000000",
            "#be0027",
            "#cf8d2e",
            "#e4e932",
            "#2c9f45",
            "#371777",
            "#511378",
            "#ff0000",
            "#52565e",
            "#f3f4f7",
            "#00aeff",
            "#ff4f81",
            "#2dde98",
            "#0389ff",
          ],
        },
        {
          background: [
            "#000000",
            "#ffffff",
            "#be0027",
            "#cf8d2e",
            "#e4e932",
            "#2c9f45",
            "#371777",
            "#511378",
            "#ff0000",
            "#52565e",
            "#f3f4f7",
            "#00aeff",
            "#ff4f81",
            "#2dde98",
            "#0389ff",
          ],
        },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link", "image", "video"],
      ["code-block", "clean"],
    ],
  };

  return (
    <div>
      <ReactQuill
        className="myQuil"
        theme="snow"
        value={data}
        onChange={onDataChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default Editor;
