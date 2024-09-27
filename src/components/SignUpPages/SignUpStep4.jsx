import PropTypes from "prop-types";
import { useState } from "react";

const SignUpStep2 = ({ nextStep, handleChange, values }) => {
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasLetter = /[a-zA-Z]/;
    const hasNumber = /[0-9]/;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;

    return minLength.test(password) && hasLetter.test(password) && hasNumber.test(password) && hasSymbol.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(values.password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una letra, un número y un símbolo.");
      return;
    }
    nextStep(5);
  };
  return (
    <>
      <div className="h-screen bg-custom-200 flex flex-col items-center justify-center">
        <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">
          <div className="w-full flex justify-end">
            <p className="register__close text-custom-50">X</p>
          </div>
          <h2 className="register__title text-custom-50 p-4 font-semibold text-3xl">
            Crea tu perfil
          </h2>
          <p className="register__subtitle text-custom-50 p-4 font-normal text-base pl-0">
            Ingresa un nombre de usuario y contraseña
          </p>
          <form
            className="register__form flex flex-col items-center w-full"
            onSubmit={handleSubmit}
          >
            <input
              className="register__input border-2 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250"
              type="text"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              required
              placeholder="Nombre de usuario"
            />
            <input
              className="register__input border-2 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
              placeholder="Contraseña"
            />
            {error && <p className="error text-custom-50">{error}</p>}

            <button
              className="register__button bg-custom-250 w-full p-2 mb-4 mt-4 border-2 border-custom-250 rounded-xl text-custom-50 shadow-lg shadow-custom-300"
              type="submit"
            >
              Siguiente
            </button>
          </form>

          <div className="register__footer flex mt-auto text-custom-50">
            <p>
              ¿Ya tienes una cuenta?
              <a href="/login" className="pl-1 text-custom-300 font-semibold">
                INGRESAR
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

SignUpStep2.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default SignUpStep2;
