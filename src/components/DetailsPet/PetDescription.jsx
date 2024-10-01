//import PetMap from "./PetMap";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PetDescription = ({ name, description, imageUrl}) => {
  const { t } = useTranslation();
  return (
    <>
  <div className="flex flex-col md:flex-row items-start p-3 bg-white rounded-lg">
    {/* Avatar */}
    <div className="w-12 h-12 bg-[#ffa4a4] rounded-full flex items-center justify-center mr-4">
      <img src="/src/assets/img/Icons/avatar_placeholder.svg" alt="avatar" className="w-8 h-8" />
    </div>

    <div className="flex-1">
      {/* Nombre y opciones */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-lg font-bold mr-2">{name}</h2>
          <button className="text-pink-500 font-semibold"> {t("followLabel")} </button>
        </div>
         {/*Contenido momentaneo, la hora de publicación*/}
        <span className="text-gray-500 text-sm">50 min</span>
        <button className="ml-2 text-gray-500">
          <img src="/src/assets/img/Icons/more_options.svg" alt="more" className="w-5 h-5" />
        </button>
      </div>

      {/* Descripción */}
      <p className="text-gray-700 text-sm mt-2">
        {description}
      </p>
    </div>
  </div>
   {/* Contenedor de la imagen */}
  <div className="w-full flex items-center justify-center my-4">
        <div className="w-full max-w-[90%] md:max-w-[50%] h-40 flex items-center justify-center bg-[#ffaca4]">
          <img
            src={imageUrl}
            alt="Pet"
            className="max-w-full h-auto object-cover rounded-lg mx-4"
          />
        </div>
  </div>

  {/* Botones debajo de la imagen */}
  <div className="flex justify-around mt-1">
        <button className="flex items-center bg-transparent text-pink-500">
          <img src="/src/assets/img/Icons/comment.svg" alt="comment" className="w-8 h-8 mr-2" />
        </button>
        <button className="flex items-center bg-transparent text-pink-500">
          <img src="/src/assets/img/Icons/info.svg" alt="info" className="w-8 h-8 mr-2" />
        </button>
        <button className="flex items-center bg-transparent text-pink-500">
          <img src="/src/assets/img/Icons/location.svg" alt="location" className="w-8 h-8 mr-2" />
        </button>
        <button className="flex items-center bg-transparent text-pink-500">
          <img src="/src/assets/img/Icons/share.svg" alt="share" className="w-8 h-8 mr-2" />
          </button>
      </div>

      <hr className='border-solid border-1 border-[#FF797D]'/>
    </>


  );
};

PetDescription.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default PetDescription;
