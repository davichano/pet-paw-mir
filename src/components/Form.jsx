import FormField from './FormField';

const Form = () => {
  return (
    <form className="space-y-4">
      <FormField label="Nombre" id="name" placeholder="Shaders" required />
      <FormField label="Tipo de Animal" id="animalType" placeholder="Perros" required />
      <FormField
        label="Género"
        id="gender"
        type="radio"
        options={[
          { label: "Macho", value: "male" },
          { label: "Hembra", value: "female" }
        ]}
      />
      <FormField label="Características" id="characteristics" type="textarea" placeholder="Tiene ojos claros..." />
      <div className="flex space-x-4">
        <FormField label="Tamaño" id="size" placeholder="Pequeño" />
        <FormField label="Edad" id="age" type="number" placeholder="2" />
      </div>
      <FormField label="Día y Hora" id="date" type="datetime-local" />
      <FormField label="Recompensa" id="reward" />
      <FormField label="Contacto" id="contact" placeholder="Tu número o correo" />
      <FormField label="Foto" id="photo" type="file" />
      <FormField label="Etiquetas" id="tags" placeholder="Etiquetas relacionadas" />
    </form>
  );
};

export default Form;
