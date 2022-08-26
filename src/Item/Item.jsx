import { useEffect, useState } from "react";

const Item = ({ data, questionID, submitted }) => {
  const [checked, setChecked] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const handleChecked = (item) => {
    setChecked(item.id);
  };
  useEffect(() => {
    !submitted && setChecked("");
  }, [submitted]);
  useEffect(() => {
    setIsCorrect(data.some((item) => item.id === checked && item.isCorrect));
  }, [checked]);
  return (
    <div className="answer">
      {submitted && (
        <div className={`isCorrect ${isCorrect ? "true" : "false"}`}>
          {isCorrect ? "Đúng" : "Sai"}
        </div>
      )}
      {data.map((item, index) => (
        <div
          key={item.id}
          className={`answerItem ${submitted && item.isCorrect && "show"} ${
            submitted && !item.isCorrect && "hide"
          }`}
        >
          <input
            type="radio"
            name={questionID}
            id={item.id}
            checked={item.id === checked}
            onChange={(e) => handleChecked(item)}
          />
          <label htmlFor={item.id}>{item.title}</label>
        </div>
      ))}
    </div>
  );
};

export default Item;
