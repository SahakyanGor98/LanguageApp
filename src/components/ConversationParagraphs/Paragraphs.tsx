import React, { useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { nanoid } from "nanoid";

const useStyles = createUseStyles({
  container: {
    marginTop: 10,
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
    maxHeight: 200,
    overflowY: "auto",
  },
  inputRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  label: {
    minWidth: 100,
    fontWeight: "bold",
  },
  input: {
    flexGrow: 1,
    padding: 5,
  },
  addButton: {
    marginTop: 10,
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  deleteButton: {
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
    color: "#f00",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
});

const SPEAKER_1 = "speaker-1";
const SPEAKER_2 = "speaker-2";
const INITIAL_INPUTS = [
  { id: nanoid(), text: "", role: SPEAKER_1 },
  { id: nanoid(), text: "", role: SPEAKER_2 },
];

type TInputItem = {
  id: string;
  text: string;
  role: string;
};

const TextInputsComponent: React.FC = () => {
  const classes = useStyles();

  const [inputs, setInputs] = useState<TInputItem[]>(INITIAL_INPUTS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [currentText, setCurrentText] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleCurrentTextChange = (id: string) => {
    const currentInput = inputs.find((input) => input.id === id);
    setCurrentText(currentInput?.text || "");
  };

  const handleInputSelect = (id: string) => {
    setActiveId(id);
    handleCurrentTextChange(id);
  };

  const handleInputBlur = (id: string) => {
    const currentInput = inputs.find((input) => input.id === id);
    if (currentInput && currentInput.text !== currentText) {
      const newInputs = inputs.map((input) =>
        input.id === id ? { ...input, text: currentText } : input
      );
      setInputs(newInputs);
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      if (currentText.trim() !== "") {
        handleInputBlur(id);
        const nextIndex = inputs.findIndex((input) => input.id === id) + 1;
        if (nextIndex === inputs.length) {
          addNewParagraph();
        } else {
          setActiveId(inputs[nextIndex].id);
        }
      }
    }
  };

  const addNewParagraph = () => {
    const newRole = inputs.length % 2 === 0 ? SPEAKER_1 : SPEAKER_2;
    const newId = nanoid();
    setInputs([...inputs, { id: newId, text: "", role: newRole }]);
    setActiveId(newId);
  };

  const removeInput = (id: string) => {
    const newInputs = inputs.filter((input) => input.id !== id);
    setInputs(newInputs);
  };

  useEffect(() => {
    if (activeId !== null && containerRef.current) {
      const inputElement = containerRef.current.querySelector(
        `input[data-id="${activeId}"]`
      ) as HTMLInputElement;
      handleCurrentTextChange(activeId);
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [activeId]);

  useEffect(() => {
    containerRef.current &&
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
  }, [inputs.length]);

  return (
    <div className={classes.container} ref={containerRef}>
      {inputs.map(({ id, text, role }) => (
        <div key={id} className={classes.inputRow}>
          <label className={classes.label}>{`Speaker ${role.charAt(
            role.length - 1
          )}`}</label>
          <input
            className={classes.input}
            type="text"
            value={id === activeId ? currentText : text}
            data-id={id}
            onClick={() => handleInputSelect(id)}
            onChange={(e) => setCurrentText(e.target.value)}
            onKeyDown={(e) => handleInputKeyPress(e, id)}
            onBlur={() => handleInputBlur(id)}
          />
          <button
            className={classes.deleteButton}
            onClick={() => removeInput(id)}
          >
            &#x2715;
          </button>
        </div>
      ))}
      <div className={classes.inputRow}>
        <button className={classes.addButton} onClick={addNewParagraph}>
          Add Paragraph
        </button>
        <button
          className={classes.addButton}
          onClick={() => console.log(inputs)}
        >
          Show
        </button>
      </div>
    </div>
  );
};

export default TextInputsComponent;
