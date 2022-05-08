import axios from 'axios'
import { useState } from 'react'

export default function NewPost({}) {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const body = Object.fromEntries(formData.entries())

    setIsLoading(true)
    setErrors([])
    axios
      .post('/api/posts', body)
      .then(({ data }) => data)
      .catch((err) => setErrors(err.response.data.errors))
      .finally(() => setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <p>
          Errors:
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </p>
      )}
      <p>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
      </p>
      <p>
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" />
      </p>
      <p>
        <button type="submit" disabled={isLoading}>
          Add new post
        </button>
      </p>
    </form>
  )
}
