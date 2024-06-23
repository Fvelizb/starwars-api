import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  const getImageId = (url) => {
    const id = url.split('/').filter(Boolean).pop();
    return id;
  };

  const getEntityImageUrl = (url) => {
    const entityType = url.split('/')[4]; 
    const id = getImageId(url);

    
    let imageUrl = `https://starwars-visualguide.com/assets/img/`;

    if (entityType === 'people') {
      imageUrl += `characters/${id}.jpg`;
    } else if (entityType === 'vehicles') {
      imageUrl += `vehicles/${id}.jpg`;
    } else if (entityType === 'planets') {
      imageUrl += `planets/${id}.jpg`;
    }

    return imageUrl;
  };

  const getEntityLink = (url) => {
    const entityType = url.split('/')[4]; 
    const id = getImageId(url);

    
    let entityLink = '';

    if (entityType === 'people') {
      entityLink = `/characters/${id}`;
    } else if (entityType === 'vehicles') {
      entityLink = `/vehicles/${id}`;
    } else if (entityType === 'planets') {
      entityLink = `/planets/${id}`;
    }

    return entityLink;
  };

  const renderFavorites = () => {
    if (favorites.length === 0) {
      return (
        <Col>
          <p>Aún no tienes favoritos.</p>
        </Col>
      );
    }

    return favorites.map((item) => (
      <Col key={item.url} xs={12} sm={6} md={4} lg={3} className="card-container">
        <Card className="mb-3">
          <Link to={getEntityLink(item.url)}>
            <Card.Img
              variant="top"
              src={getEntityImageUrl(item.url)}
              alt={item.name}
            />
          </Link>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Button variant="danger" onClick={() => removeFromFavorites(item)}>
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Container>
      <h1 className="mt-4">Favoritos</h1>
      <Row className="mt-4">
        {renderFavorites()}
      </Row>
    </Container>
  );
};

export default FavoritesPage;

