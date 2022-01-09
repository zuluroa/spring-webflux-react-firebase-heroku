import React from 'react'

export const Answer = ({ answer, onDelete, userId }) => (

  <div className="container-md shadow p-4 mb-3 bg-white rounded form-group mx-10">
    <div class="noticia">
      <img class="izquierda" src={answer.photoUrl ? answer.photoUrl : "https://i.ibb.co/1rkvVY3/foto-anonimus-profile.png"} />
      <aside className="answer">
        <p><div dangerouslySetInnerHTML={{ __html: answer.answer }} /></p>
        {answer.userId === userId && (
          <button className="button right" onClick={() => onDelete(answer.id)}>DELETE</button>
        )}
      </aside>
    </div>
  </div>
)
