import { useState } from "react";
import { Link } from "react-router-dom";
import "./ModalSignUp.css";


function ModalSignUp({ handleRegister }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(formData);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        handleRegister ({
            email: formData.email,
            password: formData.password,
            username: formData.username,
        });        
    };


    return ( 
        <form className="form" onSubmit={handleSubmit}>
            <fieldset className="form__set">
    
                <label className="form__field form__field-no-margin">
                        Email
                    <input 
                        className="form__input"
                        type="email"
                        placeholder="Email" 
                        name="email"
                        onChange={handleChange}                       
                    />                    
                    <span className="form__error">Por favor, rellena este campo.</span>
                </label>
    
                <label className="form__field">
                    Password
                    <input
                        className="form__input"
                        type="password"
                        placeholder="Enter password" 
                        name="password"
                        onChange={handleChange}             
                    />
                    <span className="form__error">Por favor, rellena este campo.</span>
                </label>

                <label className="form__field form__field-margin-username">
                    Username
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Enter your usename" 
                        name="username"
                        onChange={handleChange}             
                    />
                    <span className="form__error error-no-vailable">This username is not available</span>
                </label>
                <button 
                    className="form__input form__input-submit" 
                    type="submit" 
                >
                    Sign up
                </button>
                <div className="form__container-sign-in">
                    <p className="form__or">Or</p>
                    <Link 
                        to="/signin"  
                        className="form__link-sign-in"
                    >Sign in</Link>
                </div>
            </fieldset>
        </form> 
    );
}

export { ModalSignUp };