import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import { Modal } from 'flowbite-react';
import PropTypes from 'prop-types';
const mapToken = import.meta.env.VITE_MAPBOXGL_TOKEN;
mapboxgl.accessToken = mapToken;
const PetMap = (latitude, longitude) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    if (isModalOpen) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [parseFloat(longitude), parseFloat(latitude)],
        zoom: 14,
      });
      // Agregar un marcador en la ubicación especificada
      new mapboxgl.Marker()
        .setLngLat([parseFloat(longitude), parseFloat(latitude)])
        .addTo(map);
      // Limpieza al desmontar el modal
      return () => map.remove();
    }
  }, [isModalOpen, latitude, longitude]);
  return (
    <>
    <button onClick={handleModalToggle} className="bg-transparent text-pink-500">
        <img src="/src/assets/img/Icons/location.svg" alt="location icon" className="w-12 h-12" />
      </button>
      <Modal show={isModalOpen} onClose={handleModalToggle}>
        <Modal.Header className="bg-[#ff797d]">
          <p className="text-white">Ubicación del perrito</p>
        </Modal.Header>
        <Modal.Body className="bg-[#ff797d] text-white">
          <div
            id="map"
            style={{
              width: '100%',
              height: '400px',
              borderRadius: '10px',
            }}
          ></div>
        </Modal.Body>
      </Modal>
    </>
  )
};

PetMap.PropTypes = {
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
}
export default PetMap;
