import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <h1 className="mt-4">Star Wars Database</h1>
      <Row className="mt-4">
        <Col xs={12} sm={6} md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Personajes</Card.Title>
              <Card.Text>Una lista de todos los personajes de Star Wars.</Card.Text>
              <Link to="/characters" className="btn btn-primary">Explorar</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Naves</Card.Title>
              <Card.Text>Una lista de todas las naves del universo de Star Wars.</Card.Text>
              <Link to="/vehicles" className="btn btn-primary">Explorar</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Planetas</Card.Title>
              <Card.Text>Aprende sobre todos los planetas del universo de Star Wars.</Card.Text>
              <Link to="/planets" className="btn btn-primary">Explorar</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
