import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import FormField from "./ui/FormField";
import Button from "./ui/Button";
import Title from "./ui/Title";

const formatDateForInput = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().substring(0, 10);
};

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("El apellido es obligatorio"),
  account: yup.string().required("El account es obligatorio"),
  email: yup.string().email("Correo inválido").required("El email es obligatorio"),
  birthDate: yup.date().required("La fecha de nacimiento es obligatoria"),
});

const EditDetails = () => {
  const {updateUser, data} = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),

  });

  useEffect(() => {
    if (data && data.name) {
      setValue("name", data.name);
    }
    if (data && data.lastName) {
      setValue("lastName", data.lastName);
    }
    if (data && data.account) {
      setValue("account", data.account);
    }
    if (data && data.email) {
      setValue("email", data.email);
    }
    if (data && data.birthDate) {
      setValue("birthDate", formatDateForInput(data.birthDate));
    }
  }, [data, setValue]);

  const onSubmit = (data) => {
    console.log("Datos actualizados:", data);
    updateUser(data);
    alert("Detalles personales actualizados exitosamente");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-2/4 mx-auto mt-10 bg-white shadow rounded flex flex-col"
    >
      <Title text="Detalles Personales" />
      <FormField id="name" type="text" label="Nombre(s)" register={register} errors={errors} />
      <FormField id="lastName" type="text" label="Apellido(s)" register={register} errors={errors} />
      <FormField id="account" type="text" label="Usuario" register={register} errors={errors} />
      {/*<FormField id="email" type="email" label="Correo Electrónico" register={register} errors={errors} />*/}
      <FormField id="birthDate" type="date" label="Fecha de Nacimiento" register={register} errors={errors} />
      <Button type="submit" >Guardar Cambios</Button>
    </form>
  );
};

export default EditDetails;
