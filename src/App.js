import "./App.css";
import NavBar from "./components/navbar";
import { Route } from "react-router-dom";
import ShareFeedBackPage from "./components/share-feedback";
import ViewFeedBackPage from "./components/view-feedback";

function App() {
  return (
    <div>
      <NavBar />
      <Route path="/share-feedback" render={() => <ShareFeedBackPage />} />
      <Route path="/my-feedback" render={() => <ViewFeedBackPage />} />
    </div>
  );
}

export default App;
