import { List } from './components/List'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-red-50 w-full">
      <Navbar />
      <main className="w-full max-w-3xl mx-auto">
        <List />
      </main>
    </div>
  )
}

export default App
