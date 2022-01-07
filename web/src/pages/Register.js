import React from 'react'
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { signup } from '../config/auth';

const Register = () => {
    const question = useSelector(state => state.question);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        try {
            signup(data.email, data.password);
        } catch (error) {
            console.log("ERROR REGISTRARSE", error.message)
            // this.setState({ error: error.message });
        }
    };


    return (
        <div className="login-wrap">
            <form form className="mt-5 py-5 px-5" onSubmit={handleSubmit(onSubmit)}>
                <h1>
                    Registrar Sesión
                </h1>
                <p className="lead">
                    Complete el formulario para registrarte.
                </p>
                <div className="form-group container-input">
                    <input
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        type="email"
                        {...register("email", { required: true, maxLength:20 })}
                    />
                    <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        type="password"
                        {...register("password", { required: true, maxLength:20 })}
                    />
                </div>

                {question.hasErrors ? <p>Hubo un error al registrarse.</p> : null}
                <button className="boton-cerrar" type="submit">Registrar Email</button>
                <hr />
            </form>
        </div>
    );
}

export default Register;