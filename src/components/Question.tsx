'use client'

import { askQuestion } from '@/util/api'
import { useState } from 'react'

const Question = () => {
  const [question, setQuestion] = useState('')
//   const [answer, setAnswer] = useState(null)
//   const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    // setLoading(true)

    // const { data } = await askQuestion(question)

    // setAnswer(data)
    // setLoading(false)
    // setQuestion('')
  }
    const onChange = (e) => {
    (e) => setQuestion(e.target.value); 
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 text-lg"
          placeholder="Ask a question..."
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-md"
        >
          Ask
        </button>
      </form>

    </div>
  )
}

export default Question

/*
disabled={loading}
      {loading && <p>Loading...</p>}
      {answer && <p className="my-4 text-xl">{answer}</p>}
*/