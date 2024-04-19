import React, { useState, FormEvent, useCallback } from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";

const useStyles = createUseStyles({
  formContainer: {
    maxWidth: 1000,
    minWidth: 400,
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    "& div": {
      width: "100%",
    },
  },
  formGroup: {
    marginBottom: 15,
    backgroundColor: "#500080",
    "& input": {
      width: "50%",
    },
  },
  label: {
    display: "block",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 3,
  },
  textarea: {
    width: "100%",
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 3,
    resize: "vertical",
  },
  select: {
    width: "100%",
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 3,
  },
  selectGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  fileInput: {
    display: "none",
  },

  imageContainer: {
    width: "100%",
    height: "200px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    objectFit: "contain",
  },
});

const ImageUploadForm: React.FC = () => {
  const classes = useStyles();

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", { image });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Accepted Files:", acceptedFiles);
    const file = acceptedFiles[0];
    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <form className={classes.formContainer} onSubmit={handleSubmit}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <img
          className={classes.imageContainer}
          src={previewUrl ? previewUrl : "browse.png"}
          alt="Browse-image"
        />
        <p>
          {isDragActive ? "Drop here..." : "Drop your image here or browse"}
        </p>
      </div>

      <div className={classes.formGroup}>
        <label className={classes.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className={classes.input}
          type="text"
          placeholder="Title"
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.label} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className={classes.textarea}
          placeholder="Description"
        />
      </div>
      <div className={classNames(classes.formGroup, classes.selectGroup)}>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="difficulty">
            Difficulty
          </label>
          <select id="difficulty" className={classes.select}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="category">
            Category
          </label>
          <select id="category" className={classes.select}>
            <option value="general">General</option>
            <option value="technical">Technical</option>
            <option value="customer_support">Customer Support</option>
          </select>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImageUploadForm;
