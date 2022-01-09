import React from 'react'
import { useForm } from "react-hook-form";
import { signup } from '../config/auth';

const Register = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        try {
            signup(data.email, data.password);
        } catch (error) {
            console.log("ERROR REGISTRARSE", error.message)
        }
    };


    return (
        <div class="container-fluid ps-md-0">
            <div class="row g-0">
                <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div class="col-md-8 col-lg-6">
                    <div class="login d-flex align-items-center py-5">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-9 col-lg-8 mx-auto">
                                    <h1 class="login-heading mb-4  text-center"> Registrar Sesión</h1>
                                    <p className="login-heading mb-4  text-center">Complete el formulario para registrarte.</p>
                                    <form form className="mt-5  px-5" onSubmit={handleSubmit(onSubmit)}>
                                        <div class="form-floating mb-3">
                                            <input class="form-control"
                                                placeholder="Email"
                                                name="email"
                                                type="email"
                                                {...register("email", { required: true, maxLength: 100 })} />
                                            <label for="floatingInput">Correo Electronico</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input className="form-control"
                                                placeholder="Password"
                                                name="password"
                                                type="password"
                                                {...register("password", { required: true, maxLength: 50 })} />
                                            <label for="floatingPassword">Contraseña</label>
                                        </div>
                                        <div class="d-grid">
                                            <button class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Registrate</button>
                                        </div>
                                        <hr />
                                    </form >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Register;