import {useState, useEffect} from 'react';
import {usePetData} from '../hooks/usePetData';
import FormSelect from '../components/PostPet/AddInfo/FormSelect';
import FormField from '../components/FormField';
import ContinueButton from '../components/PostPet/StatePet/ContinueButton';

const NewPostAddInfo = () => {
  const {petData, setPetData} = usePetData();

  const [formData, setFormData] = useState({
    name: '',
    petType: '',
    gender: '',
    age: '',
    size: '',
    date_lost: ''
  });

  // Sincroniza formData con petData solo si petData está completamente cargado
  useEffect(() => {
    if (petData && petData.petData) {
      console.log("petData useEffect:", petData);
      setFormData({
        name: petData.petData.name || '',
        petType: petData.petData.petType || '',
        gender: petData.petData.gender || '',
        age: petData.petData.age || '',
        size: petData.petData.size || '',
        date_lost: petData.date_lost || ''
      });
    }
  }, [petData]);

  const languageMap = {
    petType: {
      'DOG': 'Perro',
      'CAT': 'Gato',
      'BIRD': 'Pájaro',
      'RABBIT': 'Conejo',
      'OTHER': 'Otro',
      'Perro': 'DOG',
      'Gato': 'CAT',
      'Pájaro': 'BIRD',
      'Conejo': 'RABBIT',
      'Otro': 'OTHER',
    },
    gender: {
      'MALE': 'Macho',
      'FEMALE': 'Hembra',
      'Macho': 'MALE',
      'Hembra': 'FEMALE',
    },
    age: {
      'PUPPY': 'Cachorro',
      'YOUNG': 'Joven',
      'ADULT': 'Adulto',
      'SENIOR': 'Anciano',
      'Cachorro': 'PUPPY',
      'Joven': 'YOUNG',
      'Adulto': 'ADULT',
      'Anciano': 'SENIOR',
    },
    size: {
      'SMALL': 'Pequeño',
      'MEDIUM': 'Mediano',
      'LARGE': 'Grande',
      'Pequeño': 'SMALL',
      'Mediano': 'MEDIUM',
      'Grande': 'LARGE',
    },
  };

  const getDisplayValue = (section, value) => {
    return languageMap[section][value] || value;
  };

  const handleSubmit = () => {
    const updatedPetData = {
      ...petData,
      petData: {
        ...petData.petData,
        name: formData.name,
        petType: formData.petType,
        gender: formData.gender,
        age: formData.age,
        size: formData.size,
      },
      date_lost: formData.date_lost,
    };
    setPetData("updatedPetData", updatedPetData);
    console.log(updatedPetData);
  };

  const handleChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-start justify-center">
      <form className="bg-white p-6 w-full max-w-md" onSubmit={handleSubmit}>
        <FormField
          label="Nombre"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('petData', 'name', e.target.value)}
          placeholder="Nombre de la mascota"
        />
        <FormSelect
          label="Especie"
          value={getDisplayValue('petType', formData.petType)}
          onChange={(e) => handleChange('petData', 'petType', languageMap.petType[e.target.value])}
          options={['Perro', 'Gato', 'Pájaro', 'Conejo', 'Otro']}
        />
        <FormSelect
          label="Sexo"
          value={getDisplayValue('gender', formData.gender)}
          onChange={(e) => handleChange('petData', 'gender', languageMap.gender[e.target.value])}
          options={['Macho', 'Hembra']}
        />
        <FormSelect
          label="Edad aproximada"
          value={getDisplayValue('age', formData.age)}
          onChange={(e) => handleChange('petData', 'age', languageMap.age[e.target.value])}
          options={['Cachorro', 'Joven', 'Adulto', 'Anciano']}
        />
        <FormSelect
          label="Tamaño"
          value={getDisplayValue('size', formData.size)}
          onChange={(e) => handleChange('petData', 'size', languageMap.size[e.target.value])}
          options={['Pequeño', 'Mediano', 'Grande']}
        />
        <FormField
          label="Fecha aproximada de desaparición o aparición"
          type="datetime-local"
          value={formData.date_lost}
          onChange={(e) => handleChange('', 'date_lost', e.target.value)}
        />
        {petData.id && <ContinueButton onClick={handleSubmit} redirectPath={`/post/edit/${petData.id}/true`}/>}
        {!petData.id && <ContinueButton onClick={handleSubmit} redirectPath='/post'/>}
      </form>
    </div>
  );
};

export default NewPostAddInfo;
