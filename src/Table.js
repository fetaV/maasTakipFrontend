import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Table() {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [editUserId, setEditUserId] = useState(null)
  const isAdmin = localStorage.getItem("isAdmin")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("/api/auth/register", {
        username,
        email,
        password,
      })
      window.location = "/table"
    } catch (error) {
      console.error(error.response.data)
      setError(error.response.data.message)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("/api/auth/users", {
          headers: {
            Authorization: token,
          },
        })

        const filteredUsers = response.data.filter(
          user => user.username !== "admin" && user.email !== "admin@admin.com"
        )

        setUsers(filteredUsers)
      } catch (error) {
        console.error(error.response.data)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async userId => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`/api/auth/users/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      setUsers(users.filter(user => user._id !== userId))
      toast.success("User deleted successfully!")
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const handleEditModalOpen = userId => {
    setEditUserId(userId)

    const userToEdit = users.find(user => user._id === userId)
    setUsername(userToEdit.username)
    setEmail(userToEdit.email)
    setPassword(userToEdit.password)
  }

  const handleEdit = async userId => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `/api/auth/users/${userId}`,
        { username, email, password },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      toast.success("User updated successfully!")
      window.location = "/table"
      console.log("User information:", response.data)
    } catch (error) {
      console.error(error.response.data)
      toast.error(error.response.data.message)
    }
  }
  if (isAdmin === "true") {
    return (
      <div className="container">
        <ToastContainer />
        <button
          className="btn btn-success mr-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
        >
          Add New User
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mail</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditModalOpen(user._id)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal2"
          tabindex="-1"
          aria-labelledby="exampleModal2Label"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModal2Label">
                  Update User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="form-control form-control-lg"
                    required
                  />
                </div>
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typePasswordX">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="form-control form-control-lg"
                  />
                </div>
                {/* {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )} */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEdit(editUserId)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="exampleModal1Label"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModal1Label">
                  Add New User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeNameX">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="form-control form-control-lg"
                    required
                  />
                </div>

                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typePasswordX">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="form-control form-control-lg"
                  />
                </div>
                {/* {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )} */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Table
