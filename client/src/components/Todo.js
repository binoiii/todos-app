import React, { useContext, useState, useRef } from "react";
import WarningModal from "./WarningModal";
import LoaderCompleted from "./LoaderCompleted";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Check } from "react-bootstrap-icons";
import { GlobalContext } from "../context/GlobalState";

const Todo = ({ todos: { _id, todo } }) => {
  const {
    completeTodo,
    editTodo,
    loadingStatuses,
    setLoadingStatus,
  } = useContext(GlobalContext);

  const [show, setShow] = useState(false);
  const [newTodo, setNewTodo] = useState(todo);
  const [prevTodo, setPrevTodo] = useState(newTodo);
  const [selected, setSelected] = useState(false);

  const todoRef = useRef(null);

  const handleCancel = () => {
    setSelected(false);
    setShow(false);
  };

  const handleShow = () => {
    setSelected(true);
    setShow(true);
  };

  const handleChange = (e) => setNewTodo(e.target.value);

  // const handleClick = () => {
  //   todoRef.current.focus();
  //   todoRef.current.select();
  // };

  const handleUpdate = (e) => {
    const key = e.key || e.keyCode;
    const type = e.type;

    const updatedTodo = {
      id: _id,
      todo: newTodo,
    };

    if (
      key === 13 ||
      key === "Enter" ||
      key === 27 ||
      key === "Escape" ||
      (type === "blur" && prevTodo !== newTodo)
    ) {
      todoRef.current.blur();
      editTodo(updatedTodo);
      setPrevTodo(newTodo);
    }
  };

  const handleComplete = () => {
    setLoadingStatus({ complete: true });
    setShow(false);
    completeTodo(_id);
  };

  return (
    <InputGroup className="mb-1">
      <InputGroup.Prepend>
        <Button variant="outline-warning rounded-left" onClick={handleShow}>
          <div style={{ width: "21px" }}>
            {(loadingStatuses.complete && selected && <LoaderCompleted />) || (
              <Check size="20" />
            )}
          </div>
        </Button>
      </InputGroup.Prepend>

      <FormControl
        value={newTodo}
        aria-describedby="basic-addon2"
        className="border-secondary border-left-0 bg-white"
        onChange={handleChange}
        // onClick={handleClick}
        onBlur={handleUpdate}
        onKeyDown={handleUpdate}
        ref={todoRef}
      />

      <WarningModal
        handleComplete={handleComplete}
        handleCancel={handleCancel}
        show={show}
        todo={todo}
      />
    </InputGroup>
  );
};

export default Todo;
