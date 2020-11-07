import React from "react";
import { Container } from "react-bootstrap";
import { CloudSlash } from "react-bootstrap-icons";

const NotFound = () => {
  return (
    <div
      className="d-flex align-items-center"
      style={{ height: "100vh", background: "#f0f0f0" }}
    >
      <Container className="d-flex flex-column align-items-center">
        <CloudSlash className="" color="#4582ec" size="250" />
        <p className="text-primary text-center display-4 font-weight-bold">
          404 - edit
        </p>
      </Container>
    </div>
  );
};

export default NotFound;
