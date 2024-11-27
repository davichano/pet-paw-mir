import ImageUploader from "../components/PostPet/ImageUploader";
import DescriptionBox from "../components/PostPet/DescriptionBox";
import ActionButton from "../components/PostPet/ActionButton";
import PublishButton from "../components/PostPet/PublishButton";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchPost} from "../services/posts.js";
import {usePetData} from "../hooks/usePetData";
import {formatData} from "../helpers/formatPostData.js";
import {useTranslation} from "react-i18next";

const NewPostPet = () => {
  const {id} = useParams(); // Obtiene el id de la URL
  const {state} = useParams(); // Determina si es un formulario de edición
  const {petData, setPetData} = usePetData(); // Accede al contexto
  const [isEditing, setIsEditing] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    const getPostData = async () => {
      const esEditingForm = state === "true";
      setIsEditing(esEditingForm);

      // Si estamos editando, no hagas un nuevo fetch si ya hay datos en el contexto
      if (esEditingForm && petData?.id === Number(id)) {
        console.log("Usando datos existentes del contexto");
        return; // Usa los datos actuales del contexto
      }

      // Si no estamos editando o no hay datos, hace un fetch
      if (id) {
        console.log("Haciendo fetch de los datos del post...");
        const postData = await fetchPost(id);
        const formattedData = formatData(JSON.parse(localStorage.getItem("user")), postData);
        setPetData(formattedData); // Actualiza los datos en el contexto
      }
    };
    console.log("**Post data:", petData);

    getPostData();
  }, [id, setPetData, state, petData]);

  if (id && isEditing && !petData?.id) {
    return <div>Cargando datos para edición...</div>;
  }

  return (
    <div className="mx-auto p-4 bg-white-200 rounded-lg">
      {/* Contenedor para la vista en dispositivos grandes */}
      <div className="flex flex-col md:flex-row ">
        <div className="md:w-1/2 p-8 flex flex-col ">
          <div className="w-50 h-50 relative overflow-hidden rounded-lg">
            <ImageUploader/>
          </div>
          <DescriptionBox/>
        </div>

        <div className="md:w-1/2 p-8 space-y-6 flex flex-col">
          <ActionButton
            text={t("addInfoPet")}
            icon="/src/assets/img/Icons/info.svg"
            redirectTo="/post/info"
          />

          <ActionButton
            text={t("addLocationPet")}
            icon="/src/assets/img/Icons/location_pink.svg"
            redirectTo="/post/map"
          />

          <ActionButton
            text={t("addStatePet")}
            icon={"/src/assets/img/Icons/SVG/logoState.svg"}
            redirectTo="/post/state"
          />

          <ActionButton
            text={t("addTagPet")}
            icon={"/src/assets/img/Icons/Tags.svg"}
            redirectTo="/post/tag"
          />
          <PublishButton/>
        </div>
      </div>
    </div>
  );
};

export default NewPostPet;
