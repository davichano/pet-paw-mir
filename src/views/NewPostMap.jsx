import { useEffect, useRef, useContext, useState } from "react";
import mapboxgl from 'mapbox-gl';
import PlacesProvider from "../contexts/places/PlacesProvider";
import PlacesContext from "../contexts/places/PlacesContext";
import { usePetData } from '../contexts/post/PetProvider';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbDI5LXMiLCJhIjoiY20yMnZvYnExMDJwNzJqcTV3d3J3cmUxdSJ9.fA3z9inzGxKvS2GC_rH20g';

const NewPostMap = () => {
  const { userLocation, isLoading } = useContext(PlacesContext);
  const { petData, setPetData } = usePetData();
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [markerLocation, setMarkerLocation] = useState(userLocation); // Almacena la ubicación actual del marcador

  useEffect(() => {
    if (!userLocation || isLoading) return;

    // Solo inicializamos el mapa si aún no existe
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: petData.location || userLocation, 
        zoom: 14,
      });

      // Crear un marcador arrastrable
      const marker = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat(petData.location || userLocation)
        .setPopup(new mapboxgl.Popup().setText("Ubicación de la mascota"))
        .addTo(mapRef.current);

      // Actualizar la ubicación del marcador cuando se arrastre
      marker.on('dragend', () => {
        const { lng, lat } = marker.getLngLat();
        setMarkerLocation([lng, lat]); // Actualizar el estado temporal con la nueva ubicación
      });
    }

  }, [userLocation, isLoading, petData.location]);

  // Función para confirmar y guardar la ubicación en petData
  const handleSaveLocation = () => {
    setPetData({
      ...petData,
      location: { lng: markerLocation[0], lat: markerLocation[1] },
    });
    alert("Ubicación guardada correctamente"+ petData);
  };

  return (
    <div>
      <div ref={mapContainer} className="w-full h-screen" />
      {markerLocation && (
        <div className="absolute bottom-10 left-10 bg-white p-2 rounded">
          <p>Latitud: {markerLocation[1]}</p>
          <p>Longitud: {markerLocation[0]}</p>
          <button
            onClick={handleSaveLocation}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Guardar Ubicación
          </button>
        </div>
      )}
    </div>
  );
};

const NewPostMapWithProvider = () => (
  <PlacesProvider>
    <NewPostMap />
  </PlacesProvider>
);

export default NewPostMapWithProvider;
