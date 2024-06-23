import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner } from 'react-bootstrap';
import { fetchCharacterDetail } from '../services/swapiService';
import './characterDetails.css'; 

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacterDetail(id);
      setCharacter(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center character-details-container">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="character-details-container">
      <Card className="character-details-card">
        <Card.Img
          variant="top"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt={character.name}
        />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>
            <strong>Genero:</strong> {character.gender}<br />
            <strong>Altura:</strong> {character.height} cms<br />
            <strong>Peso:</strong> {character.mass} kgs.<br />
            <strong>Color de pelo:</strong> {character.hair_color}<br />
            <strong>Color de piel:</strong> {character.skin_color}<br />
            <strong>Color de ojos:</strong> {character.eye_color}<br />
            <strong>Año de nacimiento:</strong> {character.birth_year}<br />
            <strong>Planeta natal:</strong> {character.homeworld.name}<br />
            <strong>Peliculas:</strong>
            <ul>
              {character.films.map(film => (
                <li key={film.url}>{film.title}</li>
              ))}
            </ul>
            <strong>Vehicles:</strong>
            <ul>
              {character.vehicles.map(vehicle => (
                <li key={vehicle.url}>{vehicle.name}</li>
              ))}
            </ul>
            <strong>Starships:</strong>
            <ul>
              {character.starships.map(starship => (
                <li key={starship.url}>{starship.name}</li>
              ))}
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CharacterDetail;
