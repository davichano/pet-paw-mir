// FormStep.jsx
import FormField from "./FormField";
import { useNavigate, Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import PropTypes from "prop-types";

const FormStep = ({ stepData, onSubmit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleSubmit } = useFormContext();

  return (
    <div className="h-screen bg-custom-50 flex flex-col items-center justify-center">
      <div className="register w-full max-w-md p-6 flex flex-col items-center relative h-full">
        <h2 className="text-custom-250 p-4 font-semibold text-3xl text-center">
          {t(stepData.titleKey)}
        </h2>
        <p className="text-custom-250 font-normal text-base pl-0 text-center">
          {t(stepData.subtitleKey)}
        </p>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {stepData.fields.map((field) => (
            <FormField key={field.name} field={field} />
          ))}
          <Button type="submit">{t("next")}</Button>
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

FormStep.propTypes = {
  stepData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAlternativeClick: PropTypes.func.isRequired,
};

export default FormStep;
