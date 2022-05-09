import axios from 'axios'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from 'src/components/Layout'
import PageTitle from 'src/components/PageTitle'

export default function NewPost({}) {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const body = Object.fromEntries(formData.entries())

    setIsLoading(true)
    setErrors([])
    axios
      .post('/api/posts', body)
      .then(({ data }) => {
        event.target.reset()
        router.push(`/${data.data.id}`)
      })
      .catch((err) => setErrors(err.response.data.errors))
      .finally(() => setIsLoading(false))
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <PageTitle title="Add new post" />
        {errors.length > 0 && (
          <div className="bg-red-200 p-4 my-4 border border-red-400 border-solid">
            Errors:
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="mb-4">
          <label htmlFor="title" className="block">
            Title:
          </label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="mb-4">
          <label htmlFor="preview" className="block">
            Preview:
          </label>
          <textarea id="preview" name="preview" />
        </p>
        <p className="mb-4">
          <label htmlFor="content" className="block">
            Content:
          </label>
          <textarea id="content" name="content" />
        </p>
        <p className="mb-4">
          <button
            type="submit"
            disabled={isLoading}
            className={classNames('text-white px-4 py-2 rounded', {
              'bg-blue-500': !isLoading,
              'bg-gray-500': isLoading,
              'cursor-not-allowed': isLoading,
            })}
          >
            Add new post
          </button>
        </p>
      </form>
    </Layout>
  )
}
