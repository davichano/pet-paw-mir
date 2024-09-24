//import { useTranslation } from "react-i18next"
import { useState } from "react"
import '../assets/css/RegisterForm.css'

const RegisterForm = () => {
    const [formData, setFormData] = useState({
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        //Aqui va la logica para enviar los datos al servidor       
    }       
    return (
        <form onSubmit={handleSubmit} className="register-form"> 
            <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} />
            <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} />
            <input type="file" name="profilePicture" onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })} />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} />
            <input type="text" name="country" placeholder="Country" onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            <input type="number" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <button type="submir">Registrarse</button>
        </form>
    )
}

export default RegisterForm;
