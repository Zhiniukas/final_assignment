import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { MainRouter } from "./components/MainRouter";

export let authenticated = false;

const App: React.FC = () => {
  return <MainRouter />;
};

export default App;
