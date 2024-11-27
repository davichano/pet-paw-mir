import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

// Función para obtener el estado inicial
const getInitialState = () => {
  const currentUser = sessionStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(getInitialState);

  useEffect(() => {
    sessionStorage.setItem('currentUser', JSON.stringify(data));
  }, [data]);

  const updateUser = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  const login = (user) => {
    console.log('login: ', user.name);
  };

  const logout = () => {
    setData(null);
  };

  return (
    <UserContext.Provider value={{ data, setData, updateUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
