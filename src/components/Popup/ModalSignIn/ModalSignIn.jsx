import { useState } from "react";
import { Link } from "react-router-dom";
import "./ModalSignIn.css"

function ModalSignIn({ handleLoguin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        handleLoguin({
            email: formData.email,
            password: formData.password,
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
    
                <label className="form__field form__field-margin">
                    Password
                    <input
                        className="form__input"
                        type="password"
                        placeholder="........" 
                        name="password"  
                        onChange={handleChange}             
                    />
                    <span className="form__error">Por favor, rellena este campo.</span>
                </label>
                
                <button 
                    className="form__field form__input form__input-submit" 
                    type="submit" 
                >
                    Sign in
                </button>
                <div className="form__container-sign-up">
                    <p className="form__or">Or</p>
                    <Link
                        to="/signup"
                        id="form__link"
                        className="form__link form__link-sign-up">
                            Sign up
                    </Link>
                </div>
            </fieldset>
        </form> 
    );
}

export { ModalSignIn };