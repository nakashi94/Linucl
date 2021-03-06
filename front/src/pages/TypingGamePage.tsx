import { FC, memo, useEffect, useState } from "react";

import { TimeBar } from "../components/atoms/TimeBar";
import { TypingGameEndScreen } from "../components/atoms/TypingGameEndScreen";
import { TypingGameStartScreen } from "../components/molecules/TypingGameStartScreen";
import { Footer, Header } from "../components/organisms/layout";
import { TypingGameScreen } from "../components/organisms/TypingGameScreen";
import { useGetTypingGameData } from "../hooks/api/useGetTypingGameData";
import { useMatchingAnswer } from "../hooks/useMatchingAnswer";
import { useSleep } from "../hooks/useSleep";
import { useStartTimer } from "../hooks/useStartTimer";
import { useTypingGameStartTrigger } from "../hooks/useTypingGameStartTrigger";

export const TypingGamePage: FC = memo(() => {
  const { typingGameStartFlag, typingGameStartTrigger } = useTypingGameStartTrigger();
  const { typingGameData, getTypingGameData } = useGetTypingGameData();
  const { counter, correctFlag, matchingAnswer, initCorrectFlag } = useMatchingAnswer();
  const { timeLimit, startTimer, initTimeLimit } = useStartTimer();
  const { sleep } = useSleep();
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [typingGameEndFlag, setTypingGameEndFlag] = useState<boolean>(false);

  useEffect(() => {
    getTypingGameData()
      .then((res) => {
        console.log(res);
        console.log(1);
        console.log(typingGameData);
        // setQuestion(typingGameData[counter].question);
        // console.log(question);
        // setAnswer(typingGameData[counter].answer);
        // console.log(correctFlag);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (counter > 0 && counter < typingGameData.length) {
      setQuestion(typingGameData[counter].question);
      console.log(question);
      setAnswer(typingGameData[counter].answer);
      console.log(correctFlag);
      startTimer();
    }
    // if (timeLimit <= 0) {
    //   initTimeLimit();
    // }
    initTimeLimit();
    if (counter >= (10 - 1)) { // 10???typingGameData.length?????????
      console.log("stop");
      setTypingGameEndFlag(true);
    }
  }, [counter]);

  console.log("TypingGamePage????????????????????????????????????")

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="bg-zinc-900 py-12">
        <div className="box-border border-4 rounded-3xl outline-none w-2/3 px-8 py-12 mx-auto my-24 text-center shadow-lg shadow-zinc-500 relative">
          {typingGameStartFlag ? (
            <div>
            {typingGameEndFlag ? (
              <TypingGameEndScreen />
            ) : (
              <TypingGameScreen question={question} answer={answer} correctFlag={correctFlag} counter={counter} initCorrectFlag={initCorrectFlag} onSubmit={matchingAnswer} initTimeLimit={initTimeLimit} />
              )}
              </div>
          ) : (
            <TypingGameStartScreen onKeyDown={(e: any) => typingGameStartTrigger(e)} />
          )}
          <TimeBar timeLimit={timeLimit} />
        </div>
      </div>
      <Footer />
    </div>
  )
})
