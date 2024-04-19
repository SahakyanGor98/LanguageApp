import React, { useState, FormEvent, useCallback, useEffect } from "react";
import { createUseStyles } from "react-jss";
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
    "& > div": {
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
  imageContainer: {
    width: "100%",
    height: "200px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    cursor: "pointer",
    objectFit: "contain",
  },
});

const ImageUploadForm: React.FC = () => {
  const classes = useStyles();

  const [images, setImages] = useState<File[] | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!images) {
      setError("Please select an image.");
      return;
    }
    // Add your form submission logic here.
    console.log("Form submitted:", { images });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImages((prev) => [...(prev || []), file]);
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <form className={classes.formContainer} onSubmit={handleSubmit}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <img
          className={classes.imageContainer}
          src={previewUrl || "browse.png"}
          alt="Browse-image"
        />
        <p>
          {isDragActive ? "Drop here..." : "Drop your image here or browse"}
        </p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={classes.formGroup}>
        <label className={classes.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className={classes.input}
          type="text"
          placeholder="Title"
          required
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
          required
        />
      </div>
      <div className={classes.selectGroup}>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="difficulty">
            Difficulty
          </label>
          <select id="difficulty" className={classes.select} required>
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="category">
            Category
          </label>
          <select id="category" className={classes.select} required>
            <option value="">Select category</option>
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
