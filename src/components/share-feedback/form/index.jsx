import styled from "styled-components";
import { useState, useMemo, useContext } from "react";
import MultipleChoice from "./question/multiple-choice";
import { questionTypes } from "../../../util/constants";
import Scale from "./question/scale";
import Text from "./question/text";
import ProgressBar from "@ramonak/react-progress-bar";
import { removeUndefinedValues } from "../../../util/methods";
import { ShareFeedBackContext } from "../index";
import { AppContext } from "../../../App";

const FormWrapper = styled.div`
  padding: 25px;

  .questions-area {
    height: 100%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    padding: 10px;
  }

  #back-btn {
    cursor: pointer;
    font-size: 13px;
    text-transform: uppercase;
  }

  #top-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    &_left {
      display: flex;
      flex-direction: column;
    }

    #question {
      font-size: 28px;
      font-weight: 500;
      margin: 3px 0;
    }

    #helper-text {
      text-transform: uppercase;
      font-size: 12px;
      color: #acb1b6;
    }

    img {
      border-radius: 50%;
    }
  }

  #controls-area {
    display: flex;
    justify-content: space-between;

    button {
      padding: 10px;
      background: #fff;
      border: 1px solid #d9dcde;

      border-radius: 4px;

      :not([disabled]) {
        :hover {
          background: #ab61e5;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }

  #progress-area {
    margin-top: 20px;
  }
`;

const Form = ({ user }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answers, setAnswers] = useState({});

  const { setSelectedUser, setIsFinished } = useContext(ShareFeedBackContext);
  const { questions, setFeedback } = useContext(AppContext);

  const questionsLength = useMemo(() => questions.length, [questions]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSetAnswer = (value) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: value });
  };

  const finishAndSubmit = () => {
    setIsFinished(true);

    setFeedback({ [user.id]: answers });
  };

  const handlePrevious = () => {
    setAnswers(
      removeUndefinedValues({
        ...answers,
        [currentQuestionIndex]: selectedAnswers[currentQuestionIndex],
      })
    );

    setCurrentQuestionIndex((prevState) => prevState - 1);
  };

  const handleSkip = () => {
    if (currentQuestionIndex === questionsLength - 1) finishAndSubmit();

    setAnswers({ ...selectedAnswers, [currentQuestionIndex]: null });
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: null });

    setCurrentQuestionIndex((prevState) => prevState + 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex === questionsLength - 1) finishAndSubmit();

    setAnswers(
      removeUndefinedValues({
        ...answers,
        [currentQuestionIndex]: selectedAnswers[currentQuestionIndex],
      })
    );

    setCurrentQuestionIndex((prevState) => prevState + 1);
  };

  let question;

  if (currentQuestion) {
    switch (currentQuestion.type) {
      case questionTypes.multipleChoice:
        question = (
          <MultipleChoice
            answer={selectedAnswers[currentQuestionIndex]}
            handleSetAnswer={handleSetAnswer}
            question={currentQuestion}
          />
        );
        break;
      case questionTypes.scale:
        question = (
          <Scale
            answer={selectedAnswers[currentQuestionIndex]}
            handleSetAnswer={handleSetAnswer}
            question={currentQuestion}
          />
        );
        break;
      case questionTypes.text:
        question = (
          <Text
            answer={selectedAnswers[currentQuestionIndex]}
            handleSetAnswer={handleSetAnswer}
            question={currentQuestion}
          />
        );
        break;
      default:
        question = null;
    }
  }

  return (
    <FormWrapper>
      <div id="top-area">
        <div id="top-area_left">
          <span
            onClick={() => {
              setSelectedUser(null);
            }}
            id="back-btn"
          >
            &#60; back
          </span>
          <span id="question">{currentQuestion.label}</span>
          <span id="helper-text">
            Share your feedback about {user.firstName} {user.lastName}
          </span>
        </div>

        <img
          width={58}
          height={58}
          src={user.avatar}
          alt={`${user.firstName}-profile`}
        />
      </div>
      <div className="questions-area">
        {question}
        <div id="controls-area">
          <button disabled={!currentQuestionIndex} onClick={handlePrevious}>
            Previous
          </button>
          <button disabled={currentQuestion?.required} onClick={handleSkip}>
            Skip
          </button>
          <button
            disabled={!selectedAnswers[currentQuestionIndex]}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        <div id="progress-area">
          <ProgressBar
            completed={Math.floor(
              (Object.keys(answers).length / questionsLength) * 100
            )}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default Form;
