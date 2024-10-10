import { useState, useEffect } from "react";

// Estado inicial del componente
const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined,
};

// Componente PlacesProvider
const PlacesProvider = () => {

  const [state, setState] = useState(INITIAL_STATE);


  useEffect(() => {

    setTimeout(() => {
      setState({
        isLoading: false,
        userLocation: [51.5074, -0.1278],
      });
    }, 2000);
  }, []);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

 
  return (
    <div>
      <h1>User Location</h1>
      <p>
        Latitude: {state.userLocation ? state.userLocation[0] : "N/A"} <br />
        Longitude: {state.userLocation ? state.userLocation[1] : "N/A"}
      </p>
    </div>
  );
};

export default PlacesProvider;
