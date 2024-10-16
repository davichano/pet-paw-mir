import Button from "../components/ui/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="h-screen md:h-full bg-custom-50 flex items-center justify-center">
        <div className="hidden w-full h-full max-w-md p-6 md:flex flex-col items-center justify-center m-12 md:max-w-md">
          <div className="w-full max-h-lg aspect-square h-auto bg-custom-200 items-center justify-center">
            <div className="text-custom-50 font-bold text-2xl text-center">
              Aquí ira una imagen
            </div>
          </div>
        </div>
        <div className="w-full h-full max-w-lg p-6 flex flex-col items-center justify-between md:max-w-md md:justify-center md:gap-28">
          <div className="flex text-custom-200 font-semibold text-3xl md:hidden">
            <p>Pet Paws</p>
          </div>
          <div className="max-w-44 max-h-44 aspect-square h-auto bto bg-custom-200 items-center justify-center md:hidden">
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
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("iHaveAccount")}
            </Button>
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
      </div>
    </div>
  );
};
export default LandingPage;
