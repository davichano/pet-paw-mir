import PropTypes from "prop-types";

const SignUpStep2 = ({ nextStep, handleChange, values }) => {
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
            Ingresa con el género con el que te identificas
          </p>
          <form
            className="register__form flex flex-col items-center w-full"
            onSubmit={(e) => {
              e.preventDefault();
              nextStep(4);
            }}
          >

            <label className="border-2 border-2 bg-custom-50 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250 flex items-center justify-between">
              <span className="register__input">Mujer</span>
              <input
                type="radio"
                name="gender"
                value="Mujer"
                checked={values.gender === "Mujer"}
                onChange={handleChange}
                required
              />
            </label>
            <label className="border-2 border-2 bg-custom-50 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250 flex items-center justify-between">
              <span className="register__input">Hombre</span>
              <input
                type="radio"
                name="gender"
                value="Hombre"
                checked={values.gender === "Hombre"}
                onChange={handleChange}
                required
              />
            </label>
            <label className="border-2 border-2 bg-custom-50 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250 flex items-center justify-between">
              <span className="register__input">Otro</span>
              <input
                type="radio"
                name="gender"
                value="Otro"
                checked={values.gender === "Otro"}
                onChange={handleChange}
                required
              />
            </label>


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
