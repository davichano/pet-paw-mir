//import { useTranslation } from "react-i18next"
import useForm from "../hooks/useForm"
import { useState } from 'react'
import '../assets/css/RegisterForm.css'
import { useTranslation } from 'react-i18next'

const RegisterForm = () => {
    const [formData, handleChange] = useForm({
        firstname: '',
        lastname: '',
        profilePicture: '',
        age: '',
        country: '',
        address: '',
        contactNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState('');

    const validate = () => {
      let errors = {}
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = t("errorConfirmPassword")
      }
      return errors
    }
    const {t} = useTranslation();
    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate();
        setErrors(validationErrors)
        console.log(formData)
        if (Object.keys(validationErrors).length === 0) {
          console.log('Formulario valido')
        }
        //Aqui va la logica para enviar los datos al servidor
    }
    return (<>
        <form onSubmit={handleSubmit} className="register-form">
            <h2 className="register-form__title">Pet Paws</h2>
            <input type="text" name="firstname" placeholder={t("name")} onChange={handleChange} value={formData.firstname} required/>
            <input type="text" name="lastname" placeholder={t("lastName")} onChange={handleChange} value={formData.lastname} required/>
            <input type="file" id="profilePicture" name="profilePicture" onChange={handleChange}/>
            <input type="number" name="age" placeholder={t("age")} onChange={handleChange} value={formData.age} required/>
            <select name="country" onChange={handleChange} value={formData.country} required className="register-form__input">
                <option value="" disabled>{t("selectCountry")}</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
            </select>
            <input type="text" name="address" placeholder={t("address")} onChange={handleChange} value={formData.address} required/>
            <input type="number" name="contactNumber" placeholder={t("contactNumber")} onChange={handleChange} value={formData.contactNumber} required/>
            <input type="email" name="email" placeholder={t("email")} onChange={handleChange} value={formData.email} required/>
            <input type="password" name="password" placeholder={t("password")} onChange={handleChange} value={formData.password} required/>
            <input type="password" name="confirmPassword" placeholder={t("confirmPassword")} onChange={handleChange} value={formData.confirmPassword} required/>
            {errors.confirmPassword && <p style={{color:'red'}}>{errors.confirmPassword}</p>}
            <button type="submit">{t("toRegister")}</button>

        </form>
        <button className="register-form__google-button">
            <span className="register-form__google-icon">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
            </span>
            {t("registerWithGoogle")}
        </button>
        </>
    )
}

export default RegisterForm;
