import ContactForm from '@/components/ContactForm'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Contact' })

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-100">
        Contact
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Interested in working together or have a question? Send me a message and I&apos;ll get back to you.
      </p>
      <ContactForm />
    </div>
  )
}
