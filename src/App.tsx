import "./App.css";
import SetForm from "./component/SetForm";
import { useGlobalContext } from "./context";
import "./index.css";
import Loading from "./component/Loading";
import Modal1 from "./component/Modal1";
import { useState } from "react";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    nextQuestion,
    checkAnswer,
    correct,
    setNameAnswer,
    nameAnswer,
  } = useGlobalContext();

  const [activeQuestion, setActiveQuestion] = useState<boolean>(false);

  if (loading) {
    return <Loading />;
  }
  if (waiting) {
    return <SetForm />;
  }
  // //question trong ngoặc {} là trong api
  const { question, answeres } = questions[index];

  // //đảm bảo  câu đúng sẽ không ở vị trí cố định không cố định
  // let answers = [...incorrect_answers];
  // new

  // const tempIndex = Math.floor(Math.random() * 4);
  // // answers.push(correct_answer);

  // if (tempIndex === 3) {
  //   answers.push(correct_answer);
  // } else {
  //   answers.push(answers[tempIndex]);
  //   answers[tempIndex] = correct_answer;
  // }
  let answers = answeres;
  const correctAnswer2 = answers.find((answer: any) => answer.correct); //mục đích lấy được ra thằng đúng để check ==> render màu UI

  const handleChooseAnswer = (answer: any, e: any) => {
    e.target.style.backgroundColor = "orange";

    const audioCorrect = new Audio("/correctAnswer.mp3");
    const audioInCorrect = new Audio("/incorrect2.mp3");

    setActiveQuestion(true);
    setTimeout(() => {
      e.preventDefault();
      checkAnswer(answer.correct);
      setNameAnswer(answer.text);

      if (answer.text === correctAnswer2.text) {
        audioCorrect.play();
      } else {
        audioInCorrect.play();
      }

      e.target.style.backgroundColor = "#1D4ED8";
    }, 2000);

    setTimeout(() => {
      audioCorrect.pause();
      audioInCorrect.pause();
      nextQuestion();
      setActiveQuestion(false);
    }, 3500);
  };

  return (
    <div className={`bg-pri ${activeQuestion ? "pointer-events-none" : ""}`}>
      <Modal1 />
      <div className="p-5">
        <div className="flex items-center gap-x-2 text-white">
          <h1>Đã trả lời: </h1>
          <span className="text-[18px] font-semibold">{index}</span>
        </div>
        <div className="flex items-center gap-x-2 text-white">
          <h1>Số câu đúng: </h1>
          <span className="text-[18px] font-semibold">{correct}</span>
        </div>
      </div>
      <article className="flex flex-col items-center justify-center h-screen">
        <div className="shadow-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-md py-5 px-3 border-[3px] w-[800px] text-center border-gray-300">
          <h1 className="text-[20px] font-mono">
            Question {index + 1}: {question}
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5 ">
          {answers.map((answer: any, index: any) => (
            <div
              key={index}
              className={`shadow-xl ${
                nameAnswer !== "" && answer.correct === correctAnswer2.correct
                  ? "blinking-true"
                  : nameAnswer !== "" &&
                    answer.correct !== correctAnswer2.correct
                  ? "blinking-false"
                  : ""
              }   bg-blue-700 text-[20px] font-mono text-white rounded-sm py-2 cursor-pointer hover:transition-all  border-[3px] w-[400px] text-center border-gray-300 px-5`}
              onClick={(e) => handleChooseAnswer(answer, e)}
            >
              {/* <h1 key={index} className="text-[20px] font-mono"> */}
              {answer.text}
              {/* </h1> */}
            </div>
          ))}
        </div>

        <button
          className={` ${
            activeQuestion ? "pointer-events-none" : ""
          } py-2 px-4 bg-orange-400 mt-8 self-end mr-[330px] rounded-md text-white hover:opacity-90 cursor-pointer`}
          onClick={nextQuestion}
        >
          Next Question 👉
        </button>
      </article>
    </div>
  );
}

export default App;
