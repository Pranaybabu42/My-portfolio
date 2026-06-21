import { Sparkles } from 'lucide-react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import WhatIDo from './components/sections/WhatIDo'
import QuoteSpotlight from './components/sections/QuoteSpotlight'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import History from './components/sections/History'
import Experience from './components/sections/Experience'
import Highlights from './components/sections/Highlights'
import Contact from './components/sections/Contact'
import CursorDiffusion from './components/effects/CursorDiffusion'
import SocialDock from './components/layout/SocialDock'
import ScrollToTop from './components/layout/ScrollToTop'
import SiteLoader from './components/ui/SiteLoader'
import profile from './data/profile'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useImagePreloader } from './hooks/useImagePreloader'
import Neuralbackground from './components/effects/Neuralbackground'

const sectionIds = ['hero', 'about', 'what-i-do', 'skills', 'history', 'experience', 'projects', 'certificates-awards', 'contact']

function DashboardVisual() {
  return null
}

function App() {
  const reducedMotion = false
  const activeSection = useScrollSpy(sectionIds)
  const imageLoader = useImagePreloader()

  return (
    <div className="noise-overlay relative isolate min-h-screen bg-bg">
      {!imageLoader.isComplete && <SiteLoader {...imageLoader} />}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70]">
        Skip to main content
      </a>
      <CursorDiffusion reducedMotion={reducedMotion} />
      <Neuralbackground/>
      <div className="sr-only" aria-hidden="true">
        <Sparkles size={16} />
        <DashboardVisual />
      </div>

      <div className="relative z-[20]">
        <Navbar activeSection={activeSection} profile={profile} />

        <SocialDock profile={profile} />
        <main id="main-content" className="app-main">
          <Hero profile={profile} reducedMotion={reducedMotion} />
          <About profile={profile} reducedMotion={reducedMotion} />
          <WhatIDo />
          <Skills reducedMotion={reducedMotion} />
          <QuoteSpotlight reducedMotion={reducedMotion} />
          <History profile={profile} reducedMotion={reducedMotion} />
          <Experience items={profile.experience} reducedMotion={reducedMotion} />
          <Projects projects={profile.projects} reducedMotion={reducedMotion} />
          <Highlights
            certifications={profile.certifications}
            awards={profile.awards}
          />
          <Contact profile={profile} />
        </main>
        <Footer name={profile.name} />
        <ScrollToTop />
      </div>
    </div>
  )
}

export default App
