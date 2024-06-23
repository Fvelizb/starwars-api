import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { fetchPlanet } from '../services/swapiService'; 

const PlanetDetail = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlanet(id);
      setPlanet(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <Card.Body>
              <Card.Title>{planet.name}</Card.Title>
              <Card.Text>
                <strong>Climate:</strong> {planet.climate}<br />
                <strong>Terrain:</strong> {planet.terrain}<br />
                <strong>Population:</strong> {planet.population}<br />
                <strong>Diameter:</strong> {planet.diameter} km<br />
                <strong>Gravity:</strong> {planet.gravity}<br />
                <strong>Orbital Period:</strong> {planet.orbital_period} days<br />
                <strong>Rotation Period:</strong> {planet.rotation_period} hours<br />
                <strong>Surface Water:</strong> {planet.surface_water}%
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanetDetail;
