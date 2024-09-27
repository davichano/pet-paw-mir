import PropTypes from "prop-types";

const SignUpStep5_2 = ({ nextStep, handleChange, values }) => {
  return (
    <div>
      <p className="register__subtitle">Ingresa tu número de celular</p>
      <form
        className="register__form flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
      >
        <input
          type="text"
          className="register__input"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          required
        />
        <div className="register__button">
          <button type="submit">Siguiente</button>
        </div>
      </form>
      <div className="register__footer">
        <p>¿Ya tienes una cuenta?<a href="/login">Inicia sesión</a></p>
      </div>
    </div>
  );
};

SignUpStep5_2.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default SignUpStep5_2;

