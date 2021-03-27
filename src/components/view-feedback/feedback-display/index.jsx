import styled from "styled-components";
import FeedBackItemList from "../../feedback-item-list";
import { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { feedbackKey } from "../../../util/constants";
import QuestionsArea from "./questions-area";

const FeedBackDisplayWrapper = styled.div`
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  margin: 20px auto;
  width: 70%;
  display: flex;
  height: 650px;

  #user-area {
    width: 40%;
    border-right: 1px solid rgba(0, 0, 0, 0.25);
    overflow-x: auto;
  }

  #questions-area {
    overflow-x: auto;
  }

  header {
    padding: 5px 10px;
    font-size: 13px;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

const FeedBackDisplay = () => {
  const { users } = useContext(AppContext);
  const storedFeedback = JSON.parse(localStorage.getItem(feedbackKey));
  const [selectedUser, setSelectedUser] = useState();

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <FeedBackDisplayWrapper>
      <div id="user-area">
        <header>Feedback received</header>
        <FeedBackItemList
          users={users.filter((user) => storedFeedback[user.id])}
          showFillButton={false}
          handleClick={handleClick}
        />
      </div>
      <div id="questions-area">
        {selectedUser && <QuestionsArea user={selectedUser} />}
      </div>
    </FeedBackDisplayWrapper>
  );
};

export default FeedBackDisplay;
