import React, { useEffect, useState } from "react";
import { app } from "./base.js";

import { Album } from "./Album.js";
import { Home } from "./Home.js";
import "./App.css";
import { Route, Switch } from "react-router-dom";

const db = app.firestore();

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const unmount = db.collection("albums").onSnapshot((snapshot) => {
      const tempAlbums = [];
      snapshot.forEach((doc) => {
        tempAlbums.push({ ...doc.data(), id: doc.id });
      });
      setAlbums(tempAlbums);
    });
    return unmount;
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Home albums={albums} />}></Route>
        <Route path="/:album" component={Album}></Route>
      </Switch>
    </>
  );
}

export default App;
