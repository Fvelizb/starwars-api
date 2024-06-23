import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchPlanets } from '../services/swapiService';
import { FavoritesContext } from '../context/FavoritesContext';

const PlanetsList = () => {
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlanets();
      setPlanets(data);
    };
    fetchData();
  }, []);

  const getImageId = (url) => {
    const id = url.split('/').filter(Boolean).pop();
    return id;
  };

  const getPlanetImageUrl = (id) => {
    return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
  };

  const handleToggleFavorite = (planet) => {
    if (isFavorite(planet)) {
      removeFromFavorites(planet);
    } else {
      addToFavorites(planet);
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Planetas</h1>
      <Row className="mt-4">
        {planets.map((planet) => (
          <Col key={planet.url} xs={12} sm={6} md={4} lg={3} className="card-container">
            <Card className="mb-3">
              <Card.Img
                variant="top"
                src={getPlanetImageUrl(getImageId(planet.url))}
                alt={planet.name}
              />
              <Card.Body>
                <Card.Title>{planet.name}</Card.Title>
                <Card.Text>
                  <strong>Clima:</strong> {planet.climate}<br />
                  <strong>Tipo de terreno:</strong> {planet.terrain}<br />
                  <strong>Población:</strong> {planet.population}
                </Card.Text>
                <Link to={`/planets/${getImageId(planet.url)}`} className="btn btn-primary">
                  Detalles
                </Link>
                <Button
                  variant={isFavorite(planet) ? 'danger' : 'outline-danger'}
                  className="ml-2"
                  onClick={() => handleToggleFavorite(planet)}
                >
                  {isFavorite(planet) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PlanetsList;
