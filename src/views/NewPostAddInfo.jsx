import { useState } from 'react';
import FormSelect from '../components/PostPet/AddInfo/FormSelect';
import FormField from '../components/FormField';
import ContinueButton from '../components/PostPet/StatePet/ContinueButton';


const NewPostAddInfo = () => {
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [date] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ species, gender, age, size, date });
  };

  return (
    <div className="min-h-screen flex items-start justify-center">
      <form className="bg-white p-6 w-full max-w-md" onSubmit={handleSubmit}>
        <FormSelect
          label="Especie"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          options={['Perro', 'Gato']}
        />

        <FormSelect
          label="Sexo"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={['Macho', 'Hembra']}
        />

        <FormSelect
          label="Edad aproximada"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          options={['Cachorro', 'Adulto', 'Anciano']}
        />

        <FormSelect
          label="Tamaño"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          options={['Pequeño', 'Mediano', 'Grande']}
        />

        <FormField
              label="Fecha aproximada de desaparición o aparición"
              type="datetime-local"

        />

        <ContinueButton text="Continuar" />
      </form>
    </div>
  );
};

export default NewPostAddInfo;
