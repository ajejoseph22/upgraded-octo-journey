import { questionTypes } from "../../../../util/constants";
import styled from "styled-components";

const StyledRating = styled.div`
  width: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;

  .bar {
    margin: 0 5px;
  }

  .text {
    width: 250px;
    overflow-wrap: anywhere;
  }

  .skipped {
    color: #c0c0c0;
    text-transform: uppercase;
  }
`;

const Rating = ({ questionType, answer }) => {
  let rating;

  if (answer != null) {
    switch (questionType) {
      case questionTypes.scale:
        rating = Array(answer)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              style={{
                background:
                  answer > 7 ? "#2BBF6A" : answer > 3 ? "#FF8C21" : "#DE521D",
                height: "100%",
                width: "15px",
              }}
              className="bar"
            />
          ));
        break;
      case questionTypes.multipleChoice:
        rating = Array(answer)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              style={{
                background:
                  answer > 2 ? "#2BBF6A" : answer > 1 ? "#FF8C21" : "#DE521D",
                height: "100%",
                width: "70px",
              }}
              className="bar"
            />
          ));
        break;
      case questionTypes.text:
        rating = <span className="text">{answer}</span>;
        break;
      default:
        break;
    }
  } else {
    rating = rating = <span className="skipped">skipped</span>;
  }

  return <StyledRating>{rating}</StyledRating>;
};

export default Rating;
