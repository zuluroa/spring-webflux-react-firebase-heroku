import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { findUserById, updateUser } from "../actions/authActions";
import swal from "sweetalert";

const ProfilePage = () => {
    const user = useSelector(state => state.auth);
    const question = useSelector(state => state.question);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [displayName, setdisplayName] = useState(user.name);

    useEffect(() => {
        dispatch(findUserById(user.uid))
    }, [dispatch, user.uid]);

    const handleChange = (event) => {
        setdisplayName(event.target.value);
    }

    const validateInput = data => {
        swal({
            title: "Actualizar?",
            text: "¡Recuerda, al actualizar puedes cambiar el contenido del nombre!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((actualizar) => {
                if (actualizar) {
                    swal("¡Se ha actualizado con exito!", {
                        icon: "success",
                    });
                    data.id = user.uid;
                    data.email = user.email;
                    dispatch(updateUser(data));
                } else {
                    swal("uff, que bueno que preguntamos");
                }
            });
    }

    return (
        <section>
            <div className="container-md shadow p-4 mt-5 mb-3 bg-white rounded form-group mx-10">
                <h2 className="text-center">My profile</h2>
                <hr />
                <form onSubmit={handleSubmit(validateInput)}>
                    <div>
                        <label htmlFor="displayName">Name</label>
                        <br></br>
                        <input id="displayName" className="form-control" {...register("displayName", { required: true, maxLength: 100 })} onChange={handleChange} value={displayName} />
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input disabled={true} value={user.email} />
                    </div>
                    <br></br>
                    <button type='submit' className='btn btn-primary btn-lg' disabled={question.loading}>
                        {question.loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ProfilePage;