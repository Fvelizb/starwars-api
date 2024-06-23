
  
  export const fetchCharacter = async () => {
    let characters = [];
    let url = 'https://swapi.dev/api/people/';
  
    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      characters = characters.concat(data.results);
      url = data.next; // La URL de la siguiente página, si existe
    }
  
    return characters;
  };


export const fetchVehicles = async () => {
  let vehicles = [];
  let url = 'https://swapi.dev/api/vehicles/';

  while (url) {
    const response = await fetch(url);
    const data = await response.json();
    vehicles = vehicles.concat(data.results);
    url = data.next; // La URL de la siguiente página, si existe
  }

  return vehicles;
};
// En tu archivo swapiService.js
export const fetchPlanets = async () => {
  let planets = [];
  let url = 'https://swapi.dev/api/planets/';

  while (url) {
    const response = await fetch(url);
    const data = await response.json();
    planets = planets.concat(data.results);
    url = data.next; // La URL de la siguiente página, si existe
  }

  return planets;
};

  
  // Si necesitas una función específica para obtener un solo planeta
  export const fetchPlanet = async (id) => {
    const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
    const data = await response.json();
    return data;
  };
  
  // export const fetchCharacterDetail = async (id) => {
  //   const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  //   const data = await response.json();
  //   return data;
  // };

  export const fetchCharacterDetail = async (id) => {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    const character = await response.json();
  
    // Fetch homeworld
    const homeworldResponse = await fetch(character.homeworld);
    character.homeworld = await homeworldResponse.json();
  
    // Fetch films
    character.films = await Promise.all(character.films.map(async (film) => {
      const response = await fetch(film);
      return response.json();
    }));
  
    // Fetch vehicles
    character.vehicles = await Promise.all(character.vehicles.map(async (vehicle) => {
      const response = await fetch(vehicle);
      return response.json();
    }));
  
    // Fetch starships
    character.starships = await Promise.all(character.starships.map(async (starship) => {
      const response = await fetch(starship);
      return response.json();
    }));
  
    return character;
  };

  // Función para obtener un solo vehículo
export const fetchVehicle = async (id) => {
    const response = await fetch(`https://swapi.dev/api/vehicles/${id}/`);
    const data = await response.json();
    return data;
  };