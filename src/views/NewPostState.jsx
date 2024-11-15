import {useState, useEffect} from 'react';
import {usePetData} from '../hooks/usePetData';
import StateOption from '../components/PostPet/StatePet/StateOption';
import ContinueButton from '../components/PostPet/StatePet/ContinueButton';

const NewPostState = () => {
  const {petData, setPetData} = usePetData();

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

  const [selectedState, setSelectedState] = useState(
    stateMap[petData.petData.state] || 'Perdido'
  );

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
        state: stateMap[selectedState],
      },
    };
    setPetData(updatedPetData);
  };

  return (
    <div className="max-w-[375px] mx-auto p-4">
      <p className="text- text-[#FF797D] mb-4">¿Cuál es el estado actual?</p>

      <StateOption
        label="Perdido"
        checked={selectedState === 'Perdido'}
        onChange={() => handleOptionChange('Perdido')}
      />
      <StateOption
        label="Encontrado"
        checked={selectedState === 'Encontrado'}
        onChange={() => handleOptionChange('Encontrado')}
      />
      <StateOption
        label="En Adopción"
        checked={selectedState === 'En Adopción'}
        onChange={() => handleOptionChange('En Adopción')}
      />
      <StateOption
        label="Adoptado"
        checked={selectedState === 'Adoptado'}
        onChange={() => handleOptionChange('Adoptado')}
      />

      <ContinueButton
        onClick={handleContinue}
        redirectPath={petData.id ? `/post/edit/${petData.id}` : '/post'}
      />
    </div>
  );
};

export default NewPostState;
