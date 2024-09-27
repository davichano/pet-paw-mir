import { useState } from "react";
import PropTypes from "prop-types";

const SignUpStep6 = ({ nextStep}) => {
  const [code, setCode] = useState("");

  return (
    <div>
      <h2 className="register__title">Ingresa el código de confirmación</h2>
      <p className="register__subtitle">Para confirma la cuenta ingresa el código que te envíamos</p>
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
          name="code"
          value={code}
          onChange={(e)=>{
            setCode(e.target.value);
          }}
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

SignUpStep6.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default SignUpStep6;

