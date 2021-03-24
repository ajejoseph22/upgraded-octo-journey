import styled from "styled-components";
import { useEffect } from "react";

const ShareFeedBackPageWrapper = styled.div`
  width: 600px;
  height: 60vh;
  margin: 10vh auto;
  background: pink;

  #share-feedback-page_top-area {
    display: flex;
    justify-content: space-between;
  }

  header {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ShareFeedBackPage = () => {
  useEffect(() => {}, []);

  return (
    <ShareFeedBackPageWrapper>
      <div id="share-feedback-page_top-area">
        <header>Share Feedback</header>
        <span>Dropdown</span>
      </div>
      <div id="share-feedback-page_content">content</div>
    </ShareFeedBackPageWrapper>
  );
};
export default ShareFeedBackPage;
