import React, { useContext } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Power } from "react-bootstrap-icons";
import { withRouter } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Navigation = ({ history }) => {
  const { logoutUser } = useContext(GlobalContext);

  const handleLogOut = () => {
    localStorage.clear();
    history.push("/login");
    logoutUser();
  };

  return (
    <Container className="my-4">
      <Navbar
        bg="primary"
        variant="dark"
        className="d-flex justify-content-between border border-primary rounded"
      >
        <Navbar.Brand className="d-flex flex-column">
          <p className="my-0" style={{ fontSize: "2rem" }}>
            T O D O{" "}
          </p>
          <em
            className="text-light"
            style={{
              fontSize: ".7rem",
              marginTop: "-8px",
              marginBottom: "8px",
            }}
          >
            You get what you work for ...
          </em>
        </Navbar.Brand>
        <Button variant="link" onClick={handleLogOut}>
          <Power color="white" size="20" />
        </Button>
      </Navbar>
    </Container>
  );
};

export default withRouter(Navigation);
