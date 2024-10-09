import { useForm } from "react-hook-form";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const PasswordRecovery = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .test(
        "email-or-phone",
        t("emailOrPhoneInvalid"),
        (value) =>
          yup.string().email().isValidSync(value) || /^[9][0-9]{8}$/.test(value)
      )
      .required(t("emailOrPhoneRequired")),
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
            {t("forgotPassword")}
          </h2>
          <p className="text-custom-250 text-center">
            {t("passwordRecoveryText")}
          </p>
          <Input
            type="text"
            placeholder={t("emailOrPhone")}
            {...register("email")}
            required
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <Button type="submit">{t("send")}</Button>
        </form>
        <Link to="/todo" className="text-custom-250">
          {t("cantChangePassword")}
        </Link>
        <div className="flex items-center w-full my-4">
          <div className="flex-grow border-t-2 border-custom-250"></div>
          <span className="mx-2 text-custom-250">{t("or")}</span>
          <div className="flex-grow border-t-2 border-custom-250"></div>
        </div>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
          className="btn-secondary"
        >
          {t("createAccount")}
        </Button>
      </div>
    </div>
  );
};

export default PasswordRecovery;
