import styled from "styled-components";
import classNames from "classnames";

const MultipleChoiceWrapper = styled.div`
  .question {
    background: #f2f3f4;
    margin: 10px 0;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;

    &:hover,
    &.selected {
      background: #ab61e5;
      color: #fff;
    }
  }
`;

const MultipleChoice = ({ question, handleSetAnswer, answer }) => (
  <MultipleChoiceWrapper>
    {question.options.map((option) => {
      const classes = classNames({
        question: true,
        selected: option.value === answer,
      });

      return (
        <div
          key={option.value}
          onClick={() => handleSetAnswer(option.value)}
          className={classes}
        >
          {option.label}
        </div>
      );
    })}
  </MultipleChoiceWrapper>
);

export default MultipleChoice;
