import "./App.css";
import NavBar from "./components/navbar";
import { Route } from "react-router-dom";
import ShareFeedBackPage from "./components/share-feedback";
import ViewFeedBackPage from "./components/view-feedback";
import { useState, createContext } from "react";
import { feedbackKey } from "./util/constants";
import useWindowUnloadEffect from "./hooks/useWindowUnload";

export const AppContext = createContext(null);

function App() {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState();

  useWindowUnloadEffect(() => localStorage.removeItem(feedbackKey), true);

  return (
    <AppContext.Provider value={{ users, setUsers, questions, setQuestions }}>
      <div>
        <NavBar />
        <Route path="/share-feedback" render={() => <ShareFeedBackPage />} />
        <Route path="/my-feedback" render={() => <ViewFeedBackPage />} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
