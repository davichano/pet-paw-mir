import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SignUpStep6 = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateCode = (code) => {
    const codePattern = /^\d{6}$/;
    return codePattern.test(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCode(code)) {
      setError("El código debe ser de 6 dígitos.");
      return;
    }
    navigate('/login');
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
            Para confirma la cuenta ingresa el código que te envíamos
          </p>
          <form
            className="register__form flex flex-col items-center w-full"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="register__input border-2 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250"
              name="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              required
              placeholder="Código de confirmación"
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

SignUpStep6.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default SignUpStep6;
