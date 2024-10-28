import { useUser } from "../../hooks/useUser";
import { useState, useEffect } from "react";
import { updateConfig } from "../../services/config"
import { toast } from "sonner";

const EditPrivacity = () => {
  const { updateUser, data } = useUser();

  const apiDataPrivacityToBoolean = (data) => {
    return data?.accountPrivacy === "PUBLIC" ? false : true;
  };

  const [privacity, setPrivacity] = useState(apiDataPrivacityToBoolean(data));

  useEffect(() => {
    if (data && data.privacity !== undefined) {
      setPrivacity(data.privacity);
    }
  }, [data]);

  const togglePrivacidad = () => {
    const newPrivacity = !privacity;
    setPrivacity(newPrivacity);
    updateUser({ privacity: newPrivacity });
    updateUser({ accountPrivacy: newPrivacity ? "PRIVATE" : "PUBLIC" });
    try {
      updateConfig(data.id, { accountPrivacy: newPrivacity ? "PRIVATE" : "PUBLIC" });
      toast.success("Privacidad actualizada correctamente");
    }
    catch (error) {
      console.error(error);
      toast.error("Error al actualizar la privacidad");
    }
  };

  return (
    <div className="p-6 text-custom-350 w-2/4">
      <h2 className="text-xl font-bold mb-4">Privacidad de la Cuenta</h2>
      <p className="mb-4 text-justify">
        {privacity
          ? "Tu cuenta es privada. Solo tus seguidores pueden ver tu contenido."
          : "Tu cuenta es pública. Cualquiera puede ver tu contenido."}
      </p>
      <p className="text-justify pb-4">
        Una cuenta pública, permite a cualquier persona poder ver tu perfil y
        tus publicaciones, sean o no usuarios de la plataforma. Una cuenta
        privada, solo permite que los seguidores que apruebas puedan ver lo que
        compartes, información adicional, enviarte mensaje o ver tu ubicación.
        Algunos datos seguiran visibles como tu foto de perfil y tu nombre de
        usuario aún si tu cuenta es privada.
      </p>

      <label className="inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          checked={privacity}
          onChange={togglePrivacidad}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-custom-200 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-custom-350"></div>
        <span className="ms-3 font-bold text-custom-350 dark:text-gray-300">
          {privacity ? "Cuenta privada activada" : "Cuenta privada desactivada"}
        </span>
      </label>
    </div>
  );
};

export default EditPrivacity;
