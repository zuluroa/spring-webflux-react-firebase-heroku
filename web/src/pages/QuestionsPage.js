import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'
import { Link } from 'react-router-dom'

const QuestionsPage = () => {
    const questions = useSelector(state => state.question);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [categorySearch, setcategorySearch] = useState('');

    let questionFilterCategory = questions.questions.filter(question => question?.category?.toUpperCase().includes(categorySearch.toUpperCase()));
    let questionFilterSearch = questionFilterCategory.filter(question => question?.question?.toUpperCase().includes(search.toUpperCase()));

    const goTOVariable = questionFilterSearch[0]?.id;
    

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const renderQuestions = () => {
        if (questions.loading) return <p>Loading questions...</p>
        if (questions.hasErrors) return <p>Unable to display questions.</p>
        return questionFilterSearch.map(question => <Question setcategorySearch={setcategorySearch} key={question.id} question={question} excerpt />)
    }

    return (
        <section>
            <form className="form-search pt-4">
                <input type="text" onChange={handleSearch} placeholder="Buscar..." />
                <Link to={`/question/${goTOVariable}`}>
                    <input style={{ display: 'none' }} type="submit" value="search" />
                </Link>
            </form>
            <h1 className='text-center p-4'>Questions</h1>
            <hr></hr>
            <br></br>
            {renderQuestions()}
        </section>
    )
}


export default QuestionsPage
