import React, { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode" // Değişiklik burada
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"))
  const [userName, setUserName] = useState(localStorage.getItem("username"))
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"))

  const isTokenExpired = () => {
    const token = localStorage.getItem("token")
    if (!token) return true
    const decodedToken = jwtDecode(token) // Değişiklik burada
    const currentTime = Date.now() / 1000
    return decodedToken.exp < currentTime
  }

  useEffect(() => {
    if (isLoggedIn && isTokenExpired()) {
      handleLogout()
    }
  }, [isLoggedIn])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("isAdmin")
    setIsLoggedIn(false)
    setUserName("")
    setIsAdmin(false)
    window.location = "/login"
  }
  return (
    <div>
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">Logo</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    Home
                  </a>
                </li>
              </ul>
              <div className="d-flex align-items-center">
                {!isLoggedIn && (
                  <>
                    <Link
                      data-mdb-ripple-init=""
                      type="button"
                      className="btn btn-success px-3 me-2"
                      to="login"
                    >
                      Login
                    </Link>
                    <Link
                      data-mdb-ripple-init=""
                      type="button"
                      className="btn btn-primary me-3"
                      to="register"
                    >
                      Sign up for free
                    </Link>
                  </>
                )}
                {userName && (
                  <div
                    data-mdb-ripple-init=""
                    className="btn btn-dark px-3 me-3 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    role="button"
                  >
                    {userName}
                  </div>
                )}
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/harcama">
                      Harcamalar
                    </a>
                  </li>
                  {isAdmin && (
                    <li>
                      <a className="dropdown-item" href="/table">
                        Table
                      </a>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item bg-danger text-white "
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </>
    </div>
  )
}

export default Navbar
