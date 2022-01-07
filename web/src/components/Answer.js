import React from 'react'

export const Answer = ({ answer , onDelete, userId}) => (
   
  <aside className="answer">
    <p>{answer.answer}</p>
    {answer.userId === userId && (
      <button className="button right" onClick={() => onDelete(answer.id)}>DELETE</button>
    )}
  </aside>
)
