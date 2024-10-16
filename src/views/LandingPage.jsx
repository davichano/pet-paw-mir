import Button from "../components/ui/Button";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="h-screen bg-custom-50 flex items-center justify-center">
        <div className="w-full h-full max-w-xl p-6 flex flex-col items-center justify-between">
          <div className="flex text-custom-200 font-semibold text-3xl">
            <p>Pet Paws</p>
          </div>
          <div className="max-w-44 max-h-44 aspect-square h-auto bto bg-custom-200 items-center justify-center">
            <div className="text-custom-50 font-bold text-2xl text-center">
              Aquí ira una imagen
            </div>
          </div>
          <h1 className="font-semibold text-4xl text-center text-custom-200">
            {t("landing.title")}
          </h1>
          <p className="font-medium text-2xl text-center text-custom-200">
            {t("landing.subtitle")}
          </p>
          <div className="w-full">
            <Button>{t("iHaveAccount")}</Button>
            <Button className="btn-secondary">{t("createAccount")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
