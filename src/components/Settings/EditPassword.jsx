import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import Modal from "./Modal";
import FormField from "./ui/FormField";
import Button from "./ui/Button";
import Title from "./ui/Title";
import Description from "./ui/Description";

// Esquema de validación con Yup
const schema = yup.object().shape({
  contrasenaActual: yup.string().required("La contraseña actual es obligatoria"),
  nuevaContrasena: yup
    .string()
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
    .required("La nueva contraseña es obligatoria"),
  repetirContrasena: yup
    .string()
    .oneOf(
      [yup.ref("nuevaContrasena"), null],
      "Las contraseñas deben coincidir"
    )
    .required("Debe repetir la nueva contraseña"),
});

const EditPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setIsModalOpen(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col w-2/4 mx-auto mt-10"
    >
      <Title text="Cambiar Contraseña" />
      <Description text="Ingresa tu contraseña actual y la nueva contraseña que deseas utilizar." />
      <FormField label="Contraseña Actual" type="password" id="contrasenaActual" register={register} errors={errors} />
      <FormField label="Nueva Contraseña" type="password" id="nuevaContrasena" register={register} errors={errors} />
      <FormField label="Repetir Contraseña" type="password" id="repetirContrasena" register={register} errors={errors} />
      <Button>Cambiar contraseña</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold">Contraseña Actualizada</h2>
        <p>Tu contraseña ha sido cambiada exitosamente.</p>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Cerrar
        </button>
      </Modal>
    </form>
  );
};

export default EditPassword;
