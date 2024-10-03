// SignUp.jsx
import { useForm, FormProvider } from 'react-hook-form';
import { StepProvider } from '../components/SignUp/StepContext';
import { useContext } from 'react';
import { steps } from '../components/SignUp/stepsConfig';
import { StepContext } from '../components/SignUp/StepContext';
import { getValidationSchema } from '../components/SignUp/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import FormStep from '../components/SignUp/FormStep';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  return (
    <StepProvider>
      <SignUpForm />
    </StepProvider>
  );
};

const validateCode = (value) => {
  return value === '123456'
}

const SignUpForm = () => {
  const { step, nextStep } = useContext(StepContext);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(getValidationSchema(step)),
    mode: 'onTouched',
  });

  const { setValue, setError, clearErrors } = methods;

  const onSubmit = (data) => {
    if (step === 5){
      //logica para enviar codigo de verificacion desde el correo
      nextStep(7);
    } else
    if (step === 6){
      //logica para enviar codigo desde el telefono
      nextStep(7);
    } else
    if (step === 7){
      if (validateCode(data.code)){
        clearErrors('code');
        navigate('/login');
      } else {
        setError('code', {
          type: 'manual',
          message: 'Código incorrecto',
        });
        alert('Código incorrecto');
        setValue('code', '');
      }
    } else
    if (step < steps.length) {
      nextStep();
    } else {
      // Envío final del formulario
      console.log('Datos del formulario:', data);
      // Navegar a otra página
      navigate('/login');
    }
  };

  const onAlternativeClick = () => {
    // Manejar la navegación alternativa (ej. cambiar entre email y número de teléfono)
    const alternativeStep = steps.find((s) => s.id === step).alternative.nextStep;
    nextStep(alternativeStep);
  };

  const stepData = steps.find((s) => s.id === step);

  return (
    <FormProvider {...methods}>
      <FormStep
        stepData={stepData}
        onSubmit={methods.handleSubmit(onSubmit)}
        onAlternativeClick={onAlternativeClick}
      />
    </FormProvider>
  );
};

export default SignUp;
