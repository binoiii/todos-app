import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Container>
      <Jumbotron className="bg-primary text-center  my-4">
        <Container>
          <p className="display-4 text-light">T O D O</p>
          <p className="text-light">
            <em>You get what you work for ...</em>
          </p>
        </Container>
      </Jumbotron>
    </Container>
  );
};

export default Header;
