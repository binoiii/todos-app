import React, { useState, useContext, useRef } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { GlobalContext } from "../context/GlobalState";
import LoaderPrimary from "./LoaderPrimary";

const AddTodo = () => {
  const {
    addTodo,
    loadingStatuses,
    setLoadingStatus,
    credentials: { name },
  } = useContext(GlobalContext);

  const [todo, setTodo] = useState("");

  const [firstName] = name.split(" ");

  const inputRef = useRef(null);

  const handleChange = (e) => setTodo(e.target.value);

  const handleSelect = () => {
    inputRef.current.select();
  };

  const handleAddTodo = () => {
    if (todo) {
      setLoadingStatus({ add: true });
      addTodo(todo);
      setTodo("");
    }
  };

  const handleAddClick = () => handleAddTodo();

  const handleAddKeyDown = (e) => {
    const key = e.key || e.keyCode;

    if (key === 13 || key === "Enter") {
      handleAddTodo();
    }

    if (key === 27 || key === "Escape") {
      inputRef.current.blur();
    }
  };

  return (
    <Container>
      <InputGroup className="mb-4">
        <InputGroup.Prepend>
          <Button
            variant="outline-primary rounded-left"
            onClick={handleAddClick}
          >
            <div style={{ width: "21px" }}>
              {(loadingStatuses.add && <LoaderPrimary />) || <Plus size="20" />}
            </div>
          </Button>
        </InputGroup.Prepend>

        <FormControl
          placeholder={`${firstName}, what is your todo?`}
          aria-label="Todo task"
          aria-describedby="basic-addon2"
          className="border-secondary border-left-0"
          value={todo}
          onClick={handleSelect}
          onChange={handleChange}
          onKeyDown={handleAddKeyDown}
          ref={inputRef}
          autoFocus
        />
      </InputGroup>
    </Container>
  );
};

export default AddTodo;
