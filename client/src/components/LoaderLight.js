import React from "react";
import { Spinner } from "react-bootstrap";

const LoaderLogin = () => {
  return (
    <Spinner
      as="span"
      role="status"
      animation="grow"
      variant="light"
      size="sm"
    />
  );
};

export default LoaderLogin;
