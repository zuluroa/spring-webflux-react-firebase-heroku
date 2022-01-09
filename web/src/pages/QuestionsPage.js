import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'

const QuestionsPage = () => {
    const questions = useSelector(state => state.question);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])
    
    const renderQuestions = () => {
        if (questions.loading) return <p>Loading questions...</p>
        if (questions.hasErrors) return <p>Unable to display questions.</p>
        return questions.questions.map(question => <Question key={question.id} question={question} excerpt />)
    }

    return (
        <section>
            <h1>Questions</h1>
            {renderQuestions()}
        </section>
    )
}


export default QuestionsPage
