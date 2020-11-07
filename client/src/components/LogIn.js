import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import LoaderLight from "./LoaderLight";

const Login = ({ history }) => {
  const {
    loginUser,
    setLoadingStatus,
    loadingStatuses,
    credentials,
    clearErrorMessage,
    errorMessage,
  } = useContext(GlobalContext);

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

    if (name === "email") return setEmail(value);
    if (name === "password") return setPassword(value);
  };

  const handleClearErrorMessage = () => {
    if (errorMessage) return clearErrorMessage();
  };

  const handleLoginUser = (e) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };
    setLoadingStatus({ logIn: true });
    loginUser(credentials);
  };

  return (
    <div style={{ height: "100vh", background: "#f0f0f0" }}>
      <Container className="h-100 pt-4 pt-5">
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
              Celebrate small wins one at a time.
            </h4>
            <h5
              className="d-block d-sm-block d-md-none font-weight-normal"
              style={{ letterSpacing: ".1rem" }}
            >
              Celebrate small wins one at a time.
            </h5>
          </Col>

          <Col sm={12} md={6} className="pt-5 px-lg-5">
            <Card style={{ paddingTop: "1rem" }}>
              <Card.Body>
                <Form onSubmit={handleLoginUser}>
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
                    variant="primary rounded"
                    className="w-100 mb-3"
                    type="submit"
                    onClick={handleClearErrorMessage}
                  >
                    {loadingStatuses.logIn ? <LoaderLight /> : "Log in"}
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
                    to="/register"
                    style={{ color: "#ffffff", textDecoration: "none" }}
                  >
                    <Button
                      variant="warning rounded"
                      className="w-100"
                      onClick={handleClearErrorMessage}
                    >
                      Register
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

export default Login;
