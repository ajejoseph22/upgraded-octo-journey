import Rating from "react-rating-scale";
import styled from "styled-components";

const ScaleWrapper = styled.div`
  padding: 30px 0;
  width: 100%;

  .rating-0-1-1 {
    justify-content: space-around;
  }
`;

const Scale = ({ question }) => (
  <ScaleWrapper>
    <Rating />
  </ScaleWrapper>
);

export default Scale;
