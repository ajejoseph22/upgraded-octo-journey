import styled from "styled-components";
import { useState, useMemo } from "react";
import MultipleChoice from "./question/multiple-choice";
import { questionTypes } from "../../../util/constants";

const FormWrapper = styled.div`
  padding: 25px;

  .questions-area {
    height: 100%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    padding: 10px;
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
`;

const Form = ({ questions, user }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questionsLength = useMemo(() => questions.length, [questions]);

  const currentQuestion = questions[currentQuestionIndex];

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevState) => prevState - 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex === questionsLength - 1) {
      console.log("finished");
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex((prevState) => prevState + 1);
  };

  let question;

  switch (currentQuestion.type) {
    case questionTypes.multipleChoice:
      question = <MultipleChoice question={currentQuestion} />;
      break;
    default:
      question = null;
  }

  return (
    <FormWrapper>
      <div id="top-area">
        <div id="top-area_left">
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
          <button disabled={currentQuestion.required} onClick={handleNext}>
            Skip
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
        <div id="progress-area">hi</div>
      </div>
    </FormWrapper>
  );
};

export default Form;
