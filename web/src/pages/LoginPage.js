import React from 'react'
import { useForm } from "react-hook-form";
import { signin, signInWithGoogle } from '../config/auth';
import { Link } from "react-router-dom";

const LoginPage = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        try {
            await signin(data.email, data.password);
        } catch (error) {
            console.log("ERROR AL INICIAR SESION ", error.message);
        }
        
    };

    return (
        <div className="login-wrap">
            <form form className="mt-5 py-5 px-5" onSubmit={handleSubmit(onSubmit)}>
                <h1>
                    Iniciar Sesión
                </h1>
                <p className="lead">
                    Complete el formulario para iniciar sesión.
                </p>
                <div className="form-group container-input">
                    <input
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        type="email"
                        {...register("email", { required: true, maxLength: 100 })}
                    />
                    <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        type="password"
                        {...register("password", { required: true, maxLength: 50 })}
                    />
                </div>

                <button className="boton-cerrar" type="submit">Iniciar Sesión</button>
                <hr />
                <button
                    className="boton-cerrar"
                    onClick={signInWithGoogle}
                    type="button"
                >
                    Iniciar sesión con Google
                </button>
                <p>
                    ¿No tienes una cuenta?
                    <Link className="a" to="/register">
                        Registrate
                    </Link>
                </p>
                <hr />
            </form>
        </div>
    );
}

export default LoginPage;