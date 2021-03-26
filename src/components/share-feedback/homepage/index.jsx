import styled from "styled-components";
import FeedBackItemList from "../../feedback-item-list";

const StyledHomePage = styled.div`
  height: 100%;

  #share-feedback-page {
    &_top-area {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &_content {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
      height: 100%;
      overflow-x: auto;
    }
  }
`;

const HomePage = ({ users, handleClickFill }) => (
  <StyledHomePage id="share-feedback-page">
    <div id="share-feedback-page_top-area">
      <header>Share Feedback</header>
      <span>Dropdown</span>
    </div>
    <div id="share-feedback-page_content">
      <FeedBackItemList users={users} handleClickFill={handleClickFill} />
    </div>
  </StyledHomePage>
);

export default HomePage;
