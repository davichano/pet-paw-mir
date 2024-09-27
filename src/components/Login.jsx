import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return(
    <>
      <div className="h-screen bg-custom-200 flex flex-col items-center justify-center">
        <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">

          <h2 className="register__title text-custom-50 p-4 font-semibold text-3xl">
            Inicia sesión
          </h2>
          <form
            className="register__form flex flex-col items-center w-full"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
            }}
          >
            <input
              type="text"
              className="register__input border-2 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              placeholder="Usuario o correo electrónico"
            />
            <input
              type="password"
              className="register__input border-2 border-custom-250 p-2 w-full mb-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Contraseña"
            />
            <button
              className="register__button bg-custom-250 w-full p-2 mb-4 mt-4 border-2 border-custom-250 rounded-xl text-custom-50 shadow-lg shadow-custom-300"
              type="submit"
            >
              Ingresar
            </button>
          </form>
          <div className="register__footer flex mt-auto text-custom-50">
            <p>
              ¿No tienes una cuenta?
              <a href="/signup" className="pl-1 text-custom-300 font-semibold">
                REGISTRATE
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
