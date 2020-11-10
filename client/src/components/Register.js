import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import LoaderLight from "./LoaderLight";

const Register = ({ history }) => {
  const {
    registerUser,
    setLoadingStatus,
    loadingStatuses,
    credentials,
    clearErrorMessage,
    errorMessage,
  } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (credentials.isAuthenticated) {
      localStorage.setItem("authenticated", true);
      localStorage.setItem("credentials", JSON.stringify(credentials));
      history.push("/");
    }
    // eslint-disable-next-line
  }, [credentials.isAuthenticated]);

  const margin = errorMessage ? "1rem" : "2.375rem";

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "name") return setName(value);
    if (name === "email") return setEmail(value);
    if (name === "password") return setPassword(value);
  };

  const handleClearErrorMessage = () => {
    if (errorMessage) return clearErrorMessage();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    setLoadingStatus({ register: true });
    registerUser(user);
  };

  return (
    <div style={{ height: "100vh", background: "#f0f0f0" }}>
      <Container className="h-100 pt-5" style={{ background: "#f0f0f0" }}>
        <Row className="mx-sm-3 mx-md-5 mt-md-5  px-md-5">
          <Col
            sm={12}
            md={6}
            className="pt-md-5 mt-md-5 px-lg-5 text-center text-md-left"
          >
            <p className="mb-0 display-4 text-primary font-weight-bold">
              T O D O
            </p>
            <h4
              className="d-none d-md-block font-weight-normal"
              style={{ letterSpacing: ".1rem" }}
            >
              Let's start celebrating small wins.
            </h4>
            <h5
              className="d-block d-sm-block d-md-none font-weight-normal"
              style={{ letterSpacing: ".1rem" }}
            >
              Let's start celebrating small wins.
            </h5>
          </Col>
          <Col sm={12} md={6} className="pt-5 px-lg-5">
            <Card style={{ paddingTop: "1rem" }}>
              <Card.Body>
                <Form onSubmit={handleRegister}>
                  <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      onClick={handleClearErrorMessage}
                      autoComplete="on"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      onClick={handleClearErrorMessage}
                      autoComplete="on"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      onClick={handleClearErrorMessage}
                      autoComplete="on"
                    />
                  </Form.Group>
                  <Button
                    variant="warning rounded"
                    className="w-100 mb-3"
                    type="submit"
                    onClick={handleClearErrorMessage}
                  >
                    {loadingStatuses.register ? <LoaderLight /> : "Register"}
                  </Button>
                  <Alert
                    className="text-center bg-white text-danger"
                    variant="light"
                    style={{ marginBottom: margin }}
                  >
                    {errorMessage}
                  </Alert>
                </Form>
                <Card.Footer
                  className="bg-white pb-3 px-0 text-center"
                  style={{ paddingTop: "2.25rem" }}
                >
                  <Link
                    to="/login"
                    style={{ color: "#ffffff", textDecoration: "none" }}
                  >
                    <Button
                      variant="primary rounded"
                      className="w-100"
                      onClick={handleClearErrorMessage}
                    >
                      Login
                    </Button>
                  </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
