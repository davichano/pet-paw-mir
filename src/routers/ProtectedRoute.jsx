// ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { PetContext } from "../contexts/PetContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { current_user } = useContext(PetContext);

  if (!current_user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
