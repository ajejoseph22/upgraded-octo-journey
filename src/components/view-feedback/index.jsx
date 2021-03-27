import styled from "styled-components";
import NoFeedback from "./no-feedback";
import FeedBackDisplay from "./feedback-display";
import { useContext } from "react";
import { AppContext } from "../../App";

const ViewFeedBackPageWrapper = styled.div`
  padding: 50px 0;
`;

const ViewFeedBackPage = () => {
  const { users, feedback } = useContext(AppContext);

  const isThereFeedBack = users.some((user) =>
    Object.keys(feedback).includes(user.id)
  );

  return (
    <ViewFeedBackPageWrapper>
      {isThereFeedBack ? <FeedBackDisplay /> : <NoFeedback />}
    </ViewFeedBackPageWrapper>
  );
};
export default ViewFeedBackPage;
