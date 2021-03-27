import { AppContext } from "../../../../App";
import { useContext } from "react";
import styled from "styled-components";
import Rating from "../rating";

const StyledRatingList = styled.div`
  padding: 10px;

  .question {
    width: 50%;
  }

  .question-rating-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.25);
  }
`;

const RatingList = ({ user }) => {
  const { questions, feedback } = useContext(AppContext);

  return (
    <StyledRatingList>
      {questions.map((question, questionIndex) => (
        <div className="question-rating-item">
          <div className="question">{question.label}</div>
          <Rating
            answer={feedback[user.id][questionIndex]}
            questionType={question.type}
          />
        </div>
      ))}
    </StyledRatingList>
  );
};

export default RatingList;
