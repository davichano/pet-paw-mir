import ContinueButton from "../components/PostPet/StatePet/ContinueButton";
import InputWithRow from "../components/PostPet/StatePet/InputWithRow";
import { usePetData } from "../hooks/usePetData";
import { useState, useEffect } from "react";

const NewPostTag = () => {
  const { petData, setPetData } = usePetData();
  const [tags, setTags] = useState([]); // Estado inicial vacío

  useEffect(() => {
    setTags(Array.isArray(petData.tags) ? petData.tags : []);
  }, [petData.tags]);

  const handleTagsChange = (newTag) => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prevTags) => [...prevTags, newTag]); // Agrega una nueva etiqueta
    }
  };

  const handleContinue = () => {
    const updatedPetData = {
      ...petData,
      tags,
    };
    setPetData(updatedPetData);
    console.log("petData con tags actualizado:", updatedPetData);
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove)); // Elimina una etiqueta
  };

  return (
    <div className="max-w-[375px] mx-auto p-4">
      <InputWithRow
        placeholderText="Coloca aquí tus etiquetas"
        onTagsChange={handleTagsChange}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-red-100 text-red-500 px-2 py-1 rounded-full flex items-center"
          >
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(index)}
              className="ml-2 text-red-700 font-bold"
            >
              x
            </button>
          </div>
        ))}
      </div>

      <ContinueButton
        onClick={handleContinue}
        redirectPath={petData.id ? `/post/edit/${petData.id}/true` : '/post'}
      />
    </div>
  );
};

export default NewPostTag;
