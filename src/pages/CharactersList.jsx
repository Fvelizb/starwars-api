import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchCharacter } from '../services/swapiService';
import { FavoritesContext } from '../context/FavoritesContext';

const CharactersList = () => {
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacter();
      setCharacters(data);
    };
    fetchData();
  }, []);

  const getImageId = (url) => {
    const id = url.split('/').filter(Boolean).pop();
    return id;
  };

  const getCharacterImageUrl = (id) => {
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  };

  const handleToggleFavorite = (character) => {
    if (isFavorite(character)) {
      removeFromFavorites(character);
    } else {
      addToFavorites(character);
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Personajes</h1>
      <Row className="mt-4">
        {characters.map((character) => (
          <Col key={character.url} xs={12} sm={6} md={4} lg={3} className="card-container">
            <Card className="mb-3">
              {}
              <Card.Img
                variant="top"
                src={getCharacterImageUrl(getImageId(character.url))}
                alt={character.name}
              />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                  <strong>Genero:</strong> {character.gender}<br />
                  <strong>Altura:</strong> {character.height}<br />
                  <strong>Peso:</strong> {character.mass} kgs.
                </Card.Text>
                <Link to={`/characters/${getImageId(character.url)}`} className="btn btn-primary">
                  Detalles
                </Link>
                <Button
                  variant={isFavorite(character) ? 'danger' : 'outline-danger'}
                  className="ml-2"
                  onClick={() => handleToggleFavorite(character)}
                >
                  {isFavorite(character) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CharactersList;
