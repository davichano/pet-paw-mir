import { useState } from "react";
import Button from "./ui/Button";
import Description from "./ui/Description";
import {useUser} from '../../hooks/useUser';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { patchUser } from "../../services/users";

const DeleteAccount = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const { logout, data } = useUser();

  const handleClick = () => {
    if (isConfirmed) {

      try {
        patchUser(data.userId, { isActive: false });
        toast.success("Tu cuenta ha sido eliminada.");
        logout();
        navigate("/login");
      }
      catch (error) {
        console.error("Error deleting account", error);
        toast.error("Error al eliminar la cuenta.");
      }

    } else {
      setShowError(true);
    }
  };

  return (
    <div className="p-6 flex flex-col items-start">
      <Description text="¿Deseas eliminar tu cuenta?" />
      <label className="flex items-center pt-2">
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={() => setIsConfirmed(!isConfirmed)}
          className="mr-2 border-custom-200 focus:ring-custom-200 text-custom-350"
        />
        <span className="text-custom-350">Confirmo que quiero eliminar mi cuenta</span>
      </label>
      {!isConfirmed && showError && <p className="text-custom-350">Debes confirmar la eliminación.</p>}
      <Button onClick={handleClick}>Eliminar Cuenta</Button>

    </div>
  );
};

export default DeleteAccount;
