//import PetMap from "./PetMap";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Modal } from 'flowbite-react';
import Comentario from './Comentario';
import InputConIconos from './InputWithIcon';
import CardPostPet from './CardPostPet';

const PetDescription = ({ name, description, imageUrl}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir/cerrar el modal
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <CardPostPet
            name={name}
            description={description}
            imageUrl={imageUrl}
            t={t}
            handleModalToggle={handleModalToggle}
      />

    {/* Segunda Columna: Caja de Comentarios */}
    <div className="px-4">
      <Comentario
        avatar="/src/assets/img/Icons/avatar_placeholder.svg"
        nombre="Nombre"
        tiempo="50 min"
        texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Comentario
        avatar="/src/assets/img/Icons/avatar_placeholder.svg"
        nombre="Nombre"
        tiempo="50 min"
        texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
       <hr className="border-solid border-1 border-[#FF797D]" />
       <br />
      <InputConIconos />
    </div>

    </div>
  </div>

  {/* Modal de Información */}
  <Modal show={isModalOpen} onClose={handleModalToggle}>
        <Modal.Header className='bg-[#ff797d] flex items-center justify-center '>
          <p className='text-white'>Compartir</p>
        </Modal.Header>
        <Modal.Body className='bg-[#ff797d]'>
        <div className="grid grid-cols-3 gap-4">
            <img src="/src/assets/img/Icons/Facebook.svg" alt="Facebook" className="w-10 h-10" />
            <img src="/src/assets/img/Icons/Instagram.svg" alt="Instagram" className="w-10 h-10" />
            <img src="/src/assets/img/Icons/WhatsApp.svg" alt="WhatsApp" className="w-10 h-10" />
            <img src="/src/assets/img/Icons/TwitterX.svg" alt="TwitterX" className="w-10 h-10" />
            <img src="/src/assets/img/Icons/link.svg" alt="Link" className="w-10 h-10" />
            <img src="/src/assets/img/Icons/code.svg" alt="Code" className="w-10 h-10" />

          </div>
        </Modal.Body>

  </Modal>

    </>


  );
};

PetDescription.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default PetDescription;
