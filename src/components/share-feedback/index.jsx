import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { getUsers } from "../../services/users";
import Spinner from "../spinner";
import ErrorPage from "../error-page";
import Form from "./form";
import { getQuestions } from "../../services/questions";
import HomePage from "./homepage";
import { errorObj } from "../../util/constants";

const ShareFeedBackPageWrapper = styled.div`
  width: 600px;
  height: 60vh;
  margin: 10vh auto;

  header {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ShareFeedBackPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [questions, setQuestions] = useState();

  const resetLoadingAndErrorState = () => {
    setError(null);
    setisLoading(true);
  };

  const fetchUsersAndSetState = useCallback(async () => {
    try {
      resetLoadingAndErrorState();

      const userData = await getUsers();
      setUsers(userData);
    } catch (e) {
      setError(errorObj.getUsers);
    } finally {
      setisLoading(false);
    }
  }, []);

  const fetchQuestionsAndSetState = async () => {
    try {
      resetLoadingAndErrorState();

      const questionsData = await getQuestions();
      setQuestions(questionsData);
    } catch (e) {
      setError(errorObj.getQuestions);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUsersAndSetState();
    })();
  }, [fetchUsersAndSetState]);

  const handleClickFill = async (user) => {
    // check if questions are loaded
    if (!questions) {
      await fetchQuestionsAndSetState();
    }

    setSelectedUser(user);
  };

  if (isLoading) return <Spinner color="#000" />;

  if (error)
    return (
      <ErrorPage
        retryFunction={
          error === errorObj.getUsers
            ? fetchUsersAndSetState
            : fetchQuestionsAndSetState
        }
        message={error}
        color="#000"
      />
    );

  return (
    <ShareFeedBackPageWrapper>
      {selectedUser ? (
        <Form questions={questions} user={selectedUser} />
      ) : (
        <HomePage users={users} handleClickFill={handleClickFill} />
      )}
    </ShareFeedBackPageWrapper>
  );
};
export default ShareFeedBackPage;
