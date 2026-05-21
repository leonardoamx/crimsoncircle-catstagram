import { Link } from "react-router-dom"

function History() {
  return (
    <div className="bg-gray-100 content-center">
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4">
            <img src="assets/catstagram.png" className="logo-image h-10" alt="Catstagram" />
            <h1 className="text-lg font-semibold">Catstagram</h1>
            </Link>
          </div>
        </div>
      </nav>
      <main className="container min-h-screen">
        <h2>
          History
        </h2>
      </main>
    </div>
  )
}

export default History
