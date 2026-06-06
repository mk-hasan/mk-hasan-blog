'use client'

import { FormEvent, useState } from 'react'

type SubmitStatus = 'idle' | 'pending' | 'success' | 'error'

function encodeFormData(formData: FormData): string {
  const params = new URLSearchParams()
  formData.forEach((value, key) => {
    params.append(key, typeof value === 'string' ? value : value.name)
  })
  return params.toString()
}

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('pending')

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(formData),
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }

      setStatus('success')
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <form name="contact" onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don’t fill this out if you&apos;re human: <input name="bot-field" />
          </label>
        </p>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:outline-hidden focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:outline-hidden focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:outline-hidden focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={status === 'pending'}
            className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-700 focus:outline-hidden disabled:opacity-60"
          >
            {status === 'pending' ? 'Sending…' : 'Send'}
          </button>
        </div>
      </form>
      {status === 'success' && (
        <p className="mt-4 text-sm text-green-600 dark:text-green-400">
          Thanks — your message was sent. I&apos;ll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
    </>
  )
}
