import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import * as yup from "yup";
import Modal from "./Modal";
import { useEffect } from "react";
import FormField from "./ui/FormField";
import Button from "./ui/Button";
import { toast } from "sonner";
import { patchUser } from "../../services/users";
import { useTranslation } from "react-i18next";



const EditProfile = () => {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    description: yup.string().required(t("descriptionRequired")),
    gender: yup.string().required(t("genderRequired")),
  });


  const { updateUser, data } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data && data.description) {
      setValue("description", data.description);
    }
    if (data && data.gender) {
      setValue("gender", data.gender);
    }
  }, [data, setValue]);

  const onSubmit =async (formData) => {
    updateUser({ gender: formData.gender, description: formData.description });
    try {
      await patchUser(data.userId, {
        gender: formData.gender,
        description: formData.description
      });
      toast.success(t("updatedCorrectly"));
    } catch (error) {
      console.error(t("errorUpdating"), error);
      toast.error(t("errorUpdating"));
    }
  };

  return (
    <>
      <form
        onSubmit={
          handleSubmit(onSubmit) // Agregar handleSubmit al evento onSubmit del formulario
        }
        className="space-y-6 min-w-64 w-2/4 md:w-96 mx-auto mt-10 bg-white shadow rounded flex flex-col"
      >
        <div className="text-center flex justify-center">
          <div className="flex items-center gap-4 justify-left w-full p-4 bg-custom-100 rounded-lg">
            <img className="w-14 h-14 rounded-full" src={data.avatar} alt="" />
            <div className="font-medium dark:text-white text-custom-250">
              <div className="pl-3 ml-0">
                {data.name + " " + data.lastName.split(" ")[0]}
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="font-light"
              >
                {t("settings.user.changePhoto")}
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col bg-custom-200 text-white rounded-2xl space-y-1">
            <div className="border-b border-white pb-2 text-center">
            {t("settings.user.changePhoto")}
            </div>
            <button className="bg-custom-200 text-custom-50 font-semibold py-2 px-4  m-0 border-b-white border-b">
            {t("settings.user.uploadPhoto")}
            </button>
            <button className="bg-custom-200 hover:bg-red-700 text-custom-400 font-semibold py-2 px-4 hover:text-custom-50  border-b-white border-b">
            {t("settings.user.deletePhoto")}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-custom-200  text-custom-50 font-semibold py-2 px-4 rounded-b-2xl "
            >
              {t("cancel")}
            </button>
          </div>
        </Modal>
        <FormField
          label={t("description")}
          type="textarea"
          id="description"
          register={register}
          errors={errors}
        />

        <div className="mt-4">
          <label htmlFor="gender" className="block mb-1 text-custom-250">
          {t("gender")}
          </label>
          <select
            id="gender" // Cambié 'category' por 'gender' para evitar confusión
            {...register("gender")}
            className="p-2 w-full border-custom-200 text-custom-200 rounded-lg"
          >
            <option value="">{t("gender.choose")}</option>
            <option value="Male">{t("gender.male")}</option>
            <option value="Female">{t("gender.female")}</option>
            <option value="Other">{t("gender.other")}</option>
          </select>
          {errors.gender && (
            <p className="text-custom-250">{errors.gender.message}</p>
          )}
        </div>

        <Button type="submit">{t("save")}</Button>
      </form>
    </>
  );
};

export default EditProfile;
