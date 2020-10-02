import React from "react";
import { Spinner } from "react-bootstrap";

const LoaderPrimary = () => {
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

export default LoaderPrimary;
