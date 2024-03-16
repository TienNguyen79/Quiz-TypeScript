import axios from "axios";
import React, { createContext, useContext, useState } from "react";

interface Tcategory {
  sports: number;
  geography: number;
  history: number;
}

interface Tquiz {
  amount: number;
  category: string;
  difficulty: string;
}

interface TQuestion {
  category: string;
  correct_answer: string | number;
  difficulty: string;
  incorrect_answers: any[];
  question: string;
  type: string;
}
const table: any = {
  sports: 21,
  geography: 22,
  history: 23,
};

const API_ENDPOINT: string = "https://opentdb.com/api.php?";

// Truyền giá trị mặc định vào createContext
const AppContext = createContext<any>({});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(true);
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [correct, setCorrect] = useState<number>(0);
  const [chooseAnswer, setChooseAnswer] = useState<boolean>(false);
  const [nameAnswer, setNameAnswer] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Tquiz>({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  //open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  //check để bấm sang các câu tiếp theo nếu đến câu cuối thì return index về 0
  const nextQuestion = () => {
    setNameAnswer(""); //khi sang câu khác sẽ không còn blink

    setIndex((oldIndex: number) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        const audioFinished = new Audio("/finished.mp3");
        audioFinished.play();
        return 0;
      } else {
        return index;
      }
    });
  };

  //check đáp án có đúng hay không
  const checkAnswer = (value: boolean) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
  };

  //fetch Question

  //sắp xếp ngẫu nhiên mảng câu hỏi
  const rearrangeArray = (array: any) => {
    // rearrangeArray to random

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchQuestions = async (url: string) => {
    setLoading(true);
    setWaiting(false);
    try {
      const response = await axios.get(url);
      if (response) {
        const data = response.data.results;
        if (data.length > 0) {
          setQuestions(
            data.map((ques: TQuestion) => {
              const { incorrect_answers, correct_answer, ...props } = ques;
              return {
                ...props,
                answeres: rearrangeArray([
                  { text: correct_answer, correct: true },
                  ...incorrect_answers.map((a: any) => ({
                    text: a,
                    correct: false,
                  })),
                ]),
              };
            })
          );
          setLoading(false);
          setWaiting(false);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      }
    } catch (error) {
      console.log("🚀 ~ fetchQuestion ~ error:", error);
      setWaiting(true);
    }
  };

  //khi thay đổi form setUp
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  //gửi thông tin đi
  const handleSubmit = (e: { preventDefault: () => void }) => {
    const audioFinished = new Audio("/nhacnen2.mp3");
    audioFinished.play();
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        quiz,
        handleChange,
        handleSubmit,
        loading,
        waiting,
        error,
        nextQuestion,
        index,
        questions,
        correct,
        checkAnswer,
        openModal,
        isModalOpen,
        closeModal,
        setChooseAnswer,
        chooseAnswer,
        setNameAnswer,
        nameAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Đảm bảo sử dụng useContext đúng cách
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
