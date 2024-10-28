import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <header className="bg-custom-50 text-custom-350 p-4 flex justify-between items-center border-b-custom-200 border-b-2">
      <button className="text-custom-50">
        {/* Ícono de menú para móvil */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="40"
          height="40"
          fill="none"
          stroke="#FF4146"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M70 20 L30 50 L70 80" />
        </svg>
      </button>
        <h1 className="text-xl m-auto">{title}</h1>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
