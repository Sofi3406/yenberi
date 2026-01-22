import Link from 'next/link'

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Volunteer</h1>
      <p className="mb-4">Thank you for your interest in volunteering with SLMA. We welcome help with community programs, events, and projects. Please contact us or register to join as a volunteer.</p>

      <div className="flex gap-4 mt-6">
        <Link href="/contact" className="btn btn-primary">Contact Us</Link>
        <Link href="/auth/register" className="btn btn-outline">Volunteer Registration</Link>
      </div>
    </main>
  )
}
