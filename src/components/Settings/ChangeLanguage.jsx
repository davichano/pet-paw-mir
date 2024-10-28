import { useUser } from "../../hooks/useUser";
import { useState, useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { updateConfig } from "../../services/config"
import { toast } from "sonner";

const EditLanguage = () => {
  const { updateUser, data } = useUser();
  const { setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(
    data?.language.toLowerCase() ?? "es"
  );

  useEffect(() => {
    if (data && data.language) {
      setSelectedLanguage(data.language.toLowerCase());
    }
  }, [data]);

  const handleChange = (code) => {
    setSelectedLanguage(code);
    updateUser({ language: code.toUpperCase() });
    updateUser({ idioma: code.toUpperCase() });
    setLanguage(code);
    try {
      updateConfig(data.id, { language: code.toUpperCase() });
      toast.success("Idioma actualizado correctamente");
    }
    catch (error) {
      console.error(error);
      toast.error("Error al actualizar el idioma");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-custom-250">Cambiar Idioma</h2>
      <ul className="space-y-4">
        {languages.map(({ code, label }) => (
          <li key={code}>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="language"
                value={code}
                checked={selectedLanguage === code}
                onChange={() => handleChange(code)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-custom-250 dark:peer-focus:ring-custom-350 dark:bg-gray-700 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5 peer-checked:bg-custom-350"></div>
              <span className="ml-3 text-sm font-medium dark:text-gray-300 text-custom-250">
                {label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditLanguage;
