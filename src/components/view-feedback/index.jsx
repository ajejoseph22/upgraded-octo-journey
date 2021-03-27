import styled from "styled-components";
import { feedbackKey } from "../../util/constants";
import NoFeedback from "./no-feedback";
import FeedBackDisplay from "./feedback-display";
import { useContext } from "react";
import { AppContext } from "../../App";

const ViewFeedBackPageWrapper = styled.div`
  padding: 50px 0;
`;

const ViewFeedBackPage = () => {
  const storedFeedback = localStorage.getItem(feedbackKey);
  const { users } = useContext(AppContext);

  const isThereFeedBack =
    storedFeedback &&
    users.some((user) =>
      Object.keys(JSON.parse(storedFeedback)).includes(user.id)
    );

  return (
    <ViewFeedBackPageWrapper>
      {isThereFeedBack ? <FeedBackDisplay /> : <NoFeedback />}
    </ViewFeedBackPageWrapper>
  );
};
export default ViewFeedBackPage;
