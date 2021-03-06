import { FC, memo, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

// import { QuizAnswerCard } from "../components/atoms/QuizAnswerCard";
import { Footer, Header } from "../components/organisms/layout";
import { useGetQuizData } from "../hooks/api/useGetQuizData";
import { useMatchingQuizAnswer } from "../hooks/useMatchingQuizAnswer";
import { useStartTimer } from "../hooks/useStartTimer";

export const QuizPage: FC = memo(() => {
  const { quizQuestion, quizAnswer, quizSelects, getQuizData } = useGetQuizData();
  const { timeLimit, startTimer } = useStartTimer();
  const { quizDataReloadFlag, quizCorrectFlag, matchingQuizAnswer } = useMatchingQuizAnswer();
  let navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    getQuizData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizDataReloadFlag, matchingQuizAnswer])
  console.log("render");

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="bg-gray-100 py-12">
        <div className="box-border border-4 rounded-lg outline-none w-2/3 px-8 py-12 mx-auto mt-12 mb-12 text-center">
          <p className="text-3xl mb-12">{quizQuestion}</p>
          <div>
            {/* 取得するデータの形式が決まったらbuttonをコンポーネント化する */}
            {/* {quizSelects.map((quizSelect, i) => (
              <QuizAnswerCard key={quizAnswer} index={i} quizAnswer={quizAnswer} quizSelect={quizSelect} matchingQuizAnswer={matchingQuizAnswer} />
            ))} */}
            <button
              className="bg-black text-white rounded p-4 hover:opacity-70 font-bold text-2xl m-6 md:mx-6 md:inline block mx-auto"
              onClick={() => matchingQuizAnswer(quizSelects[0], quizAnswer)}
            >
              <div className="flex w-96">
                <span className="">1.</span>
                <span className="mx-auto">{quizSelects[0]}</span>
              </div>
            </button>
            <button
              className="bg-black text-white rounded p-4 hover:opacity-70 font-bold text-2xl m-6 md:mx-6 md:inline block mx-auto"
              onClick={() => matchingQuizAnswer(quizSelects[1], quizAnswer)}
            >
              <div className="flex w-96">
                <span className="">2.</span>
                <span className="mx-auto">{quizSelects[1]}</span>
              </div>
            </button>
            <button
              className="bg-black text-white rounded p-4 hover:opacity-70 font-bold text-2xl m-6 md:mx-6 md:inline block mx-auto"
              onClick={() => matchingQuizAnswer(quizSelects[2], quizAnswer)}
            >
              <div className="flex w-96">
                <span className="">3.</span>
                <span className="mx-auto">{quizSelects[2]}</span>
              </div>
            </button>
            <button
              className="bg-black text-white rounded p-4 hover:opacity-70 font-bold text-2xl m-6 md:mx-6 md:inline block mx-auto"
              onClick={() => matchingQuizAnswer(quizSelects[3], quizAnswer)}
            >
              <div className="flex w-96">
                <span className="">4.</span>
                <span className="mx-auto">{quizSelects[3]}</span>
              </div>
            </button>
          </div>
          {quizCorrectFlag === null ? (
            <></>
          ) : (
            quizCorrectFlag ? (
              <div className="text-green-500 text-3xl text-bold mt-12">correct</div>
            ) : (
              <div className="text-red-500 text-3xl text-bold mt-12">miss</div>
            )
          )}
        </div>
        <div className="text-center">
          <button
            className="text-white font-bold w-48 rounded-lg bg-sky-400 hover:bg-sky-500 px-4 py-2 shadow-sky2 opacity-90 hover:opacity-100 mb-8"
            onClick={() => navigate("/home")}
          >
            終了する
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
})
