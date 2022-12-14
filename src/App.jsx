import "./App.css";
import Item from "./Item/Item";
import { data } from "./data";
import { useState, useRef, useEffect } from "react";
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
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
const CloseIcon = ({ width = "2rem", height = "2rem", className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="#2e2e2e"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M6 6L18 18"
      stroke="#2e2e2e"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);
function App() {
  const [questions, setQuestions] = useState(mixedData(data));
  const [dataSearch, setDataSearch] = useState(mixedData(data));
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");
  const questionRef = useRef();
  const scrollTop = () => {
    questionRef.current.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = () => {
    submitted && setQuestions(mixedData(questions));
    submitted && setDataSearch(mixedData(questions));
    submitted && scrollTop();
    setSubmitted(!submitted);
  };
  const handleSearchChange = (e) => {
    if (submitted) {
      const listNew = questions.filter((item) =>
        removeVietnameseTones(item.title.toLowerCase()).includes(
          removeVietnameseTones(e.target.value.toLowerCase().trim())
        )
      );
      setSearch(e.target.value);
      setDataSearch(listNew);
    }
  };
  useEffect(() => {
    !search && setDataSearch(questions);
  }, [search]);
  return (
    <div className="Container">
      <div className="titleApp">Bài thi thử kỹ năng làm việc</div>
      <div className="donate">
        Donate me <span>Momo: 0333729170</span>
      </div>
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e)}
          placeholder={
            submitted
              ? "Rồi hãy bắt đầu search đi nào !"
              : "Bấm submit rồi hẳn search nhé mấy huynh đài"
          }
        />
        <div
          onClick={() => setSearch("")}
          className={`close ${search && "active"}`}
        >
          <CloseIcon className="closeIcon" />
        </div>
      </div>
      <div className="Question" ref={questionRef}>
        {dataSearch.length > 0 ? (
          dataSearch.map((answer, index) => (
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
          ))
        ) : (
          <div
            style={{
              fontSize: 40,
              textAlign: "center",
              margin: "20px 0",
              color: "red",
              fontWeight: "bold",
            }}
          >
            Search sai rồi cha nậu !
          </div>
        )}
      </div>
      <button onClick={handleSubmit} className="btnSubmit">
        {submitted ? "Làm lại" : "Submit"}
      </button>
    </div>
  );
}

export default App;
