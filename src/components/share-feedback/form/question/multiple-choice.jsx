import styled from "styled-components";

const MultipleChoiceWrapper = styled.div`
  .question {
    background: #f2f3f4;
    margin: 10px 0;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const MultipleChoice = ({ question }) => (
  <MultipleChoiceWrapper>
    {question.options.map((option) => (
      //todo: onClick something with the value
      <div className="question">{option.label}</div>
    ))}
  </MultipleChoiceWrapper>
);

export default MultipleChoice;
