import FeedBackItemList from "../../feedback-item-list";
import { ShareFeedBackContext } from "../index";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../../App";

const StyledFeedbackCompletedPage = styled.div`
  padding: 25px;
  height: 90%;

  #top-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    &_left {
      display: flex;
      flex-direction: column;
    }

    #message {
      font-size: 28px;
      font-weight: 500;
      margin: 3px 0;
    }

    #helper-text {
      text-transform: uppercase;
      font-size: 12px;
      color: #acb1b6;
    }
  }

  #feedback-complete_page_content {
    height: 100%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    padding: 10px;
    overflow: auto;
  }
`;

const FeedBackCompleted = () => {
  const { handleClickFill } = useContext(ShareFeedBackContext);
  const { users, feedback } = useContext(AppContext);

  const usersFilledFor = Object.keys(feedback);

  const usersNotFilledFor = users.filter(
    (user) => !usersFilledFor.includes(user.id)
  );

  return (
    <StyledFeedbackCompletedPage>
      <div id="top-area">
        <div id="top-area_left">
          <span id="message">Thank you for sharing your feedback !</span>
          <span id="helper-text">
            Continue to give feedback to other team members
          </span>
        </div>
      </div>
      <div id="feedback-complete_page_content">
        <FeedBackItemList
          users={usersNotFilledFor}
          handleClickFill={handleClickFill}
        />
      </div>
    </StyledFeedbackCompletedPage>
  );
};

export default FeedBackCompleted;
