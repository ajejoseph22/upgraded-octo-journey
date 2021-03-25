import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { getUsers } from "../../services/users";
import Spinner from "../spinner";
import ErrorPage from "../error-page";

const ShareFeedBackPageWrapper = styled.div`
  width: 600px;
  height: 60vh;
  margin: 10vh auto;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  overflow-x: auto;

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
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const resetLoadingAndErrorState = () => {
    setHasError(false);
    setisLoading(true);
  };

  const fetchUsersAndSetState = useCallback(async () => {
    try {
      resetLoadingAndErrorState();

      const userData = await getUsers();
      setUsers(userData);

      console.log(userData);
    } catch (e) {
      setHasError(true);
    } finally {
      setisLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchUsersAndSetState();
    })();
  }, [fetchUsersAndSetState]);

  if (isLoading) return <Spinner color="#000" />;

  if (hasError)
    return (
      <ErrorPage
        retryFunction={fetchUsersAndSetState}
        message="An error occured while fetching users"
        color="#000"
      />
    );

  return (
    <ShareFeedBackPageWrapper>
      <div id="share-feedback-page_top-area">
        <header>Share Feedback</header>
        <span>Dropdown</span>
      </div>
      <div id="share-feedback-page_content">
        {users.map((user) => user.firstName)}
      </div>
    </ShareFeedBackPageWrapper>
  );
};
export default ShareFeedBackPage;
