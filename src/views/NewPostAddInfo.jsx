import {useState, useEffect} from 'react';
import {usePetData} from '../hooks/usePetData';
import FormSelect from '../components/PostPet/AddInfo/FormSelect';
import FormField from '../components/FormField';
import ContinueButton from '../components/PostPet/StatePet/ContinueButton';
import {useTranslation} from "react-i18next";

const NewPostAddInfo = () => {
  const {t} = useTranslation();
  const {petData, setPetData} = usePetData();

  const [formData, setFormData] = useState({
    name: '',
    petType: '',
    gender: '',
    age: '',
    size: '',
    date_lost: ''
  });

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

  const handleChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...petData[section],
        [key]: value.toUpperCase(),
      },
    }));
    setPetData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value.toUpperCase(),
      },
    }));
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

  return (
    <div className="min-h-screen flex items-start justify-center">
      <form className="bg-white p-6 w-full max-w-md" onSubmit={handleSubmit}>
        <FormField
          label={t("namePet")}
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('petData', 'name', e.target.value)}
          placeholder="Nombre de la mascota"
        />
        <br/>
        <FormSelect
          label={t("speciesPet")}
          value={getDisplayValue('petType', petData.petData.petType)}
          onChange={(e) => {
            const valueMap = {
              'Perro': 'DOG',
              'Gato': 'CAT',
              'Pájaro': 'BIRD',
              'Conejo': 'RABBIT',
              'Otro': 'OTHER',
            };
            handleChange('petData', 'petType', valueMap[e.target.value]);
          }}
          options={['Perro', 'Gato', 'Pájaro', 'Conejo', 'Otro']}
        />
        <FormSelect
          label={t("genderLabel")}
          value={getDisplayValue('gender', petData.petData.gender)}
          onChange={(e) => {
            const valueMap = {
              'Macho': 'MALE',
              'Hembra': 'FEMALE',
            };
            handleChange('petData', 'gender', valueMap[e.target.value]);
          }}
          options={['Macho', 'Hembra']}
        />
        <FormSelect
          label={t("approximateAgePet")}
          value={getDisplayValue('age', petData.petData.age)}
          onChange={(e) => {
            const valueMap = {
              'Cachorro': 'PUPPY',
              'Joven': 'YOUNG',
              'Adulto': 'ADULT',
              'Anciano': 'SENIOR',
            };
            handleChange('petData', 'age', valueMap[e.target.value]);
          }}
          options={['Cachorro', 'Joven', 'Adulto', 'Anciano']}
        />
        <FormSelect
          label={t("sizeLabel")}
          value={getDisplayValue('size', petData.petData.size)}
          onChange={(e) => {
            const valueMap = {
              'Pequeño': 'SMALL',
              'Mediano': 'MEDIUM',
              'Grande': 'LARGE',
            };
            handleChange('petData', 'size', valueMap[e.target.value]);
          }}
          options={['Pequeño', 'Mediano', 'Grande']}
        />
        <FormField
          label={t("approximateDate")}
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
