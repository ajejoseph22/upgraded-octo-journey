import "./App.css";
import NavBar from "./components/navbar";
import { Route } from "react-router-dom";
import ShareFeedBackPage from "./components/share-feedback";

function App() {
  return (
    <div>
      <NavBar />
      <Route path="/share-feedback" render={() => <ShareFeedBackPage />} />
    </div>
  );
}

export default App;
