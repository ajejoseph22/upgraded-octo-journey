import styled from "styled-components";
import {
  useEffect,
  useState,
  useCallback,
  useContext,
  createContext,
} from "react";
import { getUsers } from "../../services/users";
import Spinner from "../spinner";
import ErrorPage from "../error-page";
import Form from "./form";
import { getQuestions } from "../../services/questions";
import HomePage from "./homepage";
import { errorObj } from "../../util/constants";
import FeedBackCompleted from "./feedback-completed";
import { AppContext } from "../../App";

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
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [isFinished, setIsFinished] = useState(false);

  const { users, setUsers, questions, setQuestions, feedback } = useContext(AppContext);

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
  }, [setUsers]);

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

  const usersFilledFor = Object.keys(feedback);

  const usersNotFilledFor = users.filter(
      (user) => !usersFilledFor.includes(user.id)
  );

  return (
    <ShareFeedBackContext.Provider
      value={{
        handleClickFill,
        setIsFinished,
        setSelectedUser,
      }}
    >
      <ShareFeedBackPageWrapper>
        {isFinished ? (
          <FeedBackCompleted />
        ) : selectedUser ? (
          <Form user={selectedUser} />
        ) : (
          <HomePage users={usersNotFilledFor} handleClickFill={handleClickFill} />
        )}
      </ShareFeedBackPageWrapper>
    </ShareFeedBackContext.Provider>
  );
};
export default ShareFeedBackPage;
