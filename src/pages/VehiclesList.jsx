import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchVehicles } from '../services/swapiService';
import { FavoritesContext } from '../context/FavoritesContext';

const VehiclesList = () => {
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVehicles();
      setVehicles(data);
    };
    fetchData();
  }, []);

  const getImageId = (url) => {
    const id = url.split('/').filter(Boolean).pop();
    return id;
  };

  const getVehicleImageUrl = (id) => {
    return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
  };

  const handleToggleFavorite = (vehicle) => {
    if (isFavorite(vehicle)) {
      removeFromFavorites(vehicle);
    } else {
      addToFavorites(vehicle);
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Naves</h1>
      <Row className="mt-4">
        {vehicles.map((vehicle) => (
          <Col key={vehicle.url} xs={12} sm={6} md={4} lg={3} className="card-container">
            <Card className="mb-3">
              <Card.Img
                variant="top"
                src={getVehicleImageUrl(getImageId(vehicle.url))}
                alt={vehicle.name}
              />
              <Card.Body>
                <Card.Title>{vehicle.name}</Card.Title>
                <Card.Text>
                  <strong>Modelo:</strong> {vehicle.model}<br />
                  <strong>Fabricante:</strong> {vehicle.manufacturer}<br />
                  <strong>Clase:</strong> {vehicle.vehicle_class}
                </Card.Text>
                <Link to={`/vehicles/${getImageId(vehicle.url)}`} className="btn btn-primary">
                  Detalles
                </Link>
                <Button
                  variant={isFavorite(vehicle) ? 'danger' : 'outline-danger'}
                  className="ml-2"
                  onClick={() => handleToggleFavorite(vehicle)}
                >
                  {isFavorite(vehicle) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VehiclesList;
