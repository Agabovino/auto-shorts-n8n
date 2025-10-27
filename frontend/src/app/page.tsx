'use client'

import { useState } from 'react'

export default function Home() {
  const [urls, setUrls] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the URL to your API endpoint
    // and then fetch the list of videos.
    // For simplicity, we'll just add the URL to our local state.
    if (inputValue) {
      setUrls([...urls, inputValue])
      setInputValue('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Player</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter video URL"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Video
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {urls.map((url, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <video controls src={url} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

