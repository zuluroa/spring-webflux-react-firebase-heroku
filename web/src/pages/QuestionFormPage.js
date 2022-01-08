import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { postQuestion } from '../actions/questionActions'
import { useSelector, useDispatch } from 'react-redux'
import { TextArea } from "../components/TextArea";

const FormPage = () => {
    const questions = useSelector(state => state.question);
    const userId = useSelector(state => state.auth.uid);
    const dispatch = useDispatch();
    
    const { register, handleSubmit } = useForm();
    const [content, setContent] = useState('');
    const history = useHistory();

    const onSubmit = data => {
        data.userId = userId;
        data.question = content;
        dispatch(postQuestion(data));
    };

    useEffect(() => {
        if (questions.redirect) {
            history.push(questions.redirect);
        }
    }, [questions.redirect, history])

    return (
        <section>
            <h1>New Question</h1>

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
                    
                    <TextArea  setContent={setContent} />
                </div>
                <button type="submit" className="button" disabled={questions.loading} >{
                    questions.loading ? "Saving ...." : "Save"
                }</button>
            </form>
        </section>

    );
}

export default FormPage