import styled from "styled-components";

const TextWrapper = styled.div`
  margin-bottom: 10px;

  #text {
    width: 99%;
    resize: none;
  }
`;

const Text = ({ question }) => (
  <TextWrapper>
    <textarea id="text" placeholder="Say something" rows="10" />
  </TextWrapper>
);

export default Text;
