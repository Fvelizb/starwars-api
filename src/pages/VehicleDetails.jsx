import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner } from 'react-bootstrap';
import { fetchVehicle } from '../services/swapiService';

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVehicle(id);
      setVehicle(data);
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
      <h1 className="mt-4">{vehicle.name} Details</h1>
      <Card className="mt-4">
        <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`} alt={vehicle.name} />
        <Card.Body>
          <Card.Title>{vehicle.name}</Card.Title>
          <Card.Text>
            <strong>Model:</strong> {vehicle.model}<br />
            <strong>Manufacturer:</strong> {vehicle.manufacturer}<br />
            <strong>Vehicle Class:</strong> {vehicle.vehicle_class}<br />
            <strong>Cost in Credits:</strong> {vehicle.cost_in_credits}<br />
            <strong>Length:</strong> {vehicle.length} meters<br />
            <strong>Max Atmosphering Speed:</strong> {vehicle.max_atmosphering_speed} km/h<br />
            <strong>Crew:</strong> {vehicle.crew}<br />
            <strong>Passengers:</strong> {vehicle.passengers}<br />
            <strong>Cargo Capacity:</strong> {vehicle.cargo_capacity} kg<br />
            <strong>Consumables:</strong> {vehicle.consumables}<br />
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VehicleDetails;
