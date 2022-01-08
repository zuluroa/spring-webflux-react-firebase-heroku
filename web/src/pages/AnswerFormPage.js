import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {  fetchQuestion, postAnswer } from '../actions/questionActions'
import { useDispatch, useSelector } from 'react-redux'
import { Question } from '../components/Question'
import { TextArea } from "../components/TextArea";

const FormPage = ({match}) => {

    const questions = useSelector(state => state.question);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();
    const { id } = match.params
    const history = useHistory();

    const [content, setContent] = useState('');

    const onSubmit = data => {
        data.userId =  auth.uid;
        data.userEmail =  auth.email;
        data.questionId = id;
        data.answer = content;
        console.log("answer", data);
        dispatch(postAnswer(data));
    };

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        if (questions.redirect) {
            history.push(questions.redirect);
        }
    }, [questions.redirect, history])

    const renderQuestion = () => {
        if (questions.loading.question) return <p>Loading question...</p>
        if (questions.hasErrors.question) return <p>Unable to display question.</p>

        return <Question question={questions.question} />
    }

    return (
        <section>
            {renderQuestion()}
            <h1>New Answer</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="answer">Answer</label>
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