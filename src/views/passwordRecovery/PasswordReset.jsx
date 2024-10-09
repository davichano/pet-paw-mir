import { useForm } from "react-hook-form";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const PasswordReset = () => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    verificationCode: yup
      .string()
      .matches(/^[0-9]{6}$/, t("invalidVerificationCode"))
      .required(t("errorCode")),
    newPassword: yup
      .string()
      .min(8, t("passwordLengthError"))
      .required(t("passwordRequired")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], t("passwordsMustMatch"))
      .required(t("confirmPasswordRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="h-screen bg-custom-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 flex flex-col items-center relative h-full">
        <form onSubmit={onSubmit}>
          <h2 className="register__title text-custom-250 p-4 font-semibold text-2xl text-center">
            {t("resetPassword")}
          </h2>
          <p className="text-custom-250 text-center">
            {t("enterVerificationCode")}
          </p>
          <Input
            type="text"
            placeholder={t("verificationCode")}
            {...register("verificationCode")}
            required
          />
          {errors.verificationCode && (
            <span className="text-red-500">
              {errors.verificationCode.message}
            </span>
          )}

          <Input
            type="password"
            placeholder={t("newPassword")}
            {...register("newPassword")}
            required
          />
          {errors.newPassword && (
            <span className="text-red-500">{errors.newPassword.message}</span>
          )}

          <Input
            type="password"
            placeholder={t("confirmPassword")}
            {...register("confirmPassword")}
            required
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}

          <Button type="submit">{t("resetPasswordButton")}</Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
