import React from "react";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { GlobalProvider } from "./context/GlobalState";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <AddTodo />
        <Todos />
      </div>
    </GlobalProvider>
  );
}

export default App;
