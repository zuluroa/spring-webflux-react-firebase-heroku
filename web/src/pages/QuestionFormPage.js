import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { postQuestion } from '../actions/questionActions'
import { useSelector, useDispatch } from 'react-redux'
import { TextArea } from "../components/TextArea";

const FormPage = () => {
    const questions = useSelector(state => state.question);
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();
    const [content, setContent] = useState('');
    const history = useHistory();

    const onSubmit = data => {
        data.userId = user.uid;
        data.question = content;
        data.photoUrl = user.photo ? user.photo : "https://i.ibb.co/1rkvVY3/foto-anonimus-profile.png";
        dispatch(postQuestion(data));
    };

    useEffect(() => {
        if (questions.redirect) {
            history.push(questions.redirect);
        }
    }, [questions.redirect, history])

    return (
        <section>
            <div className="container-md shadow p-4 mb-3 bg-white rounded form-group mx-10">
                <h1 className="pt-2 text-center">New Question</h1>
                <hr></hr>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label htmlFor="type">Type</label>
                        <select {...register("type")} id="">
                            <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
                            <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
                            <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
                            <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select {...register("category")} id="category">
                            <option value="TECHNOLOGY AND COMPUTER">TECHNOLOGY AND COMPUTER</option>
                            <option value="SCIENCES">SCIENCES</option>
                            <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                            <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
                            <option value="LANGUAGE">LANGUAGE</option>

                        </select>
                    </div>
                    <div>
                        <label htmlFor="question">Question</label>

                        <TextArea setContent={setContent} />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-outline-primary btn-lg" disabled={questions.loading} >{
                        questions.loading ? "Saving ...." : "Save"
                    }</button>
                </form>
            </div>
        </section>
    );
}

export default FormPage