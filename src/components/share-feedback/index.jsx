import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { getUsers } from "../../services/users";
import Spinner from "../spinner";
import ErrorPage from "../error-page";

const ShareFeedBackPageWrapper = styled.div`
  width: 600px;
  height: 60vh;
  margin: 10vh auto;

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

      .feedback-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
      }

      .profile-image {
        border-radius: 50%;
        margin-right: 20px;
      }

      .user-profile-area {
        display: flex;
        align-items: center;
      }

      button {
        cursor: pointer;
        padding: 5px 10px;
      }
    }
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
        {users.map(({ avatar, firstName, lastName }) => (
          <div className="feedback-item">
            <div className="user-profile-area">
              <img
                width={58}
                height={58}
                src={avatar}
                alt={`${firstName}-profile`}
                className="profile-image"
              />
              <span>
                {firstName} {lastName}
              </span>
            </div>
            <button>Fill</button>
          </div>
        ))}
      </div>
    </ShareFeedBackPageWrapper>
  );
};
export default ShareFeedBackPage;
