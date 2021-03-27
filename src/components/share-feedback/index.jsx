import styled from "styled-components";
import { useEffect, useState, useCallback, createContext } from "react";
import { getUsers } from "../../services/users";
import Spinner from "../spinner";
import ErrorPage from "../error-page";
import Form from "./form";
import { getQuestions } from "../../services/questions";
import HomePage from "./homepage";
import { errorObj } from "../../util/constants";
import FeedBackCompleted from "./feedback-completed";

const ShareFeedBackPageWrapper = styled.div`
  width: 600px;
  height: 60vh;
  margin: 10vh auto;

  header {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const ShareFeedBackContext = createContext(null);

const ShareFeedBackPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [questions, setQuestions] = useState();
  const [isFinished, setIsFinished] = useState(false);
  const [usersFilledFor, setUsersFilledFor] = useState({});

  const addUserFilledFor = (id) => {
    setUsersFilledFor((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

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
    setIsFinished(false);
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
    <ShareFeedBackContext.Provider
      value={{
        usersFilledFor,
        addUserFilledFor,
        users,
        handleClickFill,
        setIsFinished,
      }}
    >
      <ShareFeedBackPageWrapper>
        {isFinished ? (
          <FeedBackCompleted />
        ) : selectedUser ? (
          <Form questions={questions} user={selectedUser} />
        ) : (
          <HomePage users={users} handleClickFill={handleClickFill} />
        )}
      </ShareFeedBackPageWrapper>
    </ShareFeedBackContext.Provider>
  );
};
export default ShareFeedBackPage;
