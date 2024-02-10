import { List } from './components/List'
import { Navbar } from './components/Navbar'
import { Toaster } from './components/ui/toaster'
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 w-full">
      <Navbar />
      <main className="w-full max-w-3xl mx-auto">
        <List />
      </main>
      <Toaster />
    </div>
  )
}

export default App
