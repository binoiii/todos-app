import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      as="span"
      role="status"
      animation="grow"
      variant="primary"
      size="sm"
    />
  );
};

export default Loader;
