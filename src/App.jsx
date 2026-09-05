import { useEffect, useState } from 'react'
import Loader from './components/Loader/Loader.jsx'
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Skills from './components/Skills/Skills.jsx'
import Projects from './components/Projects/Projects.jsx'
import Experience from './components/Experience/Experience.jsx'
import Education from './components/Education/Education.jsx'
import Achievements from './components/Achievements/Achievements.jsx'
import Resume from './components/Resume/Resume.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import BackToTop from './components/BackToTop/BackToTop.jsx'
// src/App.jsx — add this import near your other component imports:
import CommandPalette from './components/CommandPalette/CommandPalette.jsx'



export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Loader isLoading={isLoading} />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
<CommandPalette />
    </>
  )
}
