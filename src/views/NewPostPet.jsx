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
  const {id} = useParams();
  const {state} = useParams();
  const {setPetData} = usePetData(); // Usa el contexto del PetProvider existente
  const [existingData, setExistingData] = useState(null);
  const {t} = useTranslation();

  useEffect(() => {
    const getPostData = async () => {
      const esEditingForm = state === "true"
      if (id && !esEditingForm) {
        const postData = await fetchPost(id);
        const formattedData = formatData(JSON.parse(localStorage.getItem("user")), postData);
        setExistingData(formattedData);
        setPetData(formattedData); // Actualiza petData en el contexto si es modo edición
      }
    };

    getPostData();
  }, [id, setPetData, state]);

  if (id && !existingData) {
    return <div>Cargando...</div>;
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
