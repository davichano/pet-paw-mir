import { useState } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from './ConfigContext';

export const ConfigProvider = ({ children }) => {
  const [selectedSection, setSelectedSection] = useState('settings.user.edit');

  return (
    <ConfigContext.Provider value={{ selectedSection, setSelectedSection }}>
      {children}
    </ConfigContext.Provider>
  );
};

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
