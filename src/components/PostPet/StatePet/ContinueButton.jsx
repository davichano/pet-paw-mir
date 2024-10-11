import PropTypes from 'prop-types';

const ContinueButton = ({ onClick }) => {
  return (
    <button
      className="bg-[#FF797D] text-white py-3 px-8 rounded-lg mt-4 w-full"
      onClick={onClick}
    >
      Guardar
    </button>
  );
};

ContinueButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ContinueButton;
