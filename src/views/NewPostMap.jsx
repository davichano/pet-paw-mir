
import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbDI5LXMiLCJhIjoiY20yMnZvYnExMDJwNzJqcTV3d3J3cmUxdSJ9.fA3z9inzGxKvS2GC_rH20g';

const NewPostMap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
  const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ width: '100%', height: '500px' }} // Ajusta el tamaño del mapa
      />
    </div>
  );
}

export default NewPostMap;
