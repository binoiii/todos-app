import React, { useContext, useEffect } from "react";
import Todo from "./Todo";
import LoaderPrimary from "./LoaderPrimary";
import { Container } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";

const Todos = () => {
  const {
    todos,
    getTodos,
    loadingStatuses,
    loadLocalCredentials,
    credentials,
  } = useContext(GlobalContext);

  useEffect(() => {
    const localCredentials = localStorage.getItem("credentials");
    loadLocalCredentials(JSON.parse(localCredentials));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (credentials._id) getTodos();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  return (
    <Container className="mb-4">
      {(loadingStatuses.get && (
        <div className="d-block text-center">
          <LoaderPrimary />
        </div>
      )) ||
        todos.map((todos) => <Todo key={todos._id} todos={todos} />)}
    </Container>
  );
};

export default Todos;
