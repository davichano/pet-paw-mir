import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import Modal from "./Modal";
import FormField from "./ui/FormField";
import Button from "./ui/Button";
import Title from "./ui/Title";
import Description from "./ui/Description";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

// Esquema de validación con Yup

const EditPassword = () => {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    contrasenaActual: yup.string().required(t("currentPasswordRequired")),
    nuevaContrasena: yup
      .string()
      .required(t("newPasswordRequired"))
      .min(8, t("passwordLengthError"))
      .matches(/[a-zA-Z]/, t("passwordLetterError"))
      .matches(/\d/, t("passwordNumberError"))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t("passwordSymbolError")),
    repetirContrasena: yup
      .string()
      .oneOf([yup.ref("nuevaContrasena"), null], t("newPasswordsHaveToMatch"))
      .required(t("repeatNewPassword")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    toast.success(t("updatedCorrectly"));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 min-w-64 w-2/4 md:w-96 mx-auto mt-10 bg-white shadow rounded flex flex-col"
    >
      <Title text={t("settings.user.password")} />
      <Description text={t("settings.user.password.description")} />
      <FormField
        label={t("currentPassword")}
        type="password"
        id="contrasenaActual"
        register={register}
        errors={errors}
      />
      <FormField
        label={t("newPassword")}
        type="password"
        id="nuevaContrasena"
        register={register}
        errors={errors}
      />
      <FormField
        label={t("repeatNewPassword")}
        type="password"
        id="repetirContrasena"
        register={register}
        errors={errors}
      />
      <Button>{t("settings.user.password")}</Button>

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
