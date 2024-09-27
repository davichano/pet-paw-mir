import PropTypes from "prop-types";

const SignUpStep5_1 = ({ nextStep, handleChange, values }) => {
  return (
    <>
      {" "}
      <div>
        <p className="register__subtitle">Ingresa tu correo electrónico </p>
        <form
          className="register__form flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            nextStep();
          }}
        >
          <input
            type="email"
            className="register__input"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <div className="register__button">
            <button type="submit">Siguiente</button>
          </div>
        </form>
        <button
          className="register__button-numerPhone"
          onClick={() => {
            nextStep();
          }}
        >
          Registrarse con número celular
        </button>
        <div className="register__footer">
          <p>¿Ya tienes una cuenta?</p>
          <a href="/login">Inicia sesión</a>
        </div>
      </div>
      <div className="h-screen bg-custom-200 flex flex-col items-center justify-center">
        <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">
          <div className="w-full flex justify-end">
            <p className="register__close text-custom-50">X</p>
          </div>
          <h2 className="register__title text-custom-50 p-4 font-semibold text-3xl">
            Crea tu perfil
          </h2>
          <p className="register__subtitle text-custom-50 p-4 font-normal text-base pl-0">
            Ingresa tu correo electrónico
          </p>
          <form
            className="register__form flex flex-col items-center w-full"
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
          >
            <input
              type="email"
              className="register__input"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
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

SignUpStep5_1.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default SignUpStep5_1;
