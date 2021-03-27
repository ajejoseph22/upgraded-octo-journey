import RatingList from "../rating-list";
import styled from "styled-components";

const StyledQuestionsArea = styled.div`
  header {
    font-weight: bold;
  }
`;

const QuestionsArea = ({ user }) => {
  return (
    <StyledQuestionsArea>
      <header>
        {user.firstName} {user.lastName}'s Feedback
      </header>
      <RatingList user={user} />
    </StyledQuestionsArea>
  );
};
export default QuestionsArea;
