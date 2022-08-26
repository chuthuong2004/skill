import "./App.css";
import Item from "./Item/Item";
import { data } from "./data";
import { useState, useRef } from "react";
const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};
const mixedData = (arr) => {
  let newArr = arr.map((data) => {
    let answersArr = getShuffledArr(data.answers);
    return { ...data, answers: answersArr };
  });
  return getShuffledArr(newArr);
};
function App() {
  const [questions, setQuestions] = useState(mixedData(data));
  const [submitted, setSubmitted] = useState(false);
  const questionRef = useRef();
  const scrollTop = () => {
    questionRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = () => {
    submitted && setQuestions(mixedData(questions));
    submitted && scrollTop();
    setSubmitted(!submitted);
  };
  return (
    <div className="Container">
      <div className="titleApp">Bài thi thử kỹ năng làm việc</div>
      <div className="donate">
        Donate me <span>Momo: 0333729170</span>
      </div>
      <div className="Question" ref={questionRef}>
        {questions.map((answer, index) => (
          <div key={answer.id} className="item">
            <h3 className="title">
              <strong>Câu {index + 1}:</strong> {answer.title}
            </h3>
            <Item
              key={answer.id}
              questionID={answer.id}
              data={answer.answers}
              submitted={submitted}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="btnSubmit">
        {submitted ? "Làm lại" : "Submit"}
      </button>
    </div>
  );
}

export default App;
