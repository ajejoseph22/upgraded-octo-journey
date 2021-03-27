import styled from "styled-components";

const TextWrapper = styled.div`
  margin-bottom: 10px;

  #text {
    width: 99%;
    resize: none;
  }
`;

const Text = ({ handleSetAnswer, answer }) => (
  <TextWrapper>
    <textarea
      onChange={({ target }) => handleSetAnswer(target.value)}
      value={answer || ""}
      id="text"
      placeholder="Say something"
      rows="10"
    />
  </TextWrapper>
);

export default Text;
