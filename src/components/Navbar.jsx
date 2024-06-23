import React, { useContext } from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap'; // Importa Badge para mostrar el contador
import { NavLink } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

const NavbarComponent = () => {
  const { favorites } = useContext(FavoritesContext);
  const favoriteCount = favorites.length; // Obtener el número de favoritos desde el contexto

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/" exact>
        Star Wars APP
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/characters" exact>
            Personajes
          </Nav.Link>
          <Nav.Link as={NavLink} to="/vehicles" exact>
            Naves
          </Nav.Link>
          <Nav.Link as={NavLink} to="/planets" exact>
            Planetas
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={NavLink} to="/favorites">
            Favoritos{' '}
            {favoriteCount > 0 && <Badge pill variant="danger">{favoriteCount}</Badge>}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;

