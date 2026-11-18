"use client"

import { useRef, useState } from "react"
import { contactFormSchema } from "../lib/zodSchema"

type FormStatus = "idle" | "pending" | "success" | "error"
type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string[]>>

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<FieldErrors>({})
  const formRef = useRef<HTMLFormElement>(null)

  const fieldClass =
    "w-full bg-dark-800 border border-dark-600 text-stone-200 text-sm font-light px-4 py-3 placeholder:text-stone-700 focus:outline-none focus:border-gold-600 transition-colors duration-200"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = contactFormSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as FieldErrors)
      return
    }

    setErrors({})
    setStatus("pending")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: process.env.NEXT_PUBLIC_FORM_API_KEY, ...result.data }),
      })

      const data = await response.json()
      if (data.success) {
        setStatus("success")
        formRef.current?.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <main className="min-h-screen bg-dark-900">
      <section className="py-24 border-b border-dark-600">
        <div className="max-w-3xl mx-auto px-6">
          <p className="section-label mb-4">Get in Touch</p>
          <h1 className="font-serif text-5xl md:text-7xl text-stone-100 font-light leading-[1.1]">
            Contact <em>Us</em>
          </h1>
          <p className="mt-6 text-stone-400 font-light max-w-lg leading-relaxed">
            We&apos;d love to hear from you. Whether you have a question about our ministry, events, or simply want to
            connect — reach out and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="section-label block mb-2" htmlFor="name">
                  Name
                </label>
                <input id="name" name="name" type="text" placeholder="Your name" className={fieldClass} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
              </div>

              <div>
                <label className="section-label block mb-2" htmlFor="email">
                  Email
                </label>
                <input id="email" name="email" type="email" placeholder="your@email.com" className={fieldClass} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
              </div>
            </div>

            <div>
              <label className="section-label block mb-2" htmlFor="subject">
                Subject
              </label>
              <input id="subject" name="subject" type="text" placeholder="How can we help?" className={fieldClass} />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject[0]}</p>}
            </div>

            <div>
              <label className="section-label block mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={8}
                placeholder="Write your message here..."
                className={`${fieldClass} resize-none`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "pending"}
              className="px-8 py-3 border border-gold-600 text-gold-400 text-xs tracking-widest uppercase font-medium transition-all duration-200 hover:bg-gold-500 hover:text-dark-900 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3">
              {status === "pending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <div className="border border-dark-600 p-10 text-center">
                <div className="w-10 h-px bg-gold-400 mx-auto mb-6" />
                <h3 className="font-serif text-3xl text-stone-100 font-light mb-3">
                  Thank <em>You</em>
                </h3>
                <p className="text-stone-400 font-light leading-relaxed">
                  Your message has been received. We&apos;ll be in touch soon.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="border border-dark-600 p-10 text-center">
                <div className="w-10 h-px bg-gold-400 mx-auto mb-6" />
                <h3 className="font-serif text-3xl text-stone-100 font-light mb-3">
                  <em>Ops...</em>
                </h3>
                <p className="text-stone-400 font-light leading-relaxed">Something went wrong. Try again later.</p>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}
