import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    console.log(formData);
    // Navegar a la siguiente página si la validación es exitosa
    navigate('/description');
  };
  return(
    <>
      <div className="h-screen bg-custom-50 flex flex-col items-center justify-center">
        <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">

          <h2 className="register__title text-custom-250 p-4 font-semibold text-3xl p-8">
            Inicia sesión
          </h2>
          <form
            className="register__form flex flex-col items-center w-full"
            onSubmit={handleSubmit}
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
            {error && <p className="error text-custom-50">{error}</p>}
            <button
              className="register__button bg-custom-250 w-full p-2 mb-4 mt-4 border-2 border-custom-250 rounded-xl text-custom-50 shadow-lg shadow-custom-300"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="register__footer flex text-custom-50">
            <p>

              <a href="/todo" className="pl-1 text-custom-300 font-semibold">
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          </div>
          <button onClick={()=>{
            navigate('/signup');
          }} className="login__register-button bg-custom-150 w-full p-2 mb-4 mt-4 border-2 border-custom-50 rounded-xl text-custom-300 font-semibold shadow-md shadow-custom-50 mt-auto">

            Crear nueva cuenta
          </button>
          <div className="login__footer flex mt-8 text-custom-200 font-bold">
            <p>
              Pet Paws
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
