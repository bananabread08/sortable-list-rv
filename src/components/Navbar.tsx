import { ShoppingBasket } from 'lucide-react'

export const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 to-blue-500 mb-4">
      <nav className="max-w-4xl mx-auto p-2 text-white font-medium gap-2 flex">
        <ShoppingBasket />
        <span>My Shopping List</span>
      </nav>
    </header>
  )
}
