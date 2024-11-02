import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Crear el contexto
const PetContext = createContext();

// Proveedor del contexto
export const PetProvider = ({ children }) => {
  const [petData, setPetData] = useState(() => {
    const savedData = localStorage.getItem('petData');
    const user = JSON.parse(localStorage.getItem('user'));
    return savedData ?
    JSON.parse(savedData) : {
      title: 'Prueba de mi primer post',
      description: '',
      tags: 'Mi primer tags',
      location: 'Mi casa',
      state: 'LOST',
      userId: user.id,
      petData: {
        name: ' ',
        petType: '',
        gender: '',
        age: '',
        size: '',
        state: '',
        imageUrl: '',
        validated: true
      },
      sightingData: {
        latitude: 0,
        longitude: 0
      }
    };

  });

  useEffect(() => {
    localStorage.setItem('petData', JSON.stringify(petData));
  }, [petData]);

  return (
    <PetContext.Provider value={{ petData, setPetData }}>
      {children}
    </PetContext.Provider>
  );

};

PetProvider.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
};

// Hook para usar el contexto
export const usePetData = () => useContext(PetContext);

