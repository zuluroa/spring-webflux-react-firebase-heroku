import React from 'react'
import { Link } from 'react-router-dom'

export const PublicNavbar = () => (
  <nav className="navbar navbar-expand-lg navbar-black bg-black">
    <a class="navbar-brand" href="/">
      <img src="./images/logoPet_project.png" width="50%" height="50%" />
    </a>
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
    </section>
  </nav>
)

export const PrivateNavbar = () => (
  <nav className="navbar navbar-expand-lg navbar-black bg-black">
    <a class="navbar-brand" href="/">
      <img src="./images/logoPet_project.png" width="50%" height="50%" />
    </a>
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/new">New</Link>
      <Link to="/list">List</Link>
    </section>
  </nav>
)
