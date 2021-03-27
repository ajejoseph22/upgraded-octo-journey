import styled from "styled-components";

const NoFeedbackWrapper = styled.div`
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  margin: 20px auto;
  padding: 40px;
  text-align: center;
  width: 40%;
`;

const NoFeedback = () => (
  <NoFeedbackWrapper>No feedback, boss! Check back later :)</NoFeedbackWrapper>
);

export default NoFeedback;
