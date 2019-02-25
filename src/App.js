import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyFavCollections from "./containers/my-fav-collections";

import Menu from "./components/menu";
import "./App.css"

const App = () => {
  return (
    <Router>
      <div className="my-fav-collection">
        <div className="links">

          {/* The application header */}
          <Menu />
        </div>

        {/* Depending upon the path, it will show either books, movies, games or foods collection */}
        <div className="content">
          <Route exact path="/" component={MyFavCollections} />
          <Route exact path="/movies" component={MyFavCollections} />
          <Route exact path="/games" component={MyFavCollections} />
          <Route exact path="/foods" component={MyFavCollections} />
        </div>
      </div>
    </Router>
  )
}
export default App;
