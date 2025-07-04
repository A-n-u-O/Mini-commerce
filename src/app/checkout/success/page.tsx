import Link from 'next/link'

export default function SuccessPage() {
  const orderId = Math.random().toString(36).substring(2, 10).toUpperCase()

  return (
    <main className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="mb-4">Your order number is: {orderId}</p>
      <p className="mb-8">
        We've received your order and will process it shortly.
      </p>
      <Link
        href="/"
        className="text-blue-600 hover:underline"
      >
        Continue shopping
      </Link>
    </main>
  )
}