import React from "react";
import { Spinner } from "react-bootstrap";

const LoaderCompleted = () => {
  return (
    <Spinner
      as="span"
      role="status"
      animation="grow"
      variant="warning"
      size="sm"
    />
  );
};

export default LoaderCompleted;
