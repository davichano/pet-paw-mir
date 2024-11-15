import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

const ContinueButton = ({onClick, redirectPath = '/post'}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(redirectPath);
  };

  return (
    <button
      className="bg-[#FF797D] text-white py-3 px-8 rounded-lg mt-4 w-full"
      onClick={handleClick}
    >
      Guardar
    </button>
  );
};

ContinueButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  redirectPath: PropTypes.string,
};

export default ContinueButton;
