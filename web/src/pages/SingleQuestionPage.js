import React, { useEffect } from 'react'
import { fetchQuestion } from '../actions/questionActions'
import { deleteAnswer } from '../actions/questionActions'
import { useDispatch, useSelector } from 'react-redux'
import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'

const SingleQuestionPage = ({ match }) => {

  const questions = useSelector(state => state.question);
  const userId = useSelector(state => state.auth.uid);

  const dispatch = useDispatch();

  const { id } = match.params;

  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [questions.redirect, dispatch, userId]);

  const onDelete = (id) => {
    swal({
      title: "¿Eliminar?",
      text: "¡Recuerda, al eliminar no podrás recuperar esta respuesta!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((eliminar) => {
        if (eliminar) {
          swal("¡Se ha eliminado con exito!", {
            icon: "success",
          });
          dispatch(deleteAnswer(id))
        } else {
          swal("uff, que bueno que preguntamos");
        }
      });
  }

  const renderQuestion = () => {
    if (questions.loading.question) return <p>Loading question...</p>
    if (questions.hasErrors.question) return <p>Unable to display question.</p>
    return <Question question={questions.question} />
  }

  const renderAnswers = () => {
    return (questions.question.answers && questions.question.answers.length) ? questions.question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} userId={userId} onDelete={onDelete} />
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      <div className="container-md shadow p-5 mb-3 bg-white rounded form-group">
        {renderQuestion()}
        <br></br>
        {userId && <Link to={"/answer/" + id} className="button right">
          Reply
        </Link>}

        <h2>Answers</h2>
        <hr></hr>
        <br></br>
        {renderAnswers()}
      </div>
    </section>
  )
}

export default SingleQuestionPage
