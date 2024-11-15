import {createContext, useState} from 'react';
import PropTypes from 'prop-types';
import {formatData} from '../../helpers/formatPostData';

// eslint-disable-next-line react-refresh/only-export-components
export const PetContext = createContext();

export const PetProvider = ({children, initialData = null}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [petData, setPetData] = useState(initialData ? initialData : formatData(user));

  return (
    <PetContext.Provider value={{petData, setPetData}}>
      {children}
    </PetContext.Provider>
  );
};

PetProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  initialData: PropTypes.object,
};

