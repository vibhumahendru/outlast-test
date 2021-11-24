import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import BookDetail from "./components/BookDetail";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/book-detail/:id" component={BookDetail}></Route>
      </Switch>
    </Router>
  );
}

export default App;
