import {useState, useEffect} from 'react';
import {usePetData} from '../hooks/usePetData';
import StateOption from '../components/PostPet/StatePet/StateOption';
import ContinueButton from '../components/PostPet/StatePet/ContinueButton';
import {useTranslation} from "react-i18next";

const NewPostState = () => {
  const {petData, setPetData} = usePetData();
  const {t} = useTranslation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stateMap = {
    LOST: 'Perdido',
    FOUND: 'Encontrado',
    ADOPTION: 'En Adopción',
    ADOPTED: 'Adoptado',
    Perdido: 'LOST',
    Encontrado: 'FOUND',
    'En Adopción': 'ADOPTION',
    Adoptado: 'ADOPTED',
  };

  const petState = petData.petData.state;
  const [selectedState, setSelectedState] = useState(petState || 'Perdido');

  useEffect(() => {
    if (petData.petData.state) {
      setSelectedState(stateMap[petData.petData.state]);
    }
  }, [petData.petData.state, stateMap]);

  const handleOptionChange = (state) => {
    setSelectedState(state);
  };

  const handleContinue = () => {
    const updatedPetData = {
      ...petData,
      petData: {
        ...petData.petData,
        state: selectedState,
      },
    };
    setPetData(updatedPetData);
  };

  return (
    <div className="max-w-[375px] mx-auto p-4">
      <p className="text- text-[#FF797D] mb-4">{t("questionForState")}</p>

      <StateOption
        label={t("lostPet")}
        checked={selectedState === 'Perdido'}
        onChange={() => handleOptionChange('Perdido')}
      />
      <StateOption
        label={t("foundPet")}
        checked={selectedState === 'Encontrado'}
        onChange={() => handleOptionChange('Encontrado')}
      />
      <StateOption
        label={t("adoptionPet")}
        checked={selectedState === 'En Adopción'}
        onChange={() => handleOptionChange('En Adopción')}
      />
      <StateOption
        label={t("adoptedPet")}
        checked={selectedState === 'Adoptado'}
        onChange={() => handleOptionChange('Adoptado')}
      />

      <ContinueButton
        onClick={handleContinue}
        redirectPath={petData.id ? `/post/edit/${petData.id}/true` : '/post'}
      />
    </div>
  );
};

export default NewPostState;
