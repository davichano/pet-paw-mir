// StepProvider.jsx
import { useState } from 'react';
import { StepContext } from './StepContext';
import PropTypes from 'prop-types';

const StepProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  const nextStep = (stepNumber) => {
    if (stepNumber) {
      setStep(stepNumber);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <StepContext.Provider value={{ step, nextStep, prevStep }}>
      {children}
    </StepContext.Provider>
  );
};

StepProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StepProvider };
