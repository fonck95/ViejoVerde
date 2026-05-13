import { Nav } from './components/Nav/Nav'
import { Hero } from './components/Hero/Hero'
import { Filosofia } from './components/Filosofia/Filosofia'
import { Especies } from './components/Especies/Especies'
import { Proceso } from './components/Proceso/Proceso'
import { Cuidados } from './components/Cuidados/Cuidados'
import { Footer } from './components/Footer/Footer'
import { useReveal } from './hooks/useReveal'

function App() {
  useReveal()
  return (
    <>
      <span id="top" />
      <Nav />
      <main>
        <Hero />
        <span id="historia" />
        <Filosofia />
        <span id="especies" />
        <Especies />
        <span id="proceso" />
        <Proceso />
        <span id="cuidados" />
        <Cuidados />
      </main>
      <Footer />
    </>
  )
}

export default App
